import {
  ChatMessage,
  CommunicationReport,
  Persona,
  SituationData,
  SituationUnderstanding
} from '../../types/mirror';
import { GeminiService } from './geminiService';
import { MockAIService } from './mockAIService';

export interface AIServiceConfig {
  apiKey?: string;
  forceMockMode?: boolean;
  onFallbackToMock?: (reason: string) => void;
}

export class AIService {
  private mockService: MockAIService;
  private geminiService: GeminiService | null = null;
  private forceMockMode: boolean = false;
  private onFallbackToMock?: (reason: string) => void;

  constructor(config?: AIServiceConfig) {
    this.mockService = new MockAIService();
    this.updateConfig(config || {});
  }

  public updateConfig(config: AIServiceConfig): void {
    this.forceMockMode = Boolean(config.forceMockMode);
    this.onFallbackToMock = config.onFallbackToMock;

    const key = config.apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (key.trim()) {
      this.geminiService = new GeminiService(key.trim());
    } else {
      this.geminiService = null;
    }
  }

  public isUsingLiveGemini(): boolean {
    return Boolean(this.geminiService && !this.forceMockMode);
  }

  async understandSituation(
    situation: SituationData,
    persona: Persona
  ): Promise<SituationUnderstanding> {
    if (this.isUsingLiveGemini() && this.geminiService) {
      try {
        return await this.geminiService.understandSituation(situation, persona);
      } catch (err: unknown) {
        console.warn('Gemini understandSituation failed, falling back to mock service:', err);
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.onFallbackToMock?.(`Gemini is temporarily unavailable: ${errorMsg}. Please try again.`);
        return this.mockService.understandSituation(situation, persona);
      }
    }
    return this.mockService.understandSituation(situation, persona);
  }

  async generateRoleplayReply(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona,
    userLatestMessage: string
  ): Promise<string> {
    if (this.isUsingLiveGemini() && this.geminiService) {
      try {
        return await this.geminiService.generateRoleplayReply(
          messages,
          situation,
          persona,
          userLatestMessage
        );
      } catch (err: unknown) {
        console.warn('Gemini roleplay failed, falling back to mock service:', err);
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.onFallbackToMock?.(`Gemini is temporarily unavailable: ${errorMsg}. Please try again.`);
        return this.mockService.generateRoleplayReply(
          messages,
          situation,
          persona,
          userLatestMessage
        );
      }
    }
    return this.mockService.generateRoleplayReply(
      messages,
      situation,
      persona,
      userLatestMessage
    );
  }

  async generateCommunicationReport(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona
  ): Promise<CommunicationReport> {
    if (this.isUsingLiveGemini() && this.geminiService) {
      try {
        return await this.geminiService.generateCommunicationReport(
          messages,
          situation,
          persona
        );
      } catch (err: unknown) {
        console.warn('Gemini report generation failed, falling back to mock service:', err);
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.onFallbackToMock?.(`Gemini is temporarily unavailable: ${errorMsg}. Please try again.`);
        return this.mockService.generateCommunicationReport(
          messages,
          situation,
          persona
        );
      }
    }
    return this.mockService.generateCommunicationReport(
      messages,
      situation,
      persona
    );
  }
}
