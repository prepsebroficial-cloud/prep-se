'use client'

import React from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { AppStateProvider, useAppState } from "@/hooks/useAppState";


export default function HomePage() {
  const { state } = useAppState()

  const benefits = [
    {
      icon: '⚡',
      title: 'Processo Rápido',
      description: 'Agende sua consulta em minutos e receba sua receita em até 24 horas.'
    },
    {
      icon: '🔒',
      title: '100% Seguro',
      description: 'Seus dados são protegidos com criptografia de nível bancário.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Médicos Qualificados',
      description: 'Nossa equipe é formada por profissionais especializados e certificados.'
    },
    {
      icon: '📱',
      title: 'Acompanhe Tudo',
      description: 'Monitore cada etapa da sua jornada em tempo real.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Sua prevenção,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  sem burocracia
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Agende online, pague com segurança e acompanhe sua jornada para acesso à medicação — tudo em um só lugar.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/jornada'}
                  className="text-lg px-8 py-4"
                >
                  Começar minha jornada
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/faq'}
                  className="text-lg px-8 py-4"
                >
                  Saiba mais
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que escolher a Prep-se?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Oferecemos uma experiência completa e segura para sua saúde preventiva
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Pronto para começar?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-primary-100 mb-8"
            >
              Junte-se a milhares de pessoas que já transformaram sua saúde preventiva
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = '/jornada'}
                className="text-lg px-8 py-4"
              >
                Começar agora
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold">Prep-se</span>
              </div>
              <p className="text-gray-400">
                Sua prevenção, sem burocracia.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/jornada" className="hover:text-white transition-colors">Minha Jornada</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:suporte@prepse.com" className="hover:text-white transition-colors">E-mail</a></li>
                <li><a href="tel:+5511999999999" className="hover:text-white transition-colors">Telefone</a></li>
                <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/termos" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Prep-se. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
