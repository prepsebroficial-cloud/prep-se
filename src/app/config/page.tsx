'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ConfigPage() {
  const [config, setConfig] = useState({
    hubspotApiKey: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripePriceId: '',
    calcomUrl: '',
    tallyFormUrl: '',
    appBaseUrl: '',
  })
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  const handleInputChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const testHubSpot = async () => {
    try {
      const response = await fetch('/api/hubspot/create-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          consent: true
        })
      })
      
      const result = await response.json()
      setTestResults(prev => ({ ...prev, hubspot: result }))
      
      if (result.success) {
        toast.success('HubSpot test successful!')
      } else {
        toast.error('HubSpot test failed: ' + result.error)
      }
    } catch (error) {
      toast.error('HubSpot test error: ' + error)
    }
  }

  const testStripe = async () => {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'Test User',
          price: 150
        })
      })
      
      const result = await response.json()
      setTestResults(prev => ({ ...prev, stripe: result }))
      
      if (result.success) {
        toast.success('Stripe test successful!')
      } else {
        toast.error('Stripe test failed: ' + result.error)
      }
    } catch (error) {
      toast.error('Stripe test error: ' + error)
    }
  }

  const testCalCom = () => {
    const url = config.calcomUrl || 'https://cal.com/prepse/consulta'
    window.open(url, '_blank')
    toast.success('Cal.com link opened in new tab')
  }

  const testTally = () => {
    const url = config.tallyFormUrl || 'https://tally.so/r/xxxxx'
    window.open(url, '_blank')
    toast.success('Tally form opened in new tab')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Configuração e Testes
            </h1>
            <p className="text-gray-600">
              Configure e teste as integrações da aplicação
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Variáveis de Ambiente</CardTitle>
                  <CardDescription>
                    Configure as chaves de API e URLs necessárias
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="HubSpot API Key"
                    type="password"
                    placeholder="pat-na1-..."
                    value={config.hubspotApiKey}
                    onChange={(e) => handleInputChange('hubspotApiKey', e.target.value)}
                  />
                  
                  <Input
                    label="Stripe Publishable Key"
                    placeholder="pk_test_..."
                    value={config.stripePublishableKey}
                    onChange={(e) => handleInputChange('stripePublishableKey', e.target.value)}
                  />
                  
                  <Input
                    label="Stripe Secret Key"
                    type="password"
                    placeholder="sk_test_..."
                    value={config.stripeSecretKey}
                    onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                  />
                  
                  <Input
                    label="Stripe Price ID"
                    placeholder="price_..."
                    value={config.stripePriceId}
                    onChange={(e) => handleInputChange('stripePriceId', e.target.value)}
                  />
                  
                  <Input
                    label="Cal.com URL"
                    placeholder="https://cal.com/prepse/consulta"
                    value={config.calcomUrl}
                    onChange={(e) => handleInputChange('calcomUrl', e.target.value)}
                  />
                  
                  <Input
                    label="Tally Form URL"
                    placeholder="https://tally.so/r/xxxxx"
                    value={config.tallyFormUrl}
                    onChange={(e) => handleInputChange('tallyFormUrl', e.target.value)}
                  />
                  
                  <Input
                    label="App Base URL"
                    placeholder="http://localhost:3000"
                    value={config.appBaseUrl}
                    onChange={(e) => handleInputChange('appBaseUrl', e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Test Results */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Testes de Integração</CardTitle>
                  <CardDescription>
                    Teste cada integração para verificar se está funcionando
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">HubSpot</h3>
                        <p className="text-sm text-gray-600">Teste de criação de contato</p>
                      </div>
                      <Button size="sm" onClick={testHubSpot}>
                        Testar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Stripe</h3>
                        <p className="text-sm text-gray-600">Teste de criação de checkout</p>
                      </div>
                      <Button size="sm" onClick={testStripe}>
                        Testar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Cal.com</h3>
                        <p className="text-sm text-gray-600">Teste de link de agendamento</p>
                      </div>
                      <Button size="sm" onClick={testCalCom}>
                        Testar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Tally</h3>
                        <p className="text-sm text-gray-600">Teste de formulário</p>
                      </div>
                      <Button size="sm" onClick={testTally}>
                        Testar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results Display */}
              {Object.keys(testResults).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados dos Testes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(testResults).map(([service, result]) => (
                        <div key={service} className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium capitalize mb-2">{service}</h4>
                          <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                            {JSON.stringify(result, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Instruções de Configuração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">1. HubSpot</h3>
                  <p>Obtenha sua API key em: Settings → Integrations → API key</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Stripe</h3>
                  <p>Obtenha suas chaves em: Dashboard → Developers → API keys</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Cal.com</h3>
                  <p>Configure seu link de agendamento em: Settings → Event Types</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. Tally</h3>
                  <p>Crie seu formulário e obtenha a URL de compartilhamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
