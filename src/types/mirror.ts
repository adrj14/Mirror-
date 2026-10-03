export type PersonaId = 'recruiter' | 'professor' | 'interviewer' | 'colleague' | 'custom';

export interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  avatar: string;
  description: string;
  tone: string;
  badge: string;
  initialPromptIntro: string;
  systemPromptRole: string;
}

export interface SituationData {
  text: string;
  imagePreview: string | null;
  imageBase64: string | null;
  imageMimeType: string | null;
  imageName: string | null;
  selectedPersonaId: PersonaId;
  customPersonaDetails?: {
    name: string;
    role: string;
    description: string;
  };
}

export interface SituationUnderstanding {
  situation: string;
  targetPerson: string;
  purpose: string;
  importantContext: string;
  observedDynamics: string;
  openingLine: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'persona' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface CommunicationScores {
  clarity: number;
  professionalism: number;
  confidence: number;
  empathy: number;
}

export interface FeedbackItem {
  id: string;
  title: string;
  quote?: string;
  explanation: string;
  category: 'strength' | 'improvement';
}

export interface RetryCoaching {
  originalResponse: string;
  suggestedResponse: string;
  whyBetter: string;
  focusSkill: string;
  context: string;
}

export interface CommunicationReport {
  overallSummary: string;
  scores: CommunicationScores;
  strengths: FeedbackItem[];
  improvements: FeedbackItem[];
  retryOpportunity: RetryCoaching;
  timestamp: string;
}

export type AppStep =
  | 'home'
  | 'setup'
  | 'understanding'
  | 'roleplay'
  | 'reflecting'
  | 'report'
  | 'tryagain';
