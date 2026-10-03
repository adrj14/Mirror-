import React from 'react';
import { Persona, SituationData, SituationUnderstanding } from '../../types/mirror';
import { Target, User, MessageCircle, Sparkles, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface UnderstandingScreenProps {
  understanding: SituationUnderstanding;
  persona: Persona;
  situationData: SituationData;
  onConfirm: () => void;
  onBack: () => void;
}

export const UnderstandingScreen: React.FC<UnderstandingScreenProps> = ({
  understanding,
  persona,
  situationData,
  onConfirm,
  onBack
}) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <div className="mb-8 text-center">
        <div className="mirror-chip mx-auto mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Step 2 of 5
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">
          MIRROR is reading your situation
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Analyzing the context, detecting the other person’s role, and preparing your practice conversation.
        </p>
      </div>

      <div className="soft-panel animate-fade-in rounded-[2rem] p-5 sm:p-6 lg:p-7">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <User className="h-3.5 w-3.5 text-indigo-500" />
              Person
            </div>
            <div className="text-lg font-semibold text-slate-900">{understanding.targetPerson || persona.name}</div>
            <div className="mt-2 text-sm text-slate-600">{persona.role}</div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Target className="h-3.5 w-3.5 text-indigo-500" />
              Purpose
            </div>
            <div className="text-sm leading-relaxed text-slate-700">{understanding.purpose}</div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <ImageIcon className="h-3.5 w-3.5 text-indigo-500" />
              Key details
            </div>
            <div className="text-sm leading-relaxed text-slate-700">{understanding.importantContext}</div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-indigo-100 bg-indigo-50/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
            <MessageCircle className="h-3.5 w-3.5" />
            Opening line
          </div>
          <blockquote className="text-base leading-relaxed text-slate-700">
            “{understanding.openingLine}”
          </blockquote>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="secondary-button w-full px-5 py-3.5 text-sm font-semibold sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Edit Situation</span>
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="primary-button w-full px-6 py-3.5 text-base font-semibold sm:w-auto"
        >
          <span>Start Practice</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
