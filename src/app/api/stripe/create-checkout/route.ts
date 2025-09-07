import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/services/stripe'

export async function POST(request: NextRequest) {
  try {
    const { email, name, price, description } = await request.json()

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'E-mail e nome são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const result = await StripeService.createCheckoutSession(
      email,
      name,
      process.env.STRIPE_PRICE_ID
    )

    if (result.success && result.session) {
      return NextResponse.json({
        success: true,
        session: result.session,
        message: 'Sessão de checkout criada com sucesso'
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Erro ao criar sessão de checkout' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
