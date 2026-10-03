import React, { useState } from 'react';
import { ChatMessage, CommunicationReport, Persona } from '../../types/mirror';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ReportScreenProps {
  report: CommunicationReport;
  persona: Persona;
  messages: ChatMessage[];
  onGoToTryAgain: () => void;
  onRestartPractice: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  report,
  persona,
  messages,
  onGoToTryAgain,
  onRestartPractice
}) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const scoreCategories = [
    { label: 'Clarity', score: report.scores.clarity, tip: report.scores.clarity >= 80 ? 'Direct and concise' : 'Lead with the point' },
    { label: 'Professionalism', score: report.scores.professionalism, tip: report.scores.professionalism >= 80 ? 'Strong poise' : 'Watch tone and pacing' },
    { label: 'Confidence', score: report.scores.confidence, tip: report.scores.confidence >= 80 ? 'Clear ownership' : 'Be more direct' },
    { label: 'Empathy', score: report.scores.empathy, tip: report.scores.empathy >= 80 ? 'Context-aware' : 'Acknowledge perspective' }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mirror-chip mx-auto mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          AI feedback indicator
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">Your MIRROR</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Here’s what your communication revealed.
        </p>
      </div>

      <div className="soft-panel rounded-[2rem] p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
          <ShieldCheck className="h-4 w-4" />
          AI-generated reflection
        </div>
        <p className="text-base leading-relaxed text-slate-700">{report.overallSummary}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {scoreCategories.map((item) => (
          <div key={item.label} className="soft-panel rounded-[1.6rem] p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <div className="mb-3 flex items-end gap-1">
              <span className="text-3xl font-semibold tracking-[-0.05em] text-slate-900">{item.score}</span>
              <span className="pb-1 text-xs text-slate-500">/ 100</span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400" style={{ width: `${item.score}%` }} />
            </div>
            <div className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-1 text-center text-[10px] font-semibold text-indigo-700">
              {item.tip}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="soft-panel rounded-[2rem] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Strengths
          </div>
          <div className="space-y-4">
            {report.strengths.map((s, idx) => (
              <div key={s.id || idx} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <span className="text-emerald-500">✓</span>
                  {s.title}
                </div>
                {s.quote && <div className="mb-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm italic text-slate-700">{s.quote}</div>}
                <p className="text-sm leading-relaxed text-slate-600">{s.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="soft-panel rounded-[2rem] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            Areas to improve
          </div>
          <div className="space-y-4">
            {report.improvements.map((imp, idx) => (
              <div key={imp.id || idx} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <span className="text-amber-500">⚠</span>
                  {imp.title}
                </div>
                {imp.quote && <div className="mb-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm italic text-slate-700">{imp.quote}</div>}
                <p className="text-sm leading-relaxed text-slate-600">{imp.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="soft-panel rounded-[2rem] p-4 sm:p-5">
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-700"
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-indigo-500" />
            Evidence from your conversation
          </span>
          {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showTranscript && (
          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
            {messages.map((m) => (
              <div key={m.id} className={`rounded-[1.2rem] border p-3 text-sm ${m.sender === 'user' ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {m.sender === 'user' ? 'You' : persona.name}
                </div>
                <div className="leading-relaxed text-slate-700">{m.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="soft-panel rounded-[2rem] bg-gradient-to-r from-indigo-50 to-violet-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">Next step</div>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-900">Let’s make it better</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onRestartPractice} className="secondary-button px-4 py-2.5 text-sm font-semibold">
              <RotateCcw className="h-4 w-4" />
              <span>Restart</span>
            </button>
            <button type="button" onClick={onGoToTryAgain} className="primary-button px-5 py-2.5 text-sm font-semibold">
              <span>Try Again</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
