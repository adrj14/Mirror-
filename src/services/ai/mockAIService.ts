import {
  ChatMessage,
  CommunicationReport,
  Persona,
  RetryCoaching,
  SituationData,
  SituationUnderstanding
} from '../../types/mirror';

export class MockAIService {
  async understandSituation(
    situation: SituationData,
    persona: Persona
  ): Promise<SituationUnderstanding> {
    // Simulate brief AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const text = situation.text.toLowerCase();
    const hasImage = Boolean(situation.imageBase64);

    let extractedSituation = "High-stakes professional conversation";
    let purpose = "Navigate communication effectively under pressure";
    let importantContext = "User wants to deliver a concise, confident, and professional message.";
    let observedDynamics = "Direct communication with high accountability expectations.";
    let openingLine = persona.initialPromptIntro;

    if (text.includes('landguard') || text.includes('interview') || persona.id === 'recruiter') {
      extractedSituation = "Technical interview discussing project engineering contribution";
      purpose = "Articulate individual contributions and technical depth to a recruiter";
      importantContext = hasImage
        ? "User shared visual reference/screenshot of project architecture/code to support their explanation."
        : "User needs to explain personal contribution clearly without rambling into generic team overview.";
      observedDynamics = "Recruiter evaluates clarity, ownership, and communication structure.";
      openingLine = "Thanks for taking the time to speak with me today! Could you tell me about a project you're particularly proud of, and what part you personally built?";
    } else if (text.includes('professor') || text.includes('extension') || persona.id === 'professor') {
      extractedSituation = "Academic meeting requesting an extension on project deadlines";
      purpose = "Request additional time transparently with concrete timeline and justification";
      importantContext = hasImage
        ? "User provided documentation/error logs showing technical delays."
        : "Professor values accountability and hates excuses; needs a specific completion plan.";
      observedDynamics = "Strict authority figure requiring respect, evidence, and clear commitment.";
      openingLine = "Come in and have a seat. I have about ten minutes before office hours end. What's going on with your project submission?";
    } else if (text.includes('colleague') || text.includes('credit') || persona.id === 'colleague') {
      extractedSituation = "Workplace dispute regarding ownership, credit, and teamwork";
      purpose = "Address lack of credit and alignment calmly without provoking defensive hostility";
      importantContext = hasImage
        ? "User has screenshot evidence of commit history / slide deck discrepancies."
        : "Marcus tends to deflect blame or act hurried. Direct, non-accusatory language is essential.";
      observedDynamics = "Tense peer-to-peer collaboration requiring psychological safety and assertiveness.";
      openingLine = "Hey, got your message. I'm right in the middle of preparing for the deployment demo. What's on your mind?";
    } else if (persona.id === 'interviewer') {
      extractedSituation = "Technical system design & behavioral interrogation";
      purpose = "Demonstrate engineering maturity, decision-making, and handling trade-offs";
      importantContext = "Interviewer digs deep into edge cases, failures, and communication.";
      observedDynamics = "Fast-paced evaluation of composure and problem-solving.";
      openingLine = "Good to meet you. Tell me about a time when an architectural choice you made failed or created friction. How did you handle it?";
    }

    return {
      situation: extractedSituation,
      targetPerson: `${persona.name} (${persona.role})`,
      purpose,
      importantContext,
      observedDynamics,
      openingLine
    };
  }

  async generateRoleplayReply(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona,
    userLatestMessage: string
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const msgLower = userLatestMessage.toLowerCase();
    const exchangeCount = messages.filter((m) => m.sender === 'user').length;

    if (persona.id === 'recruiter') {
      if (exchangeCount === 1) {
        if (msgLower.includes('frontend') || msgLower.includes('ui') || msgLower.includes('landguard')) {
          return "That sounds like a impactful initiative. When you built that portion, what was the most difficult technical trade-off you had to make, and how did you measure its success?";
        }
        return "Got it. You touched on the broad scope, but could you specify what exact component you personally architected versus what the rest of the team handled?";
      } else if (exchangeCount === 2) {
        return "That gives me a much clearer picture of your technical execution. How did you communicate those technical constraints with non-technical stakeholders or teammates during the sprint?";
      } else {
        return "I appreciate you breaking that down with that level of clarity. That answers my question directly. What are you looking to tackle next in your engineering career?";
      }
    }

    if (persona.id === 'professor') {
      if (exchangeCount === 1) {
        if (msgLower.includes('sorry') || msgLower.includes('deadline')) {
          return "I understand equipment failures happen, but syllabus deadlines are announced 8 weeks in advance. If I give you until Friday, what specific deliverables will you have completed by then?";
        }
        return "Let's be specific here. What portion of the work is already verified, and how much additional time are you actually requesting?";
      } else {
        return "Alright. If you commit to pushing your intermediate results by tomorrow evening, I will approve a 48-hour extension for the final write-up. Does that work for you?";
      }
    }

    if (persona.id === 'colleague') {
      if (exchangeCount === 1) {
        if (msgLower.includes('credit') || msgLower.includes('presentation') || msgLower.includes('yesterday')) {
          return "Look, in the meeting I was just answering the VP's question quickly. I wasn't intentionally trying to cut you out. Everyone knows you're good at what you do. Why didn't you just chime in during the call?";
        }
        return "I felt like the team presentation went well overall. Were you concerned about something specific that wasn't mentioned?";
      } else {
        return "Fair enough. Next time let's align our speaking points on the shared slides before the meeting starts so both our names and contributions are front and center. Sound good?";
      }
    }

    if (persona.id === 'interviewer') {
      if (exchangeCount === 1) {
        return "Walk me through the metrics. When you implemented that resolution, what was the impact on latency and reliability, and what would you do differently today?";
      } else {
        return "Good analysis. That demonstrates sound retrospective thinking. Let's touch upon how your solution scales when concurrent users 10x.";
      }
    }

    // Default custom persona fallback
    return `I hear what you are saying: "${userLatestMessage.slice(0, 45)}...". Moving forward, how do you suggest we proceed to address this directly?`;
  }

