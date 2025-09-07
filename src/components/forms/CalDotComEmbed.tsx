'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppState } from '@/hooks/useAppState'
import toast from 'react-hot-toast'

interface CalDotComEmbedProps {
  onSuccess?: () => void
  className?: string
}

export function CalDotComEmbed({ onSuccess, className }: CalDotComEmbedProps) {
  const { state, updateStepStatus, setLoading } = useAppState()
  const [isEmbedLoaded, setIsEmbedLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/prepse/consulta'

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => {
      setIsEmbedLoaded(true)
    }
    script.onerror = () => {
      setShowFallback(true)
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleBookingSuccess = () => {
    updateStepStatus('schedule', 'done')
    toast.success('Consulta agendada com sucesso!')
    onSuccess?.()
  }

  const handleOpenInNewTab = () => {
    window.open(CALCOM_URL, '_blank', 'noopener,noreferrer')
  }

  const handleFallbackClick = () => {
    setShowFallback(true)
  }

  if (showFallback) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Agendar Consulta</CardTitle>
          <CardDescription>
            Clique no botão abaixo para abrir o agendamento em uma nova aba
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Agendamento de Consulta
            </h3>
            <p className="text-gray-600 mb-6">
              Você será redirecionado para nossa plataforma de agendamento onde poderá escolher o melhor horário para sua consulta.
            </p>
            <Button onClick={handleOpenInNewTab} className="w-full">
              Abrir Agendamento
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Agendar Consulta</CardTitle>
        <CardDescription>
          Escolha o melhor horário para sua consulta online
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isEmbedLoaded ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full" />
            <span className="ml-3 text-gray-600">Carregando agendamento...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              data-cal-link="prepse/consulta"
              data-cal-namespace=""
              data-cal-config='{"layout":"month_view","theme":"light"}'
              style={{ width: '100%', height: '600px', overflow: 'scroll' }}
            />
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">
                Problemas com o agendamento?
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFallbackClick}
              >
                Abrir em nova aba
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
