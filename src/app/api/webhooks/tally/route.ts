import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook signature (implement based on Tally documentation)
    const signature = request.headers.get('tally-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      )
    }

    // Process different event types
    switch (body.eventType) {
      case 'FORM_RESPONSE':
        await handleFormResponse(body)
        break
      default:
        console.log('Unhandled Tally event type:', body.eventType)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Tally webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleFormResponse(data: any) {
  try {
    console.log('Form response received:', data)
    
    // Extract user email from form response
    const emailField = data.fields?.find((field: any) => 
      field.key === 'email' || field.label?.toLowerCase().includes('email')
    )
    
    const userEmail = emailField?.value
    
    if (!userEmail) {
      console.error('No email found in form response')
      return
    }
    
    // Update user journey step to completed
    // In a real implementation, you would:
    // 1. Find user by email
    // 2. Update their journey step status to 'done'
    // 3. Send confirmation email
    // 4. Trigger next step in journey (approval)
    
    console.log('Form submitted for:', userEmail)
    
    // Here you would update the user's journey in your database
    // For now, we'll just log the success
    
  } catch (error) {
    console.error('Error handling form response:', error)
  }
}
