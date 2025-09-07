'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ 
  progress, 
  className, 
  showPercentage = true, 
  size = 'md' 
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progresso</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">{progress}%</span>
        )}
      </div>
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        heightClasses[size]
      )}>
        <div
          className={cn(
            'h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out',
            'relative overflow-hidden'
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
