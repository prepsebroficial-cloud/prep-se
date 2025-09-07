import Stripe from 'stripe'
import { StripeCheckoutSession } from '@/types'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000'

export class StripeService {
  private static stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  }) : null

  static async createCheckoutSession(
    email: string,
    name: string,
    priceId?: string
  ): Promise<{ success: boolean; session?: StripeCheckoutSession; error?: string }> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not configured')
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId || STRIPE_PRICE_ID || 'price_1234567890',
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: email,
        metadata: {
          customer_name: name,
          source: 'prepse',
        },
        success_url: `${APP_BASE_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_BASE_URL}/jornada`,
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['BR'],
        },
      })

      return {
        success: true,
        session: {
          id: session.id,
          url: session.url || '',
        },
      }
    } catch (error) {
      console.error('Stripe checkout session creation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  static async retrieveCheckoutSession(sessionId: string): Promise<{ success: boolean; session?: Stripe.Checkout.Session; error?: string }> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not configured')
      }

      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'customer'],
      })

      return { success: true, session }
    } catch (error) {
      console.error('Stripe session retrieval error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  static async constructWebhookEvent(payload: string, signature: string): Promise<{ success: boolean; event?: Stripe.Event; error?: string }> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not configured')
      }

      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
      if (!webhookSecret) {
        throw new Error('Stripe webhook secret not configured')
      }

      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)
      return { success: true, event }
    } catch (error) {
      console.error('Stripe webhook verification error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}
