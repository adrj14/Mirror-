import { PersonaId } from '../types/mirror';

export interface SampleScenario {
  id: string;
  title: string;
  tag: string;
  personaId: PersonaId;
  description: string;
  screenshotHint?: string;
}

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'recruiter-landguard',
    title: 'Explaining Project Impact to Recruiter',
    tag: 'Job Interview',
    personaId: 'recruiter',
    description: "I have a technical interview tomorrow for a software role. I need to explain my capstone project LANDGUARD (an AI-based landslide early warning system) clearly, emphasizing my individual contribution rather than getting lost in vague team details.",
    screenshotHint: 'Resume snippet or GitHub repository overview'
  },
  {
    id: 'difficult-colleague-credit',
    title: 'Confronting Colleague Who Took Credit',
    tag: 'Workplace Conflict',
    personaId: 'colleague',
    description: "During yesterday's leadership demo, my teammate Marcus presented the new caching architecture that I designed and implemented as solely 'his initiative'. I need to address this professionally without starting an office feud or sounding aggressive.",
    screenshotHint: 'Slack message or presentation slide'
  },
  {
    id: 'professor-extension',
    title: 'Requesting Extension from Tough Professor',
    tag: 'Academic',
    personaId: 'professor',
    description: "I need to ask Dr. Vance for a 48-hour extension on my machine learning term project due to a hardware failure with our GPU cluster. He is notoriously strict and dislikes vague excuses.",
    screenshotHint: 'Assignment rubric or server crash log'
  },
  {
    id: 'salary-negotiation',
    title: 'Discussing Promotion & Compensation',
    tag: 'Career Growth',
    personaId: 'interviewer',
    description: "I've been performing at senior engineer capacity for 9 months and led two major feature deliveries. I want to initiate a conversation about adjusting my level and compensation with my manager.",
    screenshotHint: 'Performance review or OKR scorecard'
  }
];
