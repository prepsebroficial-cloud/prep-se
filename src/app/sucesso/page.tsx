'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { useAppState } from '@/hooks/useAppState'
import { createTallyUrl } from '@/lib/utils'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'

export default function SucessoPage() {
  const { state, updateStepStatus } = useAppState()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Mark payment step as completed
    updateStepStatus('payment', 'done')
    
    // Show confetti for 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [updateStepStatus])

  const handleTallyRedirect = () => {
    if (!state.user) {
      toast.error('Erro: dados do usuário não encontrados')
      return
    }

    const tallyUrl = createTallyUrl(state.user.email, state.user.name)
    window.open(tallyUrl, '_blank', 'noopener,noreferrer')
    
    toast.success('Formulário clínico aberto em nova aba!')
  }

  const handleBackToJourney = () => {
    window.location.href = '/jornada'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pagamento Confirmado!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seu pagamento foi processado com sucesso. Agora você pode prosseguir 
              para a próxima etapa da sua jornada.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Próxima Etapa: Cadastro Clínico
            </h2>
            
            <div className="text-left space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Preencha o formulário clínico</h3>
                  <p className="text-sm text-gray-600">
                    Informações sobre seu histórico médico e sintomas atuais
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-500 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Aguarde a análise médica</h3>
                  <p className="text-sm text-gray-600">
                    Nossa equipe analisará suas informações em até 24 horas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-500 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Receba sua receita</h3>
                  <p className="text-sm text-gray-600">
                    Se aprovada, você receberá sua receita médica digital
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 text-xl">ℹ️</div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Importante</h4>
                  <p className="text-sm text-blue-800">
                    O formulário será aberto em uma nova aba com seus dados já pré-preenchidos. 
                    Você pode salvar e continuar depois se necessário.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleTallyRedirect}
                className="flex-1"
              >
                Preencher Cadastro Clínico
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleBackToJourney}
                className="flex-1"
              >
                Ver Minha Jornada
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Precisa de ajuda?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">📧</span>
                <span>suporte@prepse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">📞</span>
                <span>(11) 99999-9999</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
