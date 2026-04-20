import type { CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion, TransitionStrategy } from '@/types'

export const promptEngineerProfile: CareerProfile = {
  id: 'prompt-eng-001',
  currentRole: 'Content Writer',
  targetRole: 'Prompt Engineer',
  yearsExperience: 3,
  goal: 'Transition from content writing into prompt engineering, focusing on LLM applications, agentic AI, and evaluation frameworks',
  resumeSummary: '3 years content writing including technical docs, UX copy, and knowledge base articles. Experience with ChatGPT for content drafting.',
  currentSkills: ['Technical writing', 'Research', 'Structured thinking', 'ChatGPT/Claude usage', 'Notion', 'Google Docs', 'Basic HTML'],
  track: 'engineering',
}

export const promptEngineerAnalysis: CareerAnalysis = {
  profileId: 'prompt-eng-001',
  strengths: [
    'Technical writing ability — the clearest prompt engineers are usually good writers',
    'Structured thinking and information hierarchy — critical for breaking down complex tasks into prompt chains',
    'Research skills — essential for evaluating model outputs and understanding task requirements',
    'Familiarity with LLM UX — content writers who use AI tools daily understand output quality intuitively',
    'Audience-aware communication — helps when designing prompts for specific user personas',
  ],
  gaps: [
    { skill: 'Python programming (basic to intermediate)', severity: 'critical', reason: 'Required for building and testing prompt pipelines, evaluation scripts, and integrating with LLM APIs' },
    { skill: 'LLM internals (tokenization, context windows, temperature)', severity: 'critical', reason: 'Prompt engineers must understand model behavior at a technical level, not just user level' },
    { skill: 'Prompt evaluation frameworks (RAGAS, PromptFoo, Evals)', severity: 'critical', reason: 'Measuring prompt quality systematically is the core skill that distinguishes professional prompt engineers' },
    { skill: 'API integration (OpenAI, Anthropic, Gemini APIs)', severity: 'moderate', reason: 'Production prompt engineering requires direct API usage, not just UI-based prompting' },
    { skill: 'Agentic AI patterns (ReAct, tool use, multi-agent)', severity: 'moderate', reason: 'The direction of the field — agent orchestration is increasingly the main use case' },
    { skill: 'RAG and retrieval systems basics', severity: 'moderate', reason: 'Most enterprise LLM applications use RAG; understanding retrieval quality is expected' },
    { skill: 'Version control (Git)', severity: 'minor', reason: 'Prompt versioning and team collaboration require Git basics' },
  ],
  transferableSkills: [
    'Precision in language — the difference between a good and great prompt is often a few words',
    'Task decomposition — breaking complex writing projects into structured sections maps to prompt chaining',
    'Understanding audience and context — prompt optimization requires understanding who reads the output',
    'Iterative refinement — content editing is essentially human RLHF',
    'Documentation and knowledge management — critical for maintaining prompt libraries',
  ],
  readinessScore: 28,
  estimatedTimeline: '3–5 months',
  transitionDifficulty: 'moderate',
  recommendedTopics: [
    { topic: 'Python Basics for Prompt Engineers', priority: 'high', resources: ['Python.org tutorial', 'Automate the Boring Stuff (free)', 'Codecademy Python'] },
    { topic: 'LLM Fundamentals (tokens, context, temperature, sampling)', priority: 'high', resources: ['Andrej Karpathy tokenizer video', 'OpenAI cookbook', 'Anthropic prompt engineering guide'] },
    { topic: 'Prompt Design Patterns', priority: 'high', resources: ['Anthropic prompt engineering docs', 'learnprompting.org', 'Prompt Engineering Guide (dair-ai)'] },
    { topic: 'Evaluation with PromptFoo or RAGAS', priority: 'high', resources: ['PromptFoo documentation', 'RAGAS GitHub', 'OpenAI evals repo'] },
    { topic: 'LLM API Integration (Anthropic/Gemini SDK)', priority: 'medium', resources: ['Anthropic SDK docs', 'Google Gemini API quickstart'] },
    { topic: 'Agentic Patterns and LangChain basics', priority: 'medium', resources: ['LangChain docs', 'DeepLearning.AI LangChain course (free)', 'LlamaIndex docs'] },
  ],
  recommendedInterviewTopics: [
    'Prompt design for specific output formats (JSON, structured data)',
    'Few-shot vs zero-shot prompting trade-offs',
    'Handling hallucinations and grounding techniques',
    'Evaluation methodology for LLM outputs',
    'Agentic workflow design',
    'Chain-of-thought and its variants',
  ],
  generatedAt: '2025-01-15T10:00:00Z',
}

