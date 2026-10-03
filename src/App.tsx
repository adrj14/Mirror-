import React, { useState, useEffect, useMemo } from 'react';
import { AppStep, ChatMessage, CommunicationReport, Persona, SituationData, SituationUnderstanding } from './types/mirror';
import { PERSONAS, getPersonaById } from './data/personas';
import { SampleScenario } from './data/sampleScenarios';
import { AIService } from './services/ai/aiService';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { PracticeSetup } from './components/situation/PracticeSetup';
import { UnderstandingScreen } from './components/situation/UnderstandingScreen';
import { RoleplayScreen } from './components/chat/RoleplayScreen';
import { ReflectingLoader } from './components/report/ReflectingLoader';
import { ReportScreen } from './components/report/ReportScreen';
import { TryAgainScreen } from './components/report/TryAgainScreen';
import { ApiKeyModal } from './components/ui/ApiKeyModal';
import { ToastBanner } from './components/ui/ToastBanner';

export const App: React.FC = () => {
  // Navigation State
  const [currentStep, setCurrentStep] = useState<AppStep>('home');

  // API & AI Configuration State
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('mirror_gemini_api_key') || '';
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);

  // Situation Setup State
  const [situationData, setSituationData] = useState<SituationData>({
    text: '',
    imagePreview: null,
    imageBase64: null,
    imageMimeType: null,
    imageName: null,
    selectedPersonaId: 'recruiter'
  });

  // Understanding State
  const [understanding, setUnderstanding] = useState<SituationUnderstanding | null>(null);

  // Chat Roleplay State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiResponding, setIsAiResponding] = useState(false);

  // Reflection & Report State
  const [report, setReport] = useState<CommunicationReport | null>(null);

  // Resolved Active Persona
  const activePersona: Persona = useMemo(() => {
    if (situationData.selectedPersonaId === 'custom' && situationData.customPersonaDetails?.name) {
      return {
        id: 'custom',
        name: situationData.customPersonaDetails.name,
        role: situationData.customPersonaDetails.role || 'Counterpart',
        avatar: '✨',
        badge: 'Custom',
        description: situationData.customPersonaDetails.description || 'Custom defined conversational counterpart.',
        tone: 'Direct, realistic',
        initialPromptIntro: `Hello. I understand you wanted to speak with me about: "${situationData.text.slice(0, 50)}...". What is the situation?`,
        systemPromptRole: situationData.customPersonaDetails.description || 'Roleplay as requested.'
      };
    }
    return getPersonaById(situationData.selectedPersonaId);
  }, [situationData.selectedPersonaId, situationData.customPersonaDetails, situationData.text]);

  // AI Service Instance
  const aiService = useMemo(() => {
    return new AIService({
      apiKey,
      onFallbackToMock: (reason: string) => {
        setSystemNotice(reason);
      }
    });
  }, [apiKey]);

  const isLive = aiService.isUsingLiveGemini();

  // Settings Handlers
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('mirror_gemini_api_key', key);
    aiService.updateConfig({ apiKey: key });
  };

  // Preset Selection from Landing Page
  const handleSelectSampleScenario = (scenario: SampleScenario) => {
    setSituationData({
      text: scenario.description,
      imagePreview: null,
      imageBase64: null,
      imageMimeType: null,
      imageName: null,
      selectedPersonaId: scenario.personaId
    });
    setCurrentStep('setup');
  };

  // Step 1 -> Step 2: Analyze Situation
  const handleAnalyzeSituation = async () => {
    setIsAiLoading(true);
    try {
      const result = await aiService.understandSituation(situationData, activePersona);
      setUnderstanding(result);
      setCurrentStep('understanding');
    } catch (err: unknown) {
      console.error('Error analyzing situation:', err);
      setSystemNotice('Something went wrong while connecting to Gemini. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Step 2 -> Step 3: Start Interactive Roleplay
  const handleStartConversation = () => {
    if (!understanding) return;

    const initialGreeting: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'persona',
      senderName: activePersona.name,
      text: understanding.openingLine,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([initialGreeting]);
    setCurrentStep('roleplay');
  };

  // Step 3: Handle User Chat Message
  const handleSendMessage = async (userText: string) => {
    if (!understanding || isAiResponding) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsAiResponding(true);

    try {
      const aiReplyText = await aiService.generateRoleplayReply(
        nextMessages,
        understanding,
        activePersona,
        userText
      );

      const aiReplyMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'persona',
        senderName: activePersona.name,
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReplyMessage]);
    } catch (err: unknown) {
      console.error('Error generating AI reply:', err);
      setSystemNotice('Something went wrong while generating the response. Please try again.');
    } finally {
      setIsAiResponding(false);
    }
  };

  // Step 3 -> Step 4: End Practice & Generate Report
  const handleEndPractice = async () => {
    if (!understanding) return;
    setCurrentStep('reflecting');

    try {
      const rep = await aiService.generateCommunicationReport(
        messages,
        understanding,
        activePersona
      );
      setReport(rep);
      setCurrentStep('report');
    } catch (err: unknown) {
      console.error('Error creating report:', err);
      setSystemNotice('Something went wrong while generating your report. Please try again.');
      setCurrentStep('report');
    }
  };

  // Step 4 -> Step 5: Go to Try Again screen
  const handleGoToTryAgain = () => {
    setCurrentStep('tryagain');
  };

  // Step 5 -> Back to Roleplay with Revised Response
  const handlePracticeRevisedResponse = (customRevisedText: string) => {
    if (!understanding) return;

    // Send the revised response into the conversation
    const revisedUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You (Round 2 Attempt)',
      text: customRevisedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, revisedUserMsg]);
    setCurrentStep('roleplay');

    // Trigger persona reaction to revised response
    setIsAiResponding(true);
    setTimeout(async () => {
      try {
        const positiveReply = await aiService.generateRoleplayReply(
          [...messages, revisedUserMsg],
          understanding,
          activePersona,
          customRevisedText
        );
        const personaMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'persona',
          senderName: activePersona.name,
          text: positiveReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, personaMsg]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsAiResponding(false);
      }
    }, 600);
  };

  // Reset Session
  const handleResetSession = () => {
    setMessages([]);
    setUnderstanding(null);
    setReport(null);
    setCurrentStep('setup');
  };

  return (
    <div className="premium-shell min-h-screen text-slate-900 flex flex-col font-sans selection:bg-indigo-200 selection:text-indigo-900">
      {/* Toast Notice */}
      <ToastBanner message={systemNotice} onDismiss={() => setSystemNotice(null)} />

      {/* Navbar */}
      <Navbar
        currentStep={currentStep}
        onNavigateStep={(step) => setCurrentStep(step)}
        onReset={handleResetSession}
        isLive={isLive}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-12">
        {currentStep === 'home' && (
          <LandingPage
            onStartPracticing={() => setCurrentStep('setup')}
            onSelectSampleScenario={handleSelectSampleScenario}
          />
        )}

        {currentStep === 'setup' && (
          <PracticeSetup
            situationData={situationData}
            onChangeSituationData={setSituationData}
            onSubmit={handleAnalyzeSituation}
            isLoading={isAiLoading}
          />
        )}

        {currentStep === 'understanding' && understanding && (
          <UnderstandingScreen
            understanding={understanding}
            persona={activePersona}
            situationData={situationData}
            onConfirm={handleStartConversation}
            onBack={() => setCurrentStep('setup')}
          />
        )}

        {currentStep === 'roleplay' && understanding && (
          <RoleplayScreen
            persona={activePersona}
            understanding={understanding}
            messages={messages}
            onSendMessage={handleSendMessage}
            onEndPractice={handleEndPractice}
            isAiResponding={isAiResponding}
          />
        )}

        {currentStep === 'reflecting' && (
          <ReflectingLoader persona={activePersona} />
        )}

        {currentStep === 'report' && report && (
          <ReportScreen
            report={report}
            persona={activePersona}
            messages={messages}
            onGoToTryAgain={handleGoToTryAgain}
            onRestartPractice={handleResetSession}
          />
        )}

        {currentStep === 'tryagain' && report && understanding && (
          <TryAgainScreen
            coaching={report.retryOpportunity}
            persona={activePersona}
            understanding={understanding}
            onPracticeRevisedResponse={handlePracticeRevisedResponse}
            onBackToReport={() => setCurrentStep('report')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="font-semibold tracking-[0.16em] text-slate-800">MIRROR</span>
            <span>•</span>
            <span className="italic">"See how you communicate before it matters"</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Powered by Google Gemini Multimodal • Built for Hackathon MVP
          </div>
        </div>
      </footer>

      {/* Settings / API Key Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
        isLive={isLive}
      />
    </div>
  );
};

export default App;
