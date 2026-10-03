# 🪞 MIRROR
> **“See how you communicate before it matters.”**

MIRROR is an AI conversation-practice platform built for high-stakes professional and interpersonal conversations.

Instead of asking *“What should I say?”*, MIRROR lets you practice the actual conversation. You describe a real situation (or attach a screenshot/document), select your counterpart, and practice in a live conversational sparring session powered by **Gemini 2.5 / 1.5 Flash**. After the conversation, MIRROR synthesizes evidence-based feedback into your **Mirror Report**, extracts your weakest response, and lets you **Try Again** with an outcome-first, polished formulation.

---

## 🔁 The Core User Flow

```
REAL SITUATION  ──>  UNDERSTAND  ──>  ROLEPLAY  ──>  REFLECT  ──>  TRY AGAIN  ──>  IMPROVE
(Text + Image)       (Gemini)        (In Character) (Report)      (Rewritten)     (Round 2)
```

1. **Home**: High-converting, modern landing page with 1-click test scenarios.
2. **Describe Situation**: Real context text input + optional screenshot uploader (drag & drop, <5MB validation, image-to-base64 for multimodal vision).
3. **Select Persona**:
   - 💼 **Sarah Lin** (*Technical Recruiter*)
   - 👩‍🏫 **Dr. Robert Vance** (*Computer Science Professor*)
   - 🎤 **Alex Rivera** (*Senior Technical Interviewer*)
   - 🧑‍💻 **Marcus Brody** (*Difficult Colleague*)
   - ✨ **Custom Persona** (*Define your own counterpart, role, and tone*)
4. **Gemini Understanding**: Synthesizes the scenario into structured cards: Situation, Counterpart dynamics, Core Objective, and In-Character Opening Line preview.
5. **Interactive Roleplay**: Dynamic multi-turn conversation with persona memory, typing indicators, coaching tips, auto-scroll, and an immediate **End Practice** trigger.
6. **Mirror Report**:
   - 4 Quantified Metrics: **Clarity**, **Professionalism**, **Confidence**, and **Empathy** (clearly labeled as AI-generated feedback).
   - Evidence-based **Strengths** with exact quotes from the transcript.
   - Specific **Opportunities for Improvement** (BLUF, ownership, eliminating defensiveness).
   - Expandable full transcript log.
7. **Try Again (The Mirror Revision)**:
   - Identifies the user's unpolished response.
   - Side-by-side comparison: **First Attempt (Original)** vs **MIRROR Suggests**.
   - Tactical coaching breakdown (*Why This Formulation Works Better*).
   - **Interactive Sandbox**: Test immediate AI reaction (+14 projected communication boost) or practice the revised response in a second live round!

---

## ⚡ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite 8
- **Styling**: Tailwind CSS v4, custom glassmorphism & reflective dark theme
- **Icons**: Lucide React
- **AI Core**:
  - `GeminiService`: Direct Google Generative Language API integration supporting multimodal image payloads (`inlineData`) and structured JSON output.
  - `MockAIService`: Offline-ready realistic simulation engine for all personas, dialogues, reports, and revisions.
  - `AIService` Facade: Automatic fallback to Mock mode if the API key is missing or encounters rate limits, ensuring the demo **NEVER breaks**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your free Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note: If no API key is supplied, MIRROR runs seamlessly in **Smart Offline Simulation Mode**.*

### 3. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🛡️ Security & Privacy
- API keys are handled strictly client-side or via environment variables.
- API keys are excluded in `.gitignore` (`.env` and `.env*.local`).
- Browser images are processed in-memory as base64 strings and never stored on external databases.
- The UI includes an **AI Engine Settings** modal to toggle Simulation mode or set a key on the fly.
