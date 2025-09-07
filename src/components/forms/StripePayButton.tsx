'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAppState } from '@/hooks/useAppState'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

interface StripePayButtonProps {
  onSuccess?: () => void
  className?: string
  price?: number
  description?: string
}

export function StripePayButton({ 
  onSuccess, 
  className, 
  price = 150,
  description = 'Consulta médica online'
}: StripePayButtonProps) {
  const { state, updateStepStatus, setLoading, setError } = useAppState()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!state.user) {
      toast.error('Você precisa estar logado para fazer o pagamento')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: state.user.email,
          name: state.user.name,
          price,
          description,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao processar pagamento')
      }

      // Redirect to Stripe Checkout
      window.location.href = result.session.url
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      setError(errorMessage)
      toast.error(errorMessage)
      setIsProcessing(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Pagamento Seguro</CardTitle>
        <CardDescription>
          Processe seu pagamento de forma segura com Stripe
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Consulta médica</span>
            <span className="text-sm text-gray-500">1x</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{description}</span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(price)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-green-500">🔒</span>
            <span>Pagamento 100% seguro com Stripe</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-blue-500">💳</span>
            <span>Aceitamos cartões de crédito e débito</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-purple-500">⚡</span>
            <span>Processamento instantâneo</span>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          className="w-full"
          loading={isProcessing}
          disabled={!state.user || isProcessing}
        >
          {isProcessing ? 'Processando...' : `Pagar ${formatCurrency(price)}`}
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ao continuar, você concorda com nossos{' '}
            <a href="/termos" className="text-primary-600 hover:underline">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/privacidade" className="text-primary-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
