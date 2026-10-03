import React, { useState } from 'react';
import { CheckCircle, Eye, EyeOff, Key, X } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
  isLive: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
  isLive
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/15 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 ring-1 ring-slate-200">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-[-0.04em] text-slate-900">AI Settings</div>
              <div className="text-sm text-slate-500">Connect Gemini to power MIRROR</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>{isLive ? 'Gemini Connected' : 'Gemini Not Connected'}</span>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              GEMINI API KEY
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full rounded-[1.1rem] border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => setShowKey((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-700"
                aria-label={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Your key is stored locally in your browser and used for AI requests.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="secondary-button px-4 py-2.5 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="primary-button px-5 py-2.5 text-sm font-medium">
              {savedSuccess ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
