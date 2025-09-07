'use client'

import React from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function ErroPage() {
  const handleRetry = () => {
    window.location.href = '/jornada'
  }

  const handleContactSupport = () => {
    window.location.href = 'mailto:suporte@prepse.com?subject=Erro na plataforma'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />
      
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
              😔
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ops! Algo deu errado
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontramos um problema ao processar sua solicitação. 
              Não se preocupe, nossa equipe está aqui para ajudar.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              O que você pode fazer agora?
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Tente novamente</h3>
                  <p className="text-sm text-gray-600">
                    Às vezes problemas temporários podem ser resolvidos simplesmente tentando novamente.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Entre em contato</h3>
                  <p className="text-sm text-gray-600">
                    Nossa equipe de suporte está disponível para ajudar você a resolver o problema.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Volte ao início</h3>
                  <p className="text-sm text-gray-600">
                    Você pode retornar à página inicial e começar novamente sua jornada.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleRetry}
                className="flex-1"
              >
                Tentar Novamente
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleContactSupport}
                className="flex-1"
              >
                Contatar Suporte
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
              Informações de Contato
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">📧</span>
                <a 
                  href="mailto:suporte@prepse.com" 
                  className="text-primary-600 hover:underline"
                >
                  suporte@prepse.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">📞</span>
                <a 
                  href="tel:+5511999999999" 
                  className="text-primary-600 hover:underline"
                >
                  (11) 99999-9999
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">💬</span>
                <span>Chat online disponível</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-500">⏰</span>
                <span>24/7 disponível</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
            >
              ← Voltar ao início
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
