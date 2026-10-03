import React from 'react';
import {
  ArrowRight,
  Brain,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Upload,
  Check,
} from 'lucide-react';
import { SampleScenario } from '../../data/sampleScenarios';

interface LandingPageProps {
  onStartPracticing: () => void;
  onSelectSampleScenario: (scenario: SampleScenario) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPracticing,
}) => {
  const scrollToHowItWorks = () => {
    document
      .getElementById('how-mirror-works')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden">

        {/* subtle background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-indigo-100/30 blur-3xl" />
          <div className="absolute right-[8%] top-40 h-72 w-72 rounded-full bg-violet-100/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-28 lg:pt-28">

          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

            {/* =================================================
                LEFT — HERO COPY
            ================================================= */}

            <div className="max-w-xl">

              {/* Small label */}

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-sm">

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Sparkles size={11} />
                </span>

                <span className="text-[11px] font-semibold tracking-wide text-slate-600">
                  AI communication practice
                </span>

              </div>

              {/* Main heading */}

              <h1 className="text-[52px] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950 sm:text-[64px] lg:text-[76px]">

                See how you
                <br />

                <span className="text-indigo-600">
                  communicate
                </span>

                <br />

                before it matters.

              </h1>

              {/* Description */}

              <p className="mt-7 max-w-lg text-[16px] leading-7 text-slate-500 sm:text-[17px]">
                Practice the conversations that matter before they happen.
                MIRROR turns real situations into realistic AI roleplay,
                then shows you exactly where your communication can improve.
              </p>

              {/* CTA */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={onStartPracticing}
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-950
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-slate-900/10
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-indigo-600
                  "
                >
                  Start Practicing

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={scrollToHowItWorks}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-slate-700
                    shadow-sm
                    transition-all
                    hover:border-slate-300
                    hover:bg-slate-50
                  "
                >
                  See how it works
                </button>

              </div>

              {/* Small trust row */}

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-400">

                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-500" />
                  Multimodal
                </span>

                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-500" />
                  Realistic roleplay
                </span>

                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-500" />
                  Evidence-based feedback
                </span>

              </div>

            </div>


            {/* =================================================
                RIGHT — PRODUCT EXPERIENCE
            ================================================= */}

            <div className="relative mx-auto w-full max-w-[600px]">

              {/* Glow */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />

              {/* Main card */}

              <div
                className="
                  relative
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white
                  p-2
                  shadow-[0_30px_90px_rgba(15,23,42,0.12)]
                "
              >

                <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-[#f7f8fc]">

                  {/* App header */}

                  <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">

                    <div className="flex items-center gap-2.5">

                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-indigo-100 bg-indigo-50">

                        <img
                          src="/logo.png"
                          alt="MIRROR"
                          className="h-full w-full object-contain p-1"
                        />

                      </div>

                      <span className="text-xs font-bold tracking-[0.16em] text-slate-800">
                        MIRROR
                      </span>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      <span className="text-[9px] font-bold text-emerald-600">
                        LIVE PRACTICE
                      </span>

                    </div>

                  </div>


                  {/* Conversation area */}

                  <div className="p-5 sm:p-7">

                    {/* Context */}

                    <div className="mb-6 flex items-center justify-between">

                      <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Practicing with
                        </p>

                        <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                          Technical Interview
                        </h3>

                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Brain size={17} />
                      </div>

                    </div>


                    {/* AI message */}

                    <div className="flex items-start gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100">
                        <Sparkles size={14} />
                      </div>

                      <div>

                        <p className="mb-1 text-[10px] font-semibold text-slate-400">
                          Recruiter
                        </p>

                        <div className="max-w-[330px] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[13px] leading-6 text-slate-600 shadow-sm">
                          Tell me about a project you're particularly proud of.
                        </div>

                      </div>

                    </div>


                    {/* User message */}

                    <div className="mt-5 flex justify-end">

                      <div className="max-w-[330px] rounded-2xl rounded-tr-md bg-slate-900 px-4 py-3 text-[13px] leading-6 text-white shadow-lg shadow-slate-900/10">

                        I worked on an AI-based landslide risk monitoring
                        system called LANDGUARD.

                      </div>

                    </div>


                    {/* AI next response */}

                    <div className="mt-5 flex items-start gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                        <Sparkles size={14} />
                      </div>

                      <div>

                        <p className="mb-1 text-[10px] font-semibold text-slate-400">
                          Recruiter
                        </p>

                        <div className="max-w-[330px] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[13px] leading-6 text-slate-600 shadow-sm">
                          Interesting. What part of the system did you
                          personally work on?
                        </div>

                      </div>

                    </div>


                    {/* Input */}

                    <div className="mt-7 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">

                      <div className="flex-1 px-2 text-[11px] text-slate-400">
                        Type your response...
                      </div>

                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white">
                        <ArrowRight size={14} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  FLOATING ANALYSIS CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -bottom-7
                  -left-5
                  hidden
                  w-56
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                  sm:block
                  lg:-left-12
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <RotateCcw size={13} />
                    </div>

                    <span className="text-[10px] font-bold text-slate-700">
                      Mirror Report
                    </span>

                  </div>

                  <span className="text-[9px] font-semibold text-emerald-500">
                    ANALYZED
                  </span>

                </div>

                <div className="mt-4 space-y-2.5">

                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-[9px] text-slate-400">
                        Clarity
                      </span>
                      <span className="text-[9px] font-semibold text-slate-600">
                        Strong
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[82%] rounded-full bg-indigo-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-[9px] text-slate-400">
                        Relevance
                      </span>
                      <span className="text-[9px] font-semibold text-slate-600">
                        Strong
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[91%] rounded-full bg-indigo-500" />
                    </div>
                  </div>

                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 text-[9px] text-slate-400">
                  Specific feedback from your conversation
                </div>

              </div>


              {/* =================================================
                  FLOATING UNDERSTANDING CARD
              ================================================= */}

              <div
                className="
                  absolute
                  -right-4
                  top-12
                  hidden
                  w-48
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-[0_20px_50px_rgba(15,23,42,0.10)]
                  lg:block
                  lg:-right-10
                "
              >

                <div className="flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Brain size={13} />
                  </div>

                  <span className="text-[10px] font-bold text-slate-700">
                    Situation understood
                  </span>

                </div>

                <div className="mt-3 space-y-2">

                  <div className="flex justify-between">
                    <span className="text-[9px] text-slate-400">
                      Person
                    </span>

                    <span className="text-[9px] font-semibold text-slate-700">
                      Recruiter
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[9px] text-slate-400">
                      Goal
                    </span>

                    <span className="text-[9px] font-semibold text-slate-700">
                      Interview
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section
        id="how-mirror-works"
        className="border-t border-slate-100 bg-white"
      >

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
              The MIRROR method
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Practice before it matters.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500">
              One simple loop turns an uncertain conversation into something
              you have already practiced.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {/* 01 */}

            <div className="group rounded-3xl border border-slate-200 bg-[#fafbfc] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-500">
                  01
                </span>

                <Upload
                  size={18}
                  className="text-slate-400 transition-colors group-hover:text-indigo-500"
                />

              </div>

              <h3 className="mt-12 text-xl font-semibold tracking-tight text-slate-900">
                Bring the situation
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Describe what is happening or upload a screenshot of the
                conversation you want to practice.
              </p>

            </div>


            {/* 02 */}

            <div className="group rounded-3xl border border-slate-200 bg-[#fafbfc] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-500">
                  02
                </span>

                <MessageCircle
                  size={18}
                  className="text-slate-400 transition-colors group-hover:text-indigo-500"
                />

              </div>

              <h3 className="mt-12 text-xl font-semibold tracking-tight text-slate-900">
                Have the conversation
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                MIRROR becomes the recruiter, professor, interviewer, or
                person you need to practice with.
              </p>

            </div>


            {/* 03 */}

            <div className="group rounded-3xl border border-slate-200 bg-[#fafbfc] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-500">
                  03
                </span>

                <RotateCcw
                  size={18}
                  className="text-slate-400 transition-colors group-hover:text-indigo-500"
                />

              </div>

              <h3 className="mt-12 text-xl font-semibold tracking-tight text-slate-900">
                See your reflection
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Get specific feedback, identify what could improve, and try
                the conversation again.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-white px-5 pb-24 sm:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="relative overflow-hidden rounded-[32px] bg-slate-950 px-7 py-16 text-center sm:px-12">

            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">

                <img
                  src="/logo.png"
                  alt="MIRROR"
                  className="h-full w-full object-contain p-1.5"
                />

              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                Your next conversation
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Don't just know what to say.
                <br />
                Practice saying it.
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-400">
                Turn the conversation you're worried about into a
                conversation you're ready for.
              </p>

              <button
                onClick={onStartPracticing}
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-950
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-indigo-50
                "
              >
                Start Practicing

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;