'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AppState, User, Journey, JourneyStep, StepStatus } from '@/types'

interface AppStateContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  updateUser: (user: User) => void
  updateJourney: (journey: Journey) => void
  updateStepStatus: (stepId: string, status: StepStatus) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_JOURNEY'; payload: Journey | null }
  | { type: 'UPDATE_STEP_STATUS'; payload: { stepId: string; status: StepStatus } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

const initialState: AppState = {
  user: null,
  journey: null,
  isLoading: false,
  error: null,
}

function appStateReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_JOURNEY':
      return { ...state, journey: action.payload }
    case 'UPDATE_STEP_STATUS':
      if (!state.journey) return state
      const updatedSteps = state.journey.steps.map(step =>
        step.id === action.payload.stepId
          ? { ...step, status: action.payload.status }
          : step
      )
      const progress = Math.round((updatedSteps.filter(s => s.status === 'done').length / updatedSteps.length) * 100)
      return {
        ...state,
        journey: {
          ...state.journey,
          steps: updatedSteps,
          progress,
          updatedAt: new Date(),
        },
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  const updateUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user })
    localStorage.setItem('prepse_user', JSON.stringify(user))
  }

  const updateJourney = (journey: Journey) => {
    dispatch({ type: 'SET_JOURNEY', payload: journey })
    localStorage.setItem('prepse_journey', JSON.stringify(journey))
  }

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId, status } })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('prepse_user')
      const savedJourney = localStorage.getItem('prepse_journey')
      
      if (savedUser) {
        const user = JSON.parse(savedUser)
        dispatch({ type: 'SET_USER', payload: user })
      }
      
      if (savedJourney) {
        const journey = JSON.parse(savedJourney)
        dispatch({ type: 'SET_JOURNEY', payload: journey })
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('prepse_user', JSON.stringify(state.user))
    }
    if (state.journey) {
      localStorage.setItem('prepse_journey', JSON.stringify(state.journey))
    }
  }, [state.user, state.journey])

  const value: AppStateContextType = {
    state,
    dispatch,
    updateUser,
    updateJourney,
    updateStepStatus,
    setLoading,
    setError,
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
