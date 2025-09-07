// Environment variables configuration

export const env = {
  // Public variables (accessible in browser)
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  CALCOM_URL: process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/prepse/consulta',
  TALLY_FORM_URL: process.env.NEXT_PUBLIC_TALLY_FORM_URL || 'https://tally.so/r/xxxxx',
  APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000',
  
  // Server-only variables (not accessible in browser)
  HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID || '',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // Webhook secrets
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  CAL_WEBHOOK_SECRET: process.env.CAL_WEBHOOK_SECRET || '',
  TALLY_WEBHOOK_SECRET: process.env.TALLY_WEBHOOK_SECRET || '',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',
}

// Validation function
export function validateEnv() {
  const required = [
    'HUBSPOT_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID',
  ]
  
  const missing = required.filter(key => !env[key as keyof typeof env])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Check if we're in development
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
