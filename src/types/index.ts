export type StepStatus = 'locked' | 'pending' | 'in_progress' | 'done' | 'failed';

export interface JourneyStep {
  id: string;
  label: string;
  description: string;
  status: StepStatus;
  ctaLabel?: string;
  ctaAction?: () => void;
  lockedReason?: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  consent: boolean;
  createdAt: Date;
}

export interface Journey {
  steps: JourneyStep[];
  progress: number;
  updatedAt: Date;
}

export interface AppState {
  user: User | null;
  journey: Journey | null;
  isLoading: boolean;
  error: string | null;
}

export interface HubSpotContact {
  properties: {
    email: string;
    firstname: string;
    lastname?: string;
    consent?: boolean;
    source?: string;
  };
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
}

export interface WebhookPayload {
  type: string;
  data: any;
  email?: string;
}

export interface CalComBooking {
  id: string;
  email: string;
  status: string;
  eventType: {
    title: string;
  };
}

export interface TallyResponse {
  eventId: string;
  eventType: string;
  responseId: string;
  submissionId: string;
  respondentId: string;
  formId: string;
  formName: string;
  createdAt: string;
  fields: Array<{
    key: string;
    label: string;
    value: string;
  }>;
}
