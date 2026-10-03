import {
  ChatMessage,
  CommunicationReport,
  Persona,
  SituationData,
  SituationUnderstanding
} from '../../types/mirror';

export class GeminiService {
  private apiKey: string;
  private primaryModel = 'gemini-2.5-flash';
  private fallbackModel = 'gemini-1.5-flash';

  constructor(apiKey: string) {
    this.apiKey = apiKey.trim();
  }

  private getUrl(model: string): string {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
  }

  private async callGemini(payload: unknown, modelOverride?: string): Promise<string> {
    const modelToUse = modelOverride || this.primaryModel;
    const url = this.getUrl(modelToUse);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // If 2.5 is unavailable or quota error, try fallback model
        if (modelToUse === this.primaryModel) {
          return this.callGemini(payload, this.fallbackModel);
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as { error?: { message?: string } })?.error?.message ||
          `Gemini API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini returned an empty response.');
      }
      return text;
    } catch (err: unknown) {
      if (modelToUse === this.primaryModel && !String(err).includes('fallback')) {
        return this.callGemini(payload, this.fallbackModel);
      }
      throw err;
    }
  }

  async understandSituation(
    situation: SituationData,
    persona: Persona
  ): Promise<SituationUnderstanding> {
    const prompt = `You are the intelligence engine of MIRROR, an AI conversation-practice platform.
The user wants to practice a real, high-stakes communication scenario.

User description of the situation:
"""${situation.text}"""

Selected Persona to roleplay with:
"${persona.name}" - ${persona.role} (${persona.description})

${situation.imageBase64 ? 'Note: The user also uploaded a screenshot/image for critical context.' : ''}

Analyze this situation and extract the essential parameters. Respond ONLY with a valid JSON object matching this schema:
{
  "situation": "A concise 1-2 sentence description of the scenario",
  "targetPerson": "${persona.name} (${persona.role})",
  "purpose": "Primary objective the user needs to achieve in this conversation",
  "importantContext": "Subtle context, stakes, emotional dynamics, or nuances to keep in mind",
  "observedDynamics": "The interpersonal dynamic (e.g. strict authority, defensive peer, evaluative interviewer)",
  "openingLine": "A realistic, in-character first message from ${persona.name} to initiate the conversation naturally"
}`;

    const parts: unknown[] = [{ text: prompt }];

    if (situation.imageBase64 && situation.imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: situation.imageMimeType,
          data: situation.imageBase64
        }
      });
    }

    const payload = {
      contents: [{ role: 'user', parts }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json'
      }
    };

    const rawResponse = await this.callGemini(payload);
    try {
      const parsed = JSON.parse(rawResponse);
      return {
        situation: parsed.situation || 'Targeted conversation scenario',
        targetPerson: parsed.targetPerson || `${persona.name} (${persona.role})`,
        purpose: parsed.purpose || 'Deliver a clear, professional conversation',
        importantContext: parsed.importantContext || 'Stay focused on concrete points and ownership',
        observedDynamics: parsed.observedDynamics || 'Professional evaluation dynamic',
        openingLine: parsed.openingLine || persona.initialPromptIntro
      };
    } catch {
      return {
        situation: situation.text.slice(0, 140),
        targetPerson: `${persona.name} (${persona.role})`,
        purpose: 'Navigate this conversation effectively',
        importantContext: 'User wants to communicate with confidence and clarity',
        observedDynamics: 'High-stakes professional scenario',
        openingLine: persona.initialPromptIntro
      };
    }
  }

  async generateRoleplayReply(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona,
    _userLatestMessage: string
  ): Promise<string> {
    const systemPrompt = `You are roleplaying as "${persona.name}", a ${persona.role}.
Character profile:
- Tone: ${persona.tone}
- Goal in conversation: ${persona.systemPromptRole}
- Scenario: ${situation.situation}
- Interpersonal Dynamics: ${situation.observedDynamics}

IMPORTANT ROLEPLAY RULES:
1. Stay strictly in character as ${persona.name}.
2. Do NOT mention you are an AI. Do NOT offer meta-advice or coaching during the roleplay.
3. React realistically: If the user rambles or is vague, ask probing questions or express skepticism. If the user is clear and direct, acknowledge it naturally.
4. Keep your responses concise (2 to 4 sentences maximum), conversational, and realistic. Speak like a real human in a conversation.`;

    const contents = messages
      .filter((m) => m.sender !== 'system')
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300
      }
    };

    const reply = await this.callGemini(payload);
    return reply.trim();
  }

  async generateCommunicationReport(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona
  ): Promise<CommunicationReport> {
    const formattedTranscript = messages
      .filter((m) => m.sender !== 'system')
      .map((m) => `${m.sender === 'user' ? 'USER' : persona.name.toUpperCase()}: ${m.text}`)
      .join('\n\n');

    const prompt = `You are MIRROR, an elite communication coach analyzing a simulated conversation.
Analyze how the USER communicated with ${persona.name} (${persona.role}).

SCENARIO:
${situation.situation}

TRANSCRIPT:
"""
${formattedTranscript}
"""

Evaluate the USER's communication across:
1. Clarity (0-100): Directness, structure, brevity, avoiding rambling.
2. Professionalism (0-100): Tone, courtesy, respect, emotional regulation.
3. Confidence (0-100): Decisiveness, ownership, absence of apologetic fillers.
4. Empathy (0-100): Listening, acknowledging counterpart's constraints or perspective.

Provide specific, evidence-based feedback referencing ACTUAL quotes from the user in the transcript.
Avoid generic platitudes.

Return ONLY a valid JSON object matching this schema:
{
  "overallSummary": "2-3 sentences summarizing the user's communication style and key impression",
  "scores": {
    "clarity": 82,
    "professionalism": 88,
    "confidence": 75,
    "empathy": 80
  },
  "strengths": [
    {
      "id": "s-1",
      "title": "Short descriptive title of strength",
      "quote": "Direct snippet from user speech",
      "explanation": "Why this was effective in the context",
      "category": "strength"
    }
  ],
  "improvements": [
    {
      "id": "i-1",
      "title": "Short descriptive title of area to refine",
      "quote": "Direct snippet from user speech that could be better",
      "explanation": "Specific communication breakdown and consequence",
      "category": "improvement"
    }
  ],
  "retryOpportunity": {
    "originalResponse": "One key quote from the user that had room for noticeable improvement",
    "suggestedResponse": "A rewritten, polished version demonstrating high clarity, directness, and ownership",
    "whyBetter": "Explanation of why the suggestion communicates more effectively",
    "focusSkill": "E.g. Bottom-Line-Up-Front (BLUF) or Assertive Boundary Setting",
    "context": "Brief context of where this occurred in the conversation"
  }
}`;

    const payload = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json'
      }
    };

    const rawResponse = await this.callGemini(payload);
    try {
      const parsed = JSON.parse(rawResponse);
      return {
        overallSummary: parsed.overallSummary || `Your conversation with ${persona.name} showed clear intent and professionalism.`,
        scores: {
          clarity: Number(parsed.scores?.clarity) || 80,
          professionalism: Number(parsed.scores?.professionalism) || 85,
          confidence: Number(parsed.scores?.confidence) || 75,
          empathy: Number(parsed.scores?.empathy) || 78
        },
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
        retryOpportunity: parsed.retryOpportunity || {
          originalResponse: messages.find((m) => m.sender === 'user')?.text || '',
          suggestedResponse: 'I spearheaded the technical delivery and aligned directly with our stakeholders.',
          whyBetter: 'States ownership upfront with concise impact.',
          focusSkill: 'Directness',
          context: situation.situation
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } catch {
      throw new Error('Failed to parse Gemini evaluation report JSON');
    }
  }
}
