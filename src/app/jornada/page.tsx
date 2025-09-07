'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Timeline } from '@/components/journey/Timeline'
import { StepCard } from '@/components/journey/StepCard'
import { HubSpotForm } from '@/components/forms/HubSpotForm'
import { CalDotComEmbed } from '@/components/forms/CalDotComEmbed'
import { StripePayButton } from '@/components/forms/StripePayButton'
import { TallyRedirect } from '@/components/forms/TallyRedirect'
import { useAppState } from '@/hooks/useAppState'
import { JourneyStep, StepStatus } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'

export default function JornadaPage() {
  const { state, updateJourney, updateStepStatus, setLoading } = useAppState()
  const [showConfetti, setShowConfetti] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)

  // Initialize journey if not exists
  useEffect(() => {
    if (!state.journey) {
      const initialSteps: JourneyStep[] = [
        {
          id: 'account',
          label: 'Criar Conta',
          description: 'Preencha seus dados básicos para começar',
          status: 'pending',
          ctaLabel: 'Criar conta',
          icon: '👤'
        },
        {
          id: 'learn',
          label: 'Entender o Processo',
          description: 'Leia as informações sobre nosso serviço',
          status: 'locked',
          lockedReason: 'Complete a etapa anterior',
          icon: '📚'
        },
        {
          id: 'schedule',
          label: 'Agendar Consulta',
          description: 'Escolha o melhor horário para sua consulta',
          status: 'locked',
          lockedReason: 'Complete as etapas anteriores',
          icon: '📅'
        },
        {
          id: 'payment',
          label: 'Pagamento',
          description: 'Processe o pagamento de forma segura',
          status: 'locked',
          lockedReason: 'Agende sua consulta primeiro',
          icon: '💳'
        },
        {
          id: 'intake',
          label: 'Cadastro Clínico',
          description: 'Preencha o formulário de avaliação médica',
          status: 'locked',
          lockedReason: 'Complete o pagamento',
          icon: '📋'
        },
        {
          id: 'approval',
          label: 'Aprovação & Receita',
          description: 'Aguarde a análise e receba sua receita',
          status: 'locked',
          lockedReason: 'Complete o cadastro clínico',
          icon: '✅'
        }
      ]

      updateJourney({
        steps: initialSteps,
        progress: 0,
        updatedAt: new Date()
      })
    }
  }, [state.journey, updateJourney])

  const handleStepClick = (step: JourneyStep) => {
    if (step.status === 'pending' || step.status === 'failed') {
      setActiveStep(step.id)
    }
  }

  const handleStepComplete = (stepId: string) => {
    updateStepStatus(stepId, 'done')
    setActiveStep(null)
    
    // Show confetti for completed steps
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    
    // Unlock next step
    const currentIndex = state.journey?.steps.findIndex(s => s.id === stepId) || 0
    const nextStep = state.journey?.steps[currentIndex + 1]
    if (nextStep && nextStep.status === 'locked') {
      updateStepStatus(nextStep.id, 'pending')
    }
  }

  const handleStepRetry = (stepId: string) => {
    updateStepStatus(stepId, 'pending')
    setActiveStep(stepId)
  }

  const renderStepContent = () => {
    if (!activeStep || !state.journey) return null

    const step = state.journey.steps.find(s => s.id === activeStep)
    if (!step) return null

    switch (step.id) {
      case 'account':
        return (
          <HubSpotForm
            onSuccess={() => handleStepComplete('account')}
            className="max-w-md mx-auto"
          />
        )
      case 'learn':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Entenda nosso processo</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Como funciona?</h3>
                  <p className="text-gray-600">
                    Nossa plataforma conecta você com médicos qualificados para consultas online 
                    focadas em prevenção e bem-estar. Todo o processo é digital, seguro e rápido.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">O que você recebe?</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Consulta médica online de 30-45 minutos</li>
                    <li>Avaliação clínica completa</li>
                    <li>Receita médica digital (se aprovada)</li>
                    <li>Relatório de saúde personalizado</li>
                    <li>Suporte pós-consulta</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Segurança e privacidade</h3>
                  <p className="text-gray-600">
                    Todos os seus dados são protegidos com criptografia de nível bancário. 
                    Nossos médicos seguem rigorosos protocolos de segurança e confidencialidade.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleStepComplete('learn')}
                className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Entendi, continuar
              </button>
            </div>
          </div>
        )
      case 'schedule':
        return (
          <CalDotComEmbed
            onSuccess={() => handleStepComplete('schedule')}
            className="max-w-4xl mx-auto"
          />
        )
      case 'payment':
        return (
          <StripePayButton
            onSuccess={() => handleStepComplete('payment')}
            className="max-w-md mx-auto"
          />
        )
      case 'intake':
        return (
          <TallyRedirect
            onSuccess={() => handleStepComplete('intake')}
            className="max-w-md mx-auto"
          />
        )
      case 'approval':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
              <p className="text-gray-600 mb-6">
                Você completou todas as etapas da sua jornada. Nossa equipe médica está 
                analisando suas informações e entrará em contato em até 24 horas.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Próximos passos:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Análise do seu formulário clínico</li>
                  <li>• Consulta médica online</li>
                  <li>• Receita digital (se aprovada)</li>
                  <li>• Relatório de saúde personalizado</li>
                </ul>
              </div>
              <button
                onClick={() => handleStepComplete('approval')}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Finalizar jornada
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!state.journey) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Jornada</h1>
          <p className="text-gray-600">
            Acompanhe seu progresso e complete cada etapa para acessar nossos serviços
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar progress={state.journey.progress} size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Etapas da Jornada</h2>
              <Timeline
                steps={state.journey.steps}
                onStepClick={handleStepClick}
              />
            </div>
          </div>

          {/* Step Cards */}
          <div className="space-y-6">
            {state.journey.steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                onAction={() => {
                  if (step.status === 'failed') {
                    handleStepRetry(step.id)
                  } else {
                    setActiveStep(step.id)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Step Modal */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setActiveStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {state.journey?.steps.find(s => s.id === activeStep)?.label}
                  </h2>
                  <button
                    onClick={() => setActiveStep(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {renderStepContent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
