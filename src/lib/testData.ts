// Dados de teste para desenvolvimento e demonstração

export const testUsers = [
  {
    id: 'user_001',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    consent: true,
    createdAt: new Date('2024-01-15T09:00:00'),
  },
  {
    id: 'user_002', 
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    consent: true,
    createdAt: new Date('2024-01-16T14:30:00'),
  },
  {
    id: 'user_003',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    consent: true,
    createdAt: new Date('2024-01-17T11:15:00'),
  }
]

export const testJourneyStates = {
  newUser: {
    steps: [
      { id: 'account', status: 'pending' },
      { id: 'learn', status: 'locked' },
      { id: 'schedule', status: 'locked' },
      { id: 'payment', status: 'locked' },
      { id: 'intake', status: 'locked' },
      { id: 'approval', status: 'locked' }
    ],
    progress: 0
  },
  accountCreated: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'pending' },
      { id: 'schedule', status: 'locked' },
      { id: 'payment', status: 'locked' },
      { id: 'intake', status: 'locked' },
      { id: 'approval', status: 'locked' }
    ],
    progress: 17
  },
  processUnderstood: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'done' },
      { id: 'schedule', status: 'pending' },
      { id: 'payment', status: 'locked' },
      { id: 'intake', status: 'locked' },
      { id: 'approval', status: 'locked' }
    ],
    progress: 33
  },
  consultationScheduled: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'done' },
      { id: 'schedule', status: 'done' },
      { id: 'payment', status: 'pending' },
      { id: 'intake', status: 'locked' },
      { id: 'approval', status: 'locked' }
    ],
    progress: 50
  },
  paymentCompleted: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'done' },
      { id: 'schedule', status: 'done' },
      { id: 'payment', status: 'done' },
      { id: 'intake', status: 'pending' },
      { id: 'approval', status: 'locked' }
    ],
    progress: 67
  },
  intakeCompleted: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'done' },
      { id: 'schedule', status: 'done' },
      { id: 'payment', status: 'done' },
      { id: 'intake', status: 'done' },
      { id: 'approval', status: 'pending' }
    ],
    progress: 83
  },
  fullyCompleted: {
    steps: [
      { id: 'account', status: 'done' },
      { id: 'learn', status: 'done' },
      { id: 'schedule', status: 'done' },
      { id: 'payment', status: 'done' },
      { id: 'intake', status: 'done' },
      { id: 'approval', status: 'done' }
    ],
    progress: 100
  }
}

export const testWebhookEvents = {
  calBookingCreated: {
    type: 'BOOKING_CREATED',
    data: {
      id: 'booking_123',
      attendees: [
        {
          email: 'joao.silva@example.com',
          name: 'João Silva'
        }
      ],
      eventType: {
        title: 'Consulta Médica Online'
      },
      startTime: '2024-01-20T14:00:00Z',
      endTime: '2024-01-20T15:00:00Z'
    }
  },
  stripePaymentCompleted: {
    type: 'checkout.session.completed',
    data: {
      id: 'cs_test_123',
      customer_email: 'joao.silva@example.com',
      payment_status: 'paid',
      amount_total: 15000,
      currency: 'brl'
    }
  },
  tallyFormSubmitted: {
    eventType: 'FORM_RESPONSE',
    responseId: 'response_123',
    formId: 'form_456',
    fields: [
      {
        key: 'email',
        label: 'E-mail',
        value: 'joao.silva@example.com'
      },
      {
        key: 'name',
        label: 'Nome Completo',
        value: 'João Silva'
      },
      {
        key: 'symptoms',
        label: 'Sintomas',
        value: 'Dor de cabeça, cansaço'
      }
    ]
  }
}

// Função para simular delay de API
export const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Função para simular erro de API
export const simulateApiError = (message: string = 'Erro simulado') => 
  Promise.reject(new Error(message))
