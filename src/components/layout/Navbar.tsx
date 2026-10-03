import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppStep } from '../../types/mirror';

interface NavbarProps {
  currentStep: AppStep;
  onNavigateStep: (step: AppStep) => void;
  onReset: () => void;
  isLive: boolean;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigateStep,
  onReset,
}) => {
  const goHome = () => {
    onReset();
    onNavigateStep('home');
  };

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        className="mirror-navbar mx-auto max-w-6xl"
        aria-label="Main navigation"
      >

        {/* ───────────── BRAND ───────────── */}
        <button
          type="button"
          className="mirror-brand"
          onClick={goHome}
          aria-label="Go to MIRROR home"
        >
          <div className="mirror-logo">
            <img
              src="/logo.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>

          <span className="mirror-brand-name">
            MIRROR
          </span>
        </button>


        {/* ───────────── NAVIGATION ───────────── */}
        <div className="hidden items-center gap-8 md:flex">

          <button
            type="button"
            className={`nav-link ${
              currentStep === 'home' ? 'text-slate-900' : ''
            }`}
            onClick={goHome}
          >
            Home
          </button>

          <button
            type="button"
            className={`nav-link ${
              currentStep === 'setup' ||
              currentStep === 'understanding' ||
              currentStep === 'roleplay'
                ? 'text-slate-900'
                : ''
            }`}
            onClick={() => onNavigateStep('setup')}
          >
            Practice
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={() => {
              if (currentStep !== 'home') {
                goHome();

                setTimeout(() => {
                  document
                    .getElementById('how-mirror-works')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                }, 100);
              } else {
                document
                  .getElementById('how-mirror-works')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
              }
            }}
          >
            How it works
          </button>

        </div>


        {/* ───────────── RIGHT SIDE ───────────── */}
        <div className="flex items-center gap-2">

          <button
            type="button"
            className="navbar-secondary"
            onClick={() => onNavigateStep('setup')}
          >
            Explore
          </button>

          <button
            type="button"
            className="navbar-primary"
            onClick={() => onNavigateStep('setup')}
          >
            Start Practicing
            <ArrowRight size={14} strokeWidth={2} />
          </button>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;