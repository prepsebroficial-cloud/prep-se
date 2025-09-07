'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAppState } from '@/hooks/useAppState'
import { createTallyUrl } from '@/lib/utils'
import toast from 'react-hot-toast'

interface TallyRedirectProps {
  onSuccess?: () => void
  className?: string
}

export function TallyRedirect({ onSuccess, className }: TallyRedirectProps) {
  const { state, updateStepStatus } = useAppState()

  const handleRedirect = () => {
    if (!state.user) {
      toast.error('Você precisa estar logado para acessar o formulário')
      return
    }

    const tallyUrl = createTallyUrl(state.user.email, state.user.name)
    
    // Open in new tab
    window.open(tallyUrl, '_blank', 'noopener,noreferrer')
    
    toast.success('Formulário aberto em nova aba!')
    onSuccess?.()
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Cadastro Clínico</CardTitle>
        <CardDescription>
          Preencha o formulário clínico para completar sua avaliação
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Formulário de Avaliação Clínica
          </h3>
          <p className="text-gray-600 mb-6">
            Para prosseguir com sua consulta, precisamos que você preencha um formulário 
            com informações sobre seu histórico médico e sintomas atuais.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">O que você precisa saber:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• O formulário leva aproximadamente 10-15 minutos</li>
            <li>• Todas as informações são confidenciais e seguras</li>
            <li>• Você pode salvar e continuar depois se necessário</li>
            <li>• Seus dados serão pré-preenchidos automaticamente</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-green-500">🔒</span>
            <span>Dados protegidos por criptografia</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-blue-500">⚡</span>
            <span>Formulário pré-preenchido com seus dados</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-purple-500">💾</span>
            <span>Progresso salvo automaticamente</span>
          </div>
        </div>

        <Button
          onClick={handleRedirect}
          className="w-full"
          disabled={!state.user}
        >
          Preencher Cadastro Clínico
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Após preencher o formulário, nossa equipe médica analisará suas informações 
            e entrará em contato em até 24 horas.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
