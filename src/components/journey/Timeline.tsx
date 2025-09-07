'use client'

import React from 'react'
import { JourneyStep } from '@/types'
import { cn, getStepStatusColor, getStepIcon, isStepUnlocked } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TimelineProps {
  steps: JourneyStep[]
  onStepClick?: (step: JourneyStep) => void
}

export function Timeline({ steps, onStepClick }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
      
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isUnlocked = isStepUnlocked(index, steps)
          const isClickable = isUnlocked && onStepClick
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              {/* Step indicator */}
              <div className={cn(
                'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-300',
                getStepStatusColor(step.status),
                isClickable && 'cursor-pointer hover:scale-110 hover:shadow-lg',
                !isUnlocked && 'opacity-50'
              )}
              onClick={() => isClickable && onStepClick(step)}
              >
                {getStepIcon(step.status)}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0">
                <motion.div
                  className={cn(
                    'rounded-lg border p-4 transition-all duration-300',
                    getStepStatusColor(step.status),
                    isClickable && 'cursor-pointer hover:shadow-md',
                    !isUnlocked && 'opacity-75'
                  )}
                  onClick={() => isClickable && onStepClick(step)}
                  whileHover={isClickable ? { scale: 1.02 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>
                    
                    {step.status === 'locked' && step.lockedReason && (
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {step.lockedReason}
                      </div>
                    )}
                  </div>

                  {step.ctaLabel && isUnlocked && (
                    <div className="mt-3">
                      <button
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          step.ctaAction?.()
                        }}
                      >
                        {step.ctaLabel} →
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
