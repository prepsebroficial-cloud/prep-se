import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/services/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const result = await StripeService.constructWebhookEvent(body, signature)
    
    if (!result.success || !result.event) {
      return NextResponse.json(
        { error: result.error || 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = result.event

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  try {
    console.log('Checkout session completed:', session.id)
    
    // Update user journey step to completed
    // In a real implementation, you would:
    // 1. Find user by email (session.customer_email)
    // 2. Update their journey step status to 'done'
    // 3. Send confirmation email
    // 4. Trigger next step in journey
    
    const customerEmail = session.customer_email || session.customer_details?.email
    console.log('Payment completed for:', customerEmail)
    
    // Here you would update the user's journey in your database
    // For now, we'll just log the success
    
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: any) {
  try {
    console.log('Payment intent succeeded:', paymentIntent.id)
    
    // Additional payment success logic if needed
    // This is usually handled by checkout.session.completed
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: any) {
  try {
    console.log('Payment intent failed:', paymentIntent.id)
    
    // Update user journey step to failed
    // In a real implementation, you would:
    // 1. Find user by email
    // 2. Update their journey step status to 'failed'
    // 3. Send failure notification email
    
    console.log('Payment failed for:', paymentIntent.receipt_email)
    
  } catch (error) {
    console.error('Error handling payment intent failed:', error)
  }
}
