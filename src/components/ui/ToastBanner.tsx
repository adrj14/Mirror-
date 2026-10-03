import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ToastBannerProps {
  message: string | null;
  onDismiss: () => void;
}

export const ToastBanner: React.FC<ToastBannerProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed right-4 top-20 z-50 w-full max-w-md rounded-[1.4rem] border border-amber-200 bg-white/90 p-4 text-xs text-slate-700 shadow-[0_20px_45px_rgba(15,23,42,0.12)] backdrop-blur-md animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">System Notice</div>
            <p className="mt-1 leading-relaxed text-slate-600">{message}</p>
          </div>
        </div>
        <button onClick={onDismiss} className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" aria-label="Dismiss notice">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
