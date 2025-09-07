'use client'

import React from 'react'
import { JourneyStep } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn, getStepStatusColor, getStepIcon } from '@/lib/utils'
import { motion } from 'framer-motion'

interface StepCardProps {
  step: JourneyStep
  onAction?: () => void
  className?: string
}

export function StepCard({ step, onAction, className }: StepCardProps) {
  const isActionable = step.status === 'pending' || step.status === 'in_progress'
  const isCompleted = step.status === 'done'
  const isFailed = step.status === 'failed'
  const isLocked = step.status === 'locked'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('w-full', className)}
    >
      <Card className={cn(
        'transition-all duration-300',
        isCompleted && 'border-success-200 bg-success-50',
        isFailed && 'border-error-200 bg-error-50',
        isLocked && 'opacity-60'
      )}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-lg',
              getStepStatusColor(step.status)
            )}>
              {getStepIcon(step.status)}
            </div>
            <div>
              <CardTitle className="text-lg">{step.label}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex items-center space-x-2 text-success-600"
            >
              <span className="text-sm font-medium">✓ Concluído</span>
            </motion.div>
          )}

          {isFailed && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-error-600">
                <span className="text-sm font-medium">❌ Erro no processo</span>
              </div>
              <div className="text-sm text-error-700 bg-error-100 p-3 rounded-lg">
                <p className="font-medium mb-1">O que aconteceu?</p>
                <p>Houve um problema ao processar esta etapa. Tente novamente ou entre em contato conosco se o problema persistir.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onAction}
                className="border-error-300 text-error-700 hover:bg-error-50"
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {isActionable && (
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                {step.status === 'in_progress' && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
                    <span>Processando...</span>
                  </div>
                )}
                {step.status === 'pending' && (
                  <p>Clique no botão abaixo para iniciar esta etapa.</p>
                )}
              </div>
              
              {step.ctaLabel && (
                <Button
                  onClick={onAction}
                  className="w-full"
                  loading={step.status === 'in_progress'}
                >
                  {step.ctaLabel}
                </Button>
              )}
            </div>
          )}

          {isLocked && (
            <div className="space-y-3">
              <div className="text-sm text-gray-500">
                <p>Esta etapa será desbloqueada após completar as etapas anteriores.</p>
                {step.lockedReason && (
                  <p className="mt-1 text-xs bg-gray-100 p-2 rounded">
                    {step.lockedReason}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
