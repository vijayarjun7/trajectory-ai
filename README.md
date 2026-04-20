# Trajectory AI

A career transition system — not a chatbot.

Trajectory AI helps engineers go from *"I want to switch roles"* to *"I am ready for interviews"* through:
- **Career Gap Analysis** — Identifies skill gaps and readiness score
- **30/60/90-Day Roadmap** — Structured, role-specific learning plan with checkboxes
- **Interview Coach** — Targeted mock interviews with strict, realistic evaluation
- **Voice Interview Mode** — Browser-native speech recognition and synthesis
- **Transition Strategy** — Step-by-step transition plan with portfolio guidance
- **Industry Shift** — What's rising, declining, and how AI is impacting your target role

## Demo Flows (works without any API key)

| Flow | Description |
|------|-------------|
| QE → DevOps Engineer | Docker, Kubernetes, CI/CD, Terraform interviews |
| Backend → AI/ML Engineer | ML fundamentals, LLMs, RAG, MLOps |
| Content Writer → Prompt Engineer | Prompt chains, evaluation, agentic AI |

## Tech Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (dark mode default)
- **Zustand** (state management)
- **React Router v6**
- **Google Gemini API** (optional — for live AI)
- **Hugging Face Inference API** (optional — for embeddings + scoring)
- **Web Speech API** (built into browser — no key needed)

## Setup

```bash
npm install
npm run dev
```

The app runs fully in **Demo Mode** without any API keys — all 3 demo flows are pre-loaded with realistic data.

## Live AI Mode (optional)

Create `.env.local` and add your keys:

```
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_HF_TOKEN=your_hf_token_here
```

With Gemini key: career analysis, roadmap generation, and interview evaluation use real Gemini 1.5 Flash.
With HF token: resume embeddings and answer scoring use `sentence-transformers/all-MiniLM-L6-v2`.

## Voice Interview Mode

Works in **Chrome and Edge** (desktop). Uses:
- `SpeechSynthesis` API to speak interview questions
- `SpeechRecognition` API to transcribe your spoken answer
- Transcript is editable before submission

Falls back to text input gracefully if APIs are unavailable.

## Deploy to Netlify

```bash
npm run build
# drag the dist/ folder to netlify.com/drop
```

Or connect your GitHub repo to Netlify for automatic deploys.

## Skills Demonstrated

- Prompt engineering with structured JSON output
- LLM API integration (Gemini) with fallback pattern
- Hugging Face embeddings and cross-encoder scoring
- Web Speech API lifecycle management
- Zustand store orchestration
- Component-driven React architecture
- TypeScript interfaces for AI data structures
