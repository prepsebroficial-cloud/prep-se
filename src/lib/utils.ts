import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

export function generateMagicLink(email: string): string {
  const timestamp = Date.now()
  const hash = btoa(`${email}-${timestamp}`)
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/jornada?token=${hash}&email=${encodeURIComponent(email)}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function getStepStatusColor(status: string): string {
  switch (status) {
    case 'done':
      return 'text-success-600 bg-success-50 border-success-200'
    case 'in_progress':
      return 'text-primary-600 bg-primary-50 border-primary-200'
    case 'pending':
      return 'text-warning-600 bg-warning-50 border-warning-200'
    case 'failed':
      return 'text-error-600 bg-error-50 border-error-200'
    case 'locked':
    default:
      return 'text-gray-500 bg-gray-50 border-gray-200'
  }
}

export function getStepIcon(status: string): string {
  switch (status) {
    case 'done':
      return '✅'
    case 'in_progress':
      return '🔄'
    case 'pending':
      return '⏳'
    case 'failed':
      return '❌'
    case 'locked':
    default:
      return '🔒'
  }
}

export function calculateProgress(steps: any[]): number {
  const completedSteps = steps.filter(step => step.status === 'done').length
  return Math.round((completedSteps / steps.length) * 100)
}

export function getNextUnlockedStep(steps: any[]): any | null {
  return steps.find(step => step.status === 'pending' || step.status === 'in_progress') || null
}

export function isStepUnlocked(stepIndex: number, steps: any[]): boolean {
  if (stepIndex === 0) return true
  return steps[stepIndex - 1].status === 'done'
}

export function createTallyUrl(email: string, name: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_TALLY_FORM_URL || 'https://tally.so/r/xxxxx'
  const params = new URLSearchParams({
    email,
    name,
    source: 'prepse',
    utm_source: 'prepse',
    utm_medium: 'webapp',
    utm_campaign: 'jornada'
  })
  return `${baseUrl}?${params.toString()}`
}
