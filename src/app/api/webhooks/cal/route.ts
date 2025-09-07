import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook signature (implement based on Cal.com documentation)
    const signature = request.headers.get('cal-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      )
    }

    // Process different event types
    switch (body.type) {
      case 'BOOKING_CREATED':
        await handleBookingCreated(body.data)
        break
      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(body.data)
        break
      default:
        console.log('Unhandled Cal.com event type:', body.type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cal.com webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleBookingCreated(booking: any) {
  try {
    console.log('Booking created:', booking)
    
    // Update user journey step to completed
    // In a real implementation, you would:
    // 1. Find user by email
    // 2. Update their journey step status
    // 3. Send confirmation email
    
    // For now, just log the event
    console.log('Booking created for:', booking.attendees?.[0]?.email)
  } catch (error) {
    console.error('Error handling booking created:', error)
  }
}

async function handleBookingCancelled(booking: any) {
  try {
    console.log('Booking cancelled:', booking)
    
    // Update user journey step back to pending
    // In a real implementation, you would:
    // 1. Find user by email
    // 2. Update their journey step status
    // 3. Send cancellation email
    
    console.log('Booking cancelled for:', booking.attendees?.[0]?.email)
  } catch (error) {
    console.error('Error handling booking cancelled:', error)
  }
}