export const promptEngineerRoadmap: Roadmap = {
  id: 'roadmap-prompt-eng-001',
  profileId: 'prompt-eng-001',
  targetRole: 'Prompt Engineer',
  createdAt: '2025-01-15T10:00:00Z',
  phases: [
    {
      phase: 30,
      label: 'Foundation',
      goal: 'Learn Python basics, LLM fundamentals, and build first prompt library',
      tasks: [
        { id: 't1-1', title: 'Complete Python basics (4 weeks, 1hr/day)', description: 'Focus on: variables, functions, lists/dicts, loops, file I/O, and calling APIs with requests. Skip OOP for now.', type: 'learn', estimatedHours: 20, completed: false, resources: ['Automate the Boring Stuff', 'Python.org tutorial'] },
        { id: 't1-2', title: 'Understand LLM mechanics', description: 'Learn: tokenization, context windows, temperature, top-p, system vs user prompts. Read Anthropic and OpenAI engineering blogs.', type: 'learn', estimatedHours: 8, completed: false, resources: ['Andrej Karpathy tokenizer video', 'Anthropic prompt engineering guide'] },
        { id: 't1-3', title: 'Build a prompt library with 20+ prompts across 5 use cases', description: 'Create structured prompts for: summarization, extraction, classification, generation, and Q&A. Document each with examples and failure modes.', type: 'build', estimatedHours: 10, completed: false },
        { id: 't1-4', title: 'Call Gemini and Anthropic APIs with Python', description: 'Write Python scripts to call both APIs. Build a simple CLI that takes a task description and returns LLM output.', type: 'practice', estimatedHours: 6, completed: false },
      ],
      tools: ['Python', 'Gemini API', 'Anthropic SDK', 'Jupyter', 'Git (basics)'],
      projects: [
        { id: 'p1-1', title: 'Prompt Library GitHub Repository', description: '20+ documented prompts across 5 categories. Each prompt includes: purpose, model, system prompt, examples, known failures.', techStack: ['Markdown', 'Python', 'LLM APIs'], proofOfSkill: 'Public GitHub repo with structured prompt documentation' },
      ],
      certifications: [],
    },
    {
      phase: 60,
      label: 'Applied Prompting',
      goal: 'Build real LLM applications and learn systematic prompt evaluation',
      tasks: [
        { id: 't2-1', title: 'Learn chain-of-thought and structured output prompting', description: 'Master: CoT, self-consistency, few-shot formatting, JSON mode, function calling. Build examples for each.', type: 'learn', estimatedHours: 10, completed: false, resources: ['dair-ai Prompt Engineering Guide', 'OpenAI structured outputs docs'] },
        { id: 't2-2', title: 'Set up PromptFoo for prompt evaluation', description: 'Install PromptFoo, write test cases for a prompt, run automated evaluation. Learn what metrics to track.', type: 'practice', estimatedHours: 8, completed: false, resources: ['PromptFoo docs', 'PromptFoo GitHub'] },
        { id: 't2-3', title: 'Build a content pipeline with LLM automation', description: 'Automate a content writing workflow: brief → research → outline → draft → review. Use your writing domain expertise here.', type: 'build', estimatedHours: 14, completed: false },
        { id: 't2-4', title: 'Study RAG basics and build a Q&A system', description: 'Learn: embeddings, chunking, retrieval. Build a document Q&A system using LangChain + Gemini over your own content.', type: 'build', estimatedHours: 12, completed: false },
        { id: 't2-5', title: 'Document hallucination patterns and mitigation techniques', description: 'Research and document 10 common hallucination types. For each, write prompts that reduce them and explain why.', type: 'build', estimatedHours: 6, completed: false },
      ],
      tools: ['LangChain', 'PromptFoo', 'ChromaDB', 'Gemini API', 'Anthropic Claude API'],
      projects: [
        { id: 'p2-1', title: 'LLM-Powered Content Pipeline', description: 'Automated content creation: input a topic → research brief → structured outline → draft → quality evaluation. Uses CoT and structured outputs.', techStack: ['Python', 'LangChain', 'Gemini API', 'PromptFoo'], proofOfSkill: 'Demo video + GitHub repo with PromptFoo test results' },
      ],
      certifications: ['DeepLearning.AI ChatGPT Prompt Engineering (Andrew Ng, free)'],
    },
    {
      phase: 90,
      label: 'Agentic AI & Mastery',
      goal: 'Build agentic systems, master evaluation, and achieve interview readiness',
      tasks: [
        { id: 't3-1', title: 'Learn agentic AI patterns (ReAct, tool use, multi-agent)', description: 'Build a ReAct agent with tool calling. Use LangChain or LlamaIndex. Understand: planning, observation, memory.', type: 'learn', estimatedHours: 14, completed: false, resources: ['LangChain agents docs', 'ReAct paper', 'DeepLearning.AI multi-agent course'] },
        { id: 't3-2', title: 'Build a multi-step agentic application', description: 'Create an agent that: reads documents, uses tools (search, code execution), maintains memory, and produces structured reports.', type: 'build', estimatedHours: 20, completed: false },
        { id: 't3-3', title: 'Master prompt versioning and team workflows', description: 'Set up a Git-based prompt versioning system. Learn: branching for prompt experiments, diff-ing prompt versions, CI for prompt evals.', type: 'practice', estimatedHours: 6, completed: false },
        { id: 't3-4', title: 'Practice scenario interview questions x20', description: 'Use Trajectory AI. Focus on scenario-based questions: design a prompt chain, evaluate this output, fix this hallucination.', type: 'practice', estimatedHours: 5, completed: false },
        { id: 't3-5', title: 'Publish to Hugging Face Spaces', description: 'Deploy your agentic app as a Gradio or Streamlit app on HF Spaces. Free hosting, huge visibility.', type: 'network', estimatedHours: 4, completed: false },
      ],
      tools: ['LangChain Agents', 'LlamaIndex', 'Gradio', 'HuggingFace Spaces', 'PromptFoo CI'],
      projects: [
        { id: 'p3-1', title: 'Agentic Research + Writing Assistant', description: 'Agent that takes a topic, searches the web, extracts key info, synthesizes a structured report. Uses ReAct pattern with tool use.', techStack: ['LangChain', 'Gemini API', 'Tavily Search', 'Gradio', 'HF Spaces'], proofOfSkill: 'Live demo on HF Spaces with usage README' },
      ],
      certifications: ['DeepLearning.AI Agentic AI short courses'],
    },
  ],
}

