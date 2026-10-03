import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, Persona, SituationUnderstanding } from '../../types/mirror';
import { Send, Flag, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface RoleplayScreenProps {
  persona: Persona;
  understanding: SituationUnderstanding;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onEndPractice: () => void;
  isAiResponding: boolean;
}

export const RoleplayScreen: React.FC<RoleplayScreenProps> = ({
  persona,
  understanding,
  messages,
  onSendMessage,
  onEndPractice,
  isAiResponding
}) => {
  const [inputText, setInputText] = useState('');
  const [showTips, setShowTips] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const userMessagesCount = messages.filter((m) => m.sender === 'user').length;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiResponding]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || isAiResponding) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-5xl flex-col px-4 py-4 sm:px-6">
      <div className="soft-panel mb-3 rounded-[1.6rem] p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl shadow-inner">
              {persona.avatar}
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">MIRROR / LIVE PRACTICE</div>
              <div className="mt-1 flex items-center gap-2 text-base font-semibold text-slate-900">
                <span>{persona.name}</span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Live</div>
              <div className="text-sm font-medium text-slate-700">{userMessagesCount} responses</div>
            </div>
            <button
              type="button"
              onClick={onEndPractice}
              disabled={userMessagesCount === 0}
              className={`primary-button px-3.5 py-2 text-[11px] font-semibold ${userMessagesCount === 0 ? 'opacity-60' : ''}`}
            >
              <Flag className="h-3.5 w-3.5" />
              <span>End Practice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between gap-3 rounded-[1.2rem] border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-600 backdrop-blur-sm">
        <div className="truncate">
          <span className="font-semibold text-slate-800">Objective:</span> {understanding.purpose}
        </div>
        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 font-medium text-slate-600"
        >
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span>Tips</span>
          {showTips ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {showTips && (
        <div className="mb-3 rounded-[1.25rem] border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <div className="mb-1 font-semibold">Communication guidelines</div>
          <ul className="list-disc space-y-1 pl-4">
            <li>Lead with your main point.</li>
            <li>State your contribution clearly and concretely.</li>
            <li>Keep the focus on the problem, not the emotion.</li>
          </ul>
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto rounded-[2rem] border border-slate-200 bg-slate-50/70 p-4 shadow-inner sm:p-5">
        {messages.map((message) => {
          const isUser = message.sender === 'user';

          return (
            <div key={message.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {isUser ? 'You' : persona.name}
              </div>
              <div
                className={`max-w-[85%] rounded-[1.4rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-br-md'
                    : 'border border-slate-200 bg-white text-slate-700 rounded-bl-md'
                }`}
              >
                {message.text}
              </div>
            </div>
          );
        })}

        {isAiResponding && (
          <div className="flex flex-col items-start">
            <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{persona.name}</div>
            <div className="flex items-center gap-2 rounded-[1.4rem] rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-300" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 rounded-[1.4rem] border border-slate-200 bg-white/90 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <textarea
          ref={textareaRef}
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAiResponding}
          placeholder={isAiResponding ? `${persona.name} is responding...` : `Type your response...`}
          className="w-full resize-none bg-transparent px-1 py-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
        />

        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
          <div className="text-[11px] text-slate-500">02:41 • 3 exchanges • {persona.name}</div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() || isAiResponding}
            className={`primary-button px-4 py-2.5 text-xs font-semibold ${!inputText.trim() || isAiResponding ? 'opacity-60' : ''}`}
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