  async generateCommunicationReport(
    messages: ChatMessage[],
    situation: SituationUnderstanding,
    persona: Persona
  ): Promise<CommunicationReport> {
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const userMsgs = messages.filter((m) => m.sender === 'user');
    const firstUserMsg = userMsgs[0]?.text || "I was involved in the project development and helped the team finish on time.";
    const secondUserMsg = userMsgs[1]?.text || firstUserMsg;

    // Calculate score heuristics based on message length and clarity
    const avgLen = userMsgs.reduce((acc, m) => acc + m.text.length, 0) / (userMsgs.length || 1);
    const clarityScore = Math.min(94, Math.max(72, Math.round(75 + (avgLen > 60 && avgLen < 280 ? 14 : 5))));
    const profScore = Math.min(96, Math.max(78, Math.round(82 + (userMsgs.length >= 2 ? 8 : 2))));
    const confScore = Math.min(92, Math.max(68, Math.round(70 + (avgLen > 40 ? 12 : 4))));
    const empScore = Math.min(95, Math.max(70, Math.round(78 + (userMsgs.length >= 2 ? 10 : 3))));

    return {
      overallSummary: `You engaged with ${persona.name} with consistent professionalism. Your answers conveyed genuine domain familiarity, while showing opportunities to state your core outcome earlier in your responses.`,
      scores: {
        clarity: clarityScore,
        professionalism: profScore,
        confidence: confScore,
        empathy: empScore
      },
      strengths: [
        {
          id: 's-1',
          title: 'Concrete Project Familiarity',
          quote: `"${firstUserMsg.length > 80 ? firstUserMsg.slice(0, 75) + '...' : firstUserMsg}"`,
          explanation: 'You grounded your statements in real actions rather than purely abstract theory, giving your counterpart clear conversational anchor points.',
          category: 'strength'
        },
        {
          id: 's-2',
          title: 'Professional Composure',
          quote: `"${secondUserMsg.length > 70 ? secondUserMsg.slice(0, 65) + '...' : secondUserMsg}"`,
          explanation: 'Even when prompted for more detail or challenged on specifics, you maintained an even, constructive tone without defensiveness.',
          category: 'strength'
        }
      ],
      improvements: [
        {
          id: 'i-1',
          title: 'Lead With the Outcome (BLUF)',
          quote: `"${firstUserMsg.length > 90 ? firstUserMsg.slice(0, 85) + '...' : firstUserMsg}"`,
          explanation: 'Your key takeaway and personal ownership arrived after foundational background details. Leading with the conclusion (Bottom Line Up Front) immediately commands attention.',
          category: 'improvement'
        },
        {
          id: 'i-2',
          title: 'Sharpen Individual Ownership',
          quote: `"${firstUserMsg.slice(0, 50)}..."`,
          explanation: 'Distinguish clearly between team accomplishments and your specific role. Specify the exact interface, model, or metric you owned.',
          category: 'improvement'
        }
      ],
      retryOpportunity: {
        originalResponse: firstUserMsg,
        suggestedResponse: this.generateSampleImprovedResponse(firstUserMsg, persona),
        whyBetter: 'The improved version eliminates hesitation, clearly states your personal responsibility in the first clause, and provides measurable context.',
        focusSkill: 'Directness & Personal Ownership',
        context: situation.situation
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private generateSampleImprovedResponse(original: string, persona: Persona): string {
    if (persona.id === 'recruiter') {
      return "I led the frontend architecture for LANDGUARD, where I built the real-time landslide risk visualization and reduced API response latency by 35%.";
    }
    if (persona.id === 'professor') {
      return "Dr. Vance, our GPU training cluster experienced a power fault last night. We have 70% of the experimental data ready and request a 48-hour extension to push the final validation set by Friday 5 PM.";
    }
    if (persona.id === 'colleague') {
      return "Marcus, I noticed our team presentation yesterday didn't mention my lead role on the caching pipeline. Let's make sure our deck explicitly credits both our contributions before the leadership recap.";
    }
    return `In regards to this situation, my priority was delivering the core deliverable on time while maintaining full transparency across the team.`;
  }
}