export const promptEngineerQuestions: InterviewQuestion[] = [
  {
    id: 'q-pe-01',
    question: 'Design a prompt chain to extract structured information from legal contracts: parties involved, key dates, obligations, and penalties. How do you handle long documents that exceed the context window?',
    topic: 'Prompt Chain Design',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
    hints: ['Chunking strategy', 'Map-reduce pattern', 'JSON schema output'],
  },
  {
    id: 'q-pe-02',
    question: 'You deploy a prompt that works great in testing but produces inconsistent outputs in production. Walk through your debugging and mitigation approach.',
    topic: 'Prompt Reliability',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
  {
    id: 'q-pe-03',
    question: 'Explain the difference between zero-shot, few-shot, and chain-of-thought prompting. When would each be the wrong choice?',
    topic: 'Prompting Techniques',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
  {
    id: 'q-pe-04',
    question: 'A product manager wants to use an LLM to classify customer support tickets into 20 categories with 95% accuracy. How do you approach this? What are the real risks?',
    topic: 'LLM Application Design',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
  {
    id: 'q-pe-05',
    question: 'How do you systematically evaluate prompt quality across 1000 test cases? What does your evaluation pipeline look like?',
    topic: 'Prompt Evaluation',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
  {
    id: 'q-pe-06',
    question: 'What is the difference between fine-tuning and prompt engineering for adapting an LLM to a specific task? When would you choose each?',
    topic: 'LLM Fundamentals',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
  {
    id: 'q-pe-07',
    question: 'How does your writing background give you an edge as a prompt engineer compared to a software engineer learning the same skills?',
    topic: 'Career Transition',
    difficulty: 'beginner',
    mode: 'behavioral',
    roleContext: 'Prompt Engineer',
    source: 'resume',
  },
  {
    id: 'q-pe-08',
    question: 'Design an agentic workflow for a customer service bot that can: look up order status, escalate to humans, and draft email replies. What tools, memory, and guardrails would you design?',
    topic: 'Agentic AI Design',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'Prompt Engineer',
    source: 'target-role',
  },
]

export const promptEngineerStrategy: TransitionStrategy = {
  profileId: 'prompt-eng-001',
  summary: 'Your writing background is genuinely rare in prompt engineering — most practitioners are engineers who learned to write, not writers who learned engineering. That is a real advantage for prompt quality and documentation. The gap is technical depth. Build Python skills and a public portfolio fast.',
  transferableStrengths: [
    'Language precision — the most important practical skill in prompt engineering',
    'Understanding of audience and communication context',
    'Iterative editing mindset — prompt refinement is structured iteration',
    'Research and knowledge synthesis skills',
    'Experience explaining complex topics simply — useful for prompt design',
  ],
  criticalGaps: [
    { area: 'Python programming', action: 'Learn Python focused on API calls, file I/O, and data manipulation. Skip advanced topics for now.', urgency: 'immediate' },
    { area: 'LLM API integration', action: 'Build 3 projects that call Gemini and Anthropic APIs programmatically. UI-only usage is not enough.', urgency: 'immediate' },
    { area: 'Evaluation methodology', action: 'Set up PromptFoo and write test suites for every prompt you create.', urgency: 'immediate' },
    { area: 'Agentic patterns', action: 'Build one agentic project before interviewing — it is the most discussed topic in 2025.', urgency: 'short-term' },
  ],
  strategy: [
    { step: 1, title: 'Build a Public Prompt Library Fast', description: 'Your writing skills mean you can build a quality prompt library faster than engineers. Do this in week 1. Put it on GitHub.', duration: 'Week 1' },
    { step: 2, title: 'Get Python to "enough" Quickly', description: 'You need Python for API calls and eval scripts, not full engineering. 30 days of focused practice gets you there.', duration: 'Month 1' },
    { step: 3, title: 'Target AI-Focused Content + Prompt Hybrid Roles', description: 'Many companies need someone who can both prompt AND document the outputs. This hybrid role plays to your strengths.', duration: 'Month 2 onwards' },
    { step: 4, title: 'Publish on HuggingFace Spaces', description: 'Deploy a demo of your agentic app. Writers who build demos are extremely rare and memorable.', duration: 'Month 3' },
    { step: 5, title: 'Create content about prompt engineering', description: 'Write about what you are learning. LinkedIn posts, a blog, or GitHub README writeups — this builds audience and signals deep understanding.', duration: 'Ongoing' },
  ],
  timeline: [
    { week: 1, milestone: 'Prompt library on GitHub', deliverable: '20+ documented prompts across 5 use cases' },
    { week: 4, milestone: 'Python + API integration working', deliverable: 'CLI script calling Gemini and Anthropic APIs' },
    { week: 8, milestone: 'Content pipeline built and evaluated', deliverable: 'PromptFoo test suite with measurable quality scores' },
    { week: 12, milestone: 'Agentic app deployed', deliverable: 'Live HF Spaces demo' },
    { week: 16, milestone: 'First interviews', deliverable: 'Portfolio: 3 projects, GitHub prompt library, HF demo' },
  ],
  portfolioPlan: [
    { project: 'Prompt Library Repository', purpose: 'Shows systematic prompting skill and documentation ability', techStack: ['Markdown', 'Python', 'LLM APIs'] },
    { project: 'LLM Content Pipeline', purpose: 'Combines writing expertise with LLM automation — unique positioning', techStack: ['Python', 'LangChain', 'Gemini API', 'PromptFoo'] },
    { project: 'Agentic Research Assistant on HF Spaces', purpose: 'Live demo shows technical execution, not just theory', techStack: ['LangChain', 'Gemini API', 'Gradio', 'HuggingFace Spaces'] },
  ],
  interviewFocus: [
    'Prompt chain design for complex multi-step tasks',
    'Evaluation methodology (PromptFoo, RAGAS, custom metrics)',
    'Hallucination detection and mitigation',
    'Agentic AI architecture and tool design',
    'Fine-tuning vs prompt engineering decision framework',
    'Content writer advantage in prompt engineering (behavioral)',
  ],
}

export const promptEngineerFlow = {
  id: 'prompt-engineer',
  profile: promptEngineerProfile,
  analysis: promptEngineerAnalysis,
  roadmap: promptEngineerRoadmap,
  interviewQuestions: promptEngineerQuestions,
  strategy: promptEngineerStrategy,
  evaluationSeeds: {} as Record<string, {
    strengths: string[]
    weaknesses: string[]
    missedPoints: string[]
    betterAnswer: string
    followUpQuestions: string[]
    recommendation: string
  }>,
}
