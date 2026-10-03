import React from 'react';
import { Persona } from '../../types/mirror';
import { Sparkles, CheckCircle, BarChart3 } from 'lucide-react';

interface ReflectingLoaderProps {
  persona: Persona;
}

export const ReflectingLoader: React.FC<ReflectingLoaderProps> = ({ persona }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="soft-panel w-full max-w-md rounded-[2rem] p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-violet-50 shadow-[0_20px_50px_rgba(79,70,229,0.12)] animate-sweep">
          <span className="mirror-mark h-10 w-10 rounded-xl" aria-label="MIRROR logo" />
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-600">MIRROR</div>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">MIRROR is reflecting</h3>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
            Reading your conversation with {persona.name} and preparing a grounded communication reflection.
          </p>
        </div>

        <div className="mt-6 space-y-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-left text-sm">
          <div className="flex items-center gap-3 text-emerald-600">
            <CheckCircle className="h-4 w-4" />
            <span>Reading your conversation</span>
          </div>
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />
            <span>Finding communication patterns</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <BarChart3 className="h-4 w-4" />
            <span>Preparing your reflection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
