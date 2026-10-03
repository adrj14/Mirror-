import React from 'react';
import { PERSONAS } from '../../data/personas';
import { PersonaId } from '../../types/mirror';
import { Check } from 'lucide-react';

interface PersonaSelectorProps {
  selectedId: PersonaId;
  onSelect: (id: PersonaId) => void;
  customDetails?: {
    name: string;
    role: string;
    description: string;
  };
  onChangeCustomDetails?: (details: { name: string; role: string; description: string }) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedId,
  onSelect,
  customDetails,
  onChangeCustomDetails
}) => {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PERSONAS.filter((p) => p.id !== 'custom').map((persona) => {
          const isSelected = selectedId === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelect(persona.id)}
              className={`relative flex min-h-[180px] w-full flex-col rounded-[1.5rem] border p-4 text-left transition ${
                isSelected
                  ? 'border-indigo-200 bg-indigo-50/80 shadow-[0_16px_40px_rgba(79,70,229,0.08)]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isSelected && (
                <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-2xl shadow-inner">
                {persona.avatar}
              </div>
              <div className="text-base font-semibold text-slate-800">{persona.name}</div>
              <div className="mt-1 text-xs font-medium text-indigo-600">{persona.role}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{persona.description}</p>
              <div className="mt-auto pt-3 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                Tone: {persona.tone.split(',')[0]}
              </div>
            </button>
          );
        })}
      </div>

      <div
        onClick={() => onSelect('custom')}
        className={`rounded-[1.5rem] border p-4 transition ${
          selectedId === 'custom'
            ? 'border-indigo-200 bg-indigo-50/80 shadow-[0_16px_40px_rgba(79,70,229,0.08)]'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-2xl">✨</div>
            <div>
              <div className="text-base font-semibold text-slate-800">Custom</div>
              <div className="text-sm text-slate-600">Practice with a specific person or unique situation</div>
            </div>
          </div>
          {selectedId === 'custom' && (
            <span className="rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-700">
              Selected
            </span>
          )}
        </div>

        {selectedId === 'custom' && (
          <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Name</label>
              <input
                type="text"
                value={customDetails?.name || ''}
                onChange={(e) => onChangeCustomDetails?.({ name: e.target.value, role: customDetails?.role || '', description: customDetails?.description || '' })}
                placeholder="Jordan Miller"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Role</label>
              <input
                type="text"
                value={customDetails?.role || ''}
                onChange={(e) => onChangeCustomDetails?.({ name: customDetails?.name || '', role: e.target.value, description: customDetails?.description || '' })}
                placeholder="Engineering Lead"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Notes</label>
              <input
                type="text"
                value={customDetails?.description || ''}
                onChange={(e) => onChangeCustomDetails?.({ name: customDetails?.name || '', role: customDetails?.role || '', description: e.target.value })}
                placeholder="Values direct feedback"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
