import { JourneyStep, User, Journey } from '@/types'

export const mockUser: User = {
  id: 'user_123',
  name: 'João Silva',
  email: 'joao@example.com',
  consent: true,
  createdAt: new Date('2024-01-15'),
}

export const mockJourneySteps: JourneyStep[] = [
  {
    id: 'account',
    label: 'Criar Conta',
    description: 'Preencha seus dados básicos para começar',
    status: 'done',
    ctaLabel: 'Conta criada',
    icon: '👤'
  },
  {
    id: 'learn',
    label: 'Entender o Processo',
    description: 'Leia as informações sobre nosso serviço',
    status: 'done',
    ctaLabel: 'Processo entendido',
    icon: '📚'
  },
  {
    id: 'schedule',
    label: 'Agendar Consulta',
    description: 'Escolha o melhor horário para sua consulta',
    status: 'pending',
    ctaLabel: 'Agendar consulta',
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

export const mockJourney: Journey = {
  steps: mockJourneySteps,
  progress: 33, // 2 de 6 etapas concluídas
  updatedAt: new Date('2024-01-15T10:30:00'),
}

export const mockFailedJourney: Journey = {
  steps: mockJourneySteps.map((step, index) => ({
    ...step,
    status: index === 2 ? 'failed' : step.status,
  })),
  progress: 33,
  updatedAt: new Date('2024-01-15T10:30:00'),
}
