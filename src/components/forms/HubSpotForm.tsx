'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAppState } from '@/hooks/useAppState'
import { validateEmail } from '@/lib/utils'
import toast from 'react-hot-toast'

interface HubSpotFormProps {
  onSuccess?: () => void
  className?: string
}

export function HubSpotForm({ onSuccess, className }: HubSpotFormProps) {
  const { state, updateUser, updateStepStatus, setLoading, setError } = useAppState()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.consent) {
      newErrors.consent = 'Você deve aceitar os termos para continuar'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          consent: formData.consent,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar conta')
      }

      // Update user state
      const user = {
        id: result.contactId || `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        consent: formData.consent,
        createdAt: new Date(),
      }

      updateUser(user)
      updateStepStatus('account', 'done')
      
      toast.success('Conta criada com sucesso!')
      onSuccess?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Criar sua conta</CardTitle>
        <CardDescription>
          Preencha seus dados para começar sua jornada na Prep-se
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <div className="space-y-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleInputChange('consent', e.target.checked)}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <span className="text-sm text-gray-700">
                Eu concordo com os{' '}
                <a href="/termos" className="text-primary-600 hover:underline">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="/privacidade" className="text-primary-600 hover:underline">
                  Política de Privacidade
                </a>
                , e autorizo o uso dos meus dados para comunicação sobre o serviço.
              </span>
            </label>
            {errors.consent && (
              <p className="text-sm text-error-600" role="alert">
                {errors.consent}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={state.isLoading}
            disabled={!formData.name || !formData.email || !formData.consent}
          >
            Criar conta e continuar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
