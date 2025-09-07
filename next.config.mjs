/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    CALCOM_URL: process.env.CALCOM_URL,
    TALLY_FORM_URL: process.env.TALLY_FORM_URL,
    APP_BASE_URL: process.env.APP_BASE_URL,
  },
  // Public environment variables (accessible in browser)
  publicRuntimeConfig: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CALCOM_URL: process.env.CALCOM_URL,
    TALLY_FORM_URL: process.env.TALLY_FORM_URL,
    APP_BASE_URL: process.env.APP_BASE_URL,
  },
}

export default nextConfig
