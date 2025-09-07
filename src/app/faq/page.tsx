'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { motion } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('geral')
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData: FAQItem[] = [
    {
      question: 'Como funciona o serviço da Prep-se?',
      answer: 'Nossa plataforma conecta você com médicos qualificados para consultas online focadas em prevenção e bem-estar. Todo o processo é digital: você agenda, paga, preenche um formulário clínico e recebe sua receita médica digital.',
      category: 'geral'
    },
    {
      question: 'Quanto tempo leva para receber minha receita?',
      answer: 'Após completar todas as etapas (agendamento, pagamento e formulário clínico), nossa equipe médica analisa suas informações e entra em contato em até 24 horas. A receita é enviada digitalmente se aprovada.',
      category: 'geral'
    },
    {
      question: 'Os médicos são qualificados?',
      answer: 'Sim! Todos os médicos da nossa plataforma são profissionais certificados e especializados. Eles seguem rigorosos protocolos de segurança e confidencialidade, garantindo o melhor atendimento para você.',
      category: 'geral'
    },
    {
      question: 'Como funciona o pagamento?',
      answer: 'O pagamento é processado de forma 100% segura através do Stripe, uma das plataformas de pagamento mais confiáveis do mundo. Aceitamos cartões de crédito e débito, e o processamento é instantâneo.',
      category: 'pagamento'
    },
    {
      question: 'Posso cancelar minha consulta?',
      answer: 'Sim, você pode cancelar sua consulta até 24 horas antes do horário agendado. Para cancelamentos em menos de 24 horas, entre em contato com nosso suporte para verificar as opções disponíveis.',
      category: 'agendamento'
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente! Todos os seus dados são protegidos com criptografia de nível bancário. Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados) e nossos médicos seguem protocolos de confidencialidade médica.',
      category: 'seguranca'
    },
    {
      question: 'Posso usar minha receita em qualquer farmácia?',
      answer: 'Sim! Nossas receitas médicas digitais são válidas em qualquer farmácia do Brasil. Elas seguem todas as normas do Conselho Federal de Medicina e são aceitas nacionalmente.',
      category: 'receita'
    },
    {
      question: 'O que acontece se minha receita não for aprovada?',
      answer: 'Se por algum motivo sua receita não for aprovada, você será reembolsado integralmente. Nossa equipe médica sempre explica o motivo da não aprovação e pode sugerir alternativas ou encaminhamentos quando necessário.',
      category: 'receita'
    },
    {
      question: 'Posso agendar consultas para outras pessoas?',
      answer: 'Atualmente, cada pessoa precisa criar sua própria conta e passar pelo processo de verificação. Isso garante a segurança e a qualidade do atendimento médico.',
      category: 'geral'
    },
    {
      question: 'Como entro em contato com o suporte?',
      answer: 'Você pode entrar em contato conosco através do e-mail suporte@prepse.com, telefone (11) 99999-9999, ou através do chat online disponível em nossa plataforma. Estamos disponíveis 24/7 para ajudar.',
      category: 'suporte'
    }
  ]

  const categories = [
    { id: 'geral', label: 'Geral', icon: '❓' },
    { id: 'pagamento', label: 'Pagamento', icon: '💳' },
    { id: 'agendamento', label: 'Agendamento', icon: '📅' },
    { id: 'seguranca', label: 'Segurança', icon: '🔒' },
    { id: 'receita', label: 'Receita', icon: '📋' },
    { id: 'suporte', label: 'Suporte', icon: '��' }
  ]

  const filteredFAQs = faqData.filter(item => item.category === activeCategory)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div className={`transform transition-transform ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-sm border max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Não encontrou sua resposta?
            </h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                <a 
                  href="mailto:suporte@prepse.com" 
                  className="text-primary-600 hover:underline"
                >
                  suporte@prepse.com
                </a>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                <a 
                  href="tel:+5511999999999" 
                  className="text-primary-600 hover:underline"
                >
                  (11) 99999-9999
                </a>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-900 mb-1">Chat Online</h3>
                <span className="text-gray-600">Disponível 24/7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
