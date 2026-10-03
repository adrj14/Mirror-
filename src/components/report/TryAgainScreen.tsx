import React, { useState } from 'react';
import { Persona, RetryCoaching, SituationUnderstanding } from '../../types/mirror';
import { Sparkles, ArrowRight, RotateCcw, Check, Copy, Flame, Award } from 'lucide-react';

interface TryAgainScreenProps {
  coaching: RetryCoaching;
  persona: Persona;
  understanding: SituationUnderstanding;
  onPracticeRevisedResponse: (customRevisedText: string) => void;
  onBackToReport: () => void;
}

export const TryAgainScreen: React.FC<TryAgainScreenProps> = ({
  coaching,
  persona,
  understanding,
  onPracticeRevisedResponse,
  onBackToReport
}) => {
  const [revisedText, setRevisedText] = useState(coaching.suggestedResponse);
  const [copied, setCopied] = useState(false);
  const [simulatedScoreBoost, setSimulatedScoreBoost] = useState<number | null>(null);
  const [testedFeedback, setTestedFeedback] = useState<string | null>(null);
  const [isSimulatingTest, setIsSimulatingTest] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(revisedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleTestInSandbox = async () => {
    setIsSimulatingTest(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSimulatingTest(false);
    setSimulatedScoreBoost(14);
    setTestedFeedback(
      `${persona.name}'s reaction: “Now that is clearer. You cut straight to the point and gave me the numbers and ownership right away.”`
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mirror-chip mx-auto mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Step 5 of 5
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">Let’s make it better</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          A clearer version of your answer can change the entire tone of the conversation.
        </p>
      </div>

      <div className="soft-panel rounded-[2rem] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-2 text-indigo-600">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">Coaching focus</div>
              <div className="text-base font-semibold text-slate-900">{coaching.focusSkill}</div>
            </div>
          </div>
          <div className="hidden text-right text-xs text-slate-500 sm:block">
            Counterpart: <span className="font-semibold text-slate-700">{persona.name}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="soft-panel rounded-[2rem] p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">First attempt</div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">Before</div>
          </div>
          <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 italic">
            “{coaching.originalResponse}”
          </div>
          <div className="mt-4 rounded-[1.1rem] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            MIRROR noticed: your main contribution appeared late.
          </div>
        </div>

        <div className="soft-panel rounded-[2rem] border-indigo-200 bg-indigo-50/70 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">Second attempt</div>
            <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            rows={5}
            value={revisedText}
            onChange={(e) => setRevisedText(e.target.value)}
            className="w-full resize-none rounded-[1.4rem] border border-indigo-200 bg-white p-4 text-sm leading-relaxed text-slate-800 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="soft-panel rounded-[2rem] p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
          <Award className="h-4 w-4" />
          Why it works better
        </div>
        <p className="text-base leading-relaxed text-slate-700">{coaching.whyBetter}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="mb-1 font-semibold text-slate-900">Starts with contribution</div>
            The answer begins with what you actually built.
          </div>
          <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="mb-1 font-semibold text-slate-900">More focused</div>
            It avoids burying the key point under background detail.
          </div>
          <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="mb-1 font-semibold text-slate-900">Easier to understand</div>
            The structure is more confident and easier to follow.
          </div>
        </div>
      </div>

      {testedFeedback && (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-semibold">
              <Check className="h-4 w-4 text-emerald-600" />
              Projected reaction
            </div>
            <div className="rounded-full border border-emerald-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              +{simulatedScoreBoost} boost
            </div>
          </div>
          <p className="leading-relaxed">{testedFeedback}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onBackToReport} className="secondary-button w-full px-5 py-3 text-sm font-semibold sm:w-auto">
          <RotateCcw className="h-4 w-4" />
          <span>Back to report</span>
        </button>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button type="button" onClick={handleTestInSandbox} disabled={isSimulatingTest} className="secondary-button px-4 py-3 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>{isSimulatingTest ? 'Simulating...' : 'Test AI reaction'}</span>
          </button>

          <button type="button" onClick={() => onPracticeRevisedResponse(revisedText)} className="primary-button px-5 py-3 text-sm font-semibold">
            <span>Practice this again</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
