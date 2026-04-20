import type { CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion, TransitionStrategy } from '@/types'

export const backendToAimlProfile: CareerProfile = {
  id: 'backend-aiml-001',
  currentRole: 'Backend Engineer',
  targetRole: 'AI/ML Engineer',
  yearsExperience: 5,
  goal: 'Transition from backend Python/API development into ML engineering focused on production model deployment and LLMOps',
  resumeSummary: '5 years backend with Python, FastAPI, PostgreSQL, Redis, Celery, and AWS. Built data pipelines with Airflow. Comfortable with pandas/numpy.',
  currentSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Airflow', 'AWS', 'pandas', 'numpy', 'Docker', 'Git'],
  track: 'engineering',
}

export const backendToAimlAnalysis: CareerAnalysis = {
  profileId: 'backend-aiml-001',
  strengths: [
    'Strong Python skills — the primary language of the ML ecosystem',
    'Data pipeline experience (Airflow) maps directly to ML pipelines',
    'API development background is critical for model serving and MLOps',
    'AWS knowledge covers SageMaker, Lambda, and model hosting infrastructure',
    'pandas/numpy familiarity means the data manipulation layer is not a blocker',
  ],
  gaps: [
    { skill: 'ML Fundamentals (supervised/unsupervised learning, evaluation)', severity: 'critical', reason: 'Core ML theory required before any practical work — cannot skip this' },
    { skill: 'PyTorch or TensorFlow', severity: 'critical', reason: 'Framework-level deep learning skills are expected for ML engineer roles' },
    { skill: 'Model Evaluation & Experimentation (MLflow, W&B)', severity: 'critical', reason: 'Experiment tracking and model versioning are required for production ML' },
    { skill: 'Feature Engineering & Feature Stores', severity: 'moderate', reason: 'Critical for production ML systems; missing from backend engineering exposure' },
    { skill: 'LLMs and Prompt Engineering', severity: 'moderate', reason: 'Expected in most new ML engineer roles as of 2024–2025' },
    { skill: 'Vector Databases (Pinecone, pgvector, Weaviate)', severity: 'moderate', reason: 'Core infrastructure for RAG and semantic search systems' },
    { skill: 'Model Deployment (BentoML, Triton, SageMaker)', severity: 'moderate', reason: 'The deployment half of ML engineering is often undertested by candidates' },
    { skill: 'Statistics (hypothesis testing, distributions)', severity: 'minor', reason: 'Needed for model evaluation and A/B testing; gaps likely exist despite data experience' },
  ],
  transferableSkills: [
    'Python proficiency — no ramp-up needed for ML libraries',
    'API design — critical for building model-serving endpoints',
    'Data pipelines with Airflow — maps directly to ML feature pipelines',
    'System design — required for scalable ML system architecture',
    'AWS infrastructure — SageMaker, Lambda, S3 all directly relevant',
  ],
  readinessScore: 45,
  estimatedTimeline: '5–7 months',
  transitionDifficulty: 'challenging',
  recommendedTopics: [
    { topic: 'ML Fundamentals + Linear Algebra Basics', priority: 'high', resources: ['fast.ai (top-down)', 'Andrej Karpathy Neural Networks Zero to Hero', 'StatQuest YouTube'] },
    { topic: 'PyTorch Deep Dive', priority: 'high', resources: ['PyTorch official tutorials', 'Deep Learning with PyTorch book', 'fast.ai course'] },
    { topic: 'MLflow + Experiment Tracking', priority: 'high', resources: ['MLflow documentation', 'MLflow on Databricks free tier'] },
    { topic: 'Hugging Face Transformers', priority: 'high', resources: ['HuggingFace course (free)', 'Transformers documentation'] },
    { topic: 'LLMs and LangChain/LlamaIndex', priority: 'medium', resources: ['LangChain documentation', 'DeepLearning.AI short courses', 'Full Stack LLM Bootcamp'] },
    { topic: 'Vector Databases (pgvector + Pinecone)', priority: 'medium', resources: ['Pinecone learning center', 'pgvector GitHub docs'] },
    { topic: 'Model Deployment with FastAPI + Docker', priority: 'medium', resources: ['Your existing FastAPI skills + add ML model serialization'] },
  ],
  recommendedInterviewTopics: [
    'Bias-variance trade-off',
    'Model evaluation metrics (precision/recall/F1, AUC-ROC)',
    'Overfitting prevention strategies',
    'ML system design (feature store, training pipeline, serving)',
    'LLM fine-tuning vs prompt engineering trade-offs',
    'Vector database use cases',
  ],
  generatedAt: '2025-01-15T10:00:00Z',
}

export const backendToAimlRoadmap: Roadmap = {
  id: 'roadmap-backend-aiml-001',
  profileId: 'backend-aiml-001',
  targetRole: 'AI/ML Engineer',
  createdAt: '2025-01-15T10:00:00Z',
  phases: [
    {
      phase: 30,
      label: 'ML Foundations',
      goal: 'Build solid theoretical and practical ML foundations with PyTorch',
      tasks: [
        { id: 't1-1', title: 'Complete fast.ai Practical Deep Learning course', description: 'Top-down approach to ML — start with working models, then understand the math. Ideal for engineers.', type: 'learn', estimatedHours: 20, completed: false, resources: ['fast.ai Part 1'] },
        { id: 't1-2', title: 'Build a text classifier with PyTorch', description: 'Train a sentiment analysis model on IMDB dataset. Implement from scratch (not HuggingFace yet). Track with MLflow.', type: 'build', estimatedHours: 12, completed: false },
        { id: 't1-3', title: 'Study bias-variance, regularization, and evaluation metrics', description: 'Focus on the concepts interviewers actually test: precision/recall, ROC-AUC, cross-validation, L1/L2.', type: 'learn', estimatedHours: 8, completed: false, resources: ['StatQuest YouTube', 'Elements of Statistical Learning (free PDF)'] },
        { id: 't1-4', title: 'Set up MLflow tracking server locally', description: 'Run experiments, log metrics, compare model versions. This will be a recurring tool in all future projects.', type: 'practice', estimatedHours: 4, completed: false },
      ],
      tools: ['PyTorch', 'MLflow', 'Jupyter', 'scikit-learn', 'pandas', 'matplotlib'],
      projects: [
        { id: 'p1-1', title: 'ML Model Training Pipeline', description: 'End-to-end: data loading → preprocessing → model training → MLflow tracking → model evaluation report', techStack: ['PyTorch', 'MLflow', 'scikit-learn', 'pandas'], proofOfSkill: 'Jupyter notebook with MLflow UI screenshots showing experiment tracking' },
      ],
      certifications: [],
    },
    {
      phase: 60,
      label: 'LLMs & Production ML',
      goal: 'Master Hugging Face ecosystem, LLMs, and production model serving',
      tasks: [
        { id: 't2-1', title: 'Complete Hugging Face NLP Course', description: 'Covers tokenizers, transformers, fine-tuning, and the Hub. Free and comprehensive.', type: 'learn', estimatedHours: 16, completed: false, resources: ['huggingface.co/learn/nlp-course'] },
        { id: 't2-2', title: 'Fine-tune a BERT/RoBERTa model on a custom dataset', description: 'Pick a classification task (e.g., job posting categorization). Fine-tune, evaluate, push to HF Hub.', type: 'build', estimatedHours: 14, completed: false },
        { id: 't2-3', title: 'Build a RAG pipeline with pgvector', description: 'Index documents using sentence-transformers embeddings in pgvector. Build a Q&A interface using LangChain.', type: 'build', estimatedHours: 16, completed: false },
        { id: 't2-4', title: 'Deploy a model as a FastAPI service', description: 'Serialize a trained model (ONNX or pickle), wrap in FastAPI, containerize with Docker. Add /health and /predict endpoints.', type: 'build', estimatedHours: 10, completed: false },
        { id: 't2-5', title: 'Study LLM prompting patterns', description: 'Learn few-shot, chain-of-thought, ReAct, and structured output prompting. Build examples with Gemini or OpenAI API.', type: 'learn', estimatedHours: 8, completed: false },
      ],
      tools: ['Hugging Face Transformers', 'LangChain', 'pgvector', 'ONNX Runtime', 'FastAPI', 'Docker'],
      projects: [
        { id: 'p2-1', title: 'RAG-Powered Document Q&A System', description: 'Upload PDFs → extract → embed → store in pgvector → query with LLM. FastAPI backend + simple UI.', techStack: ['LangChain', 'pgvector', 'FastAPI', 'Hugging Face', 'Docker'], proofOfSkill: 'Live demo on Hugging Face Spaces or video walkthrough with GitHub repo' },
      ],
      certifications: ['DeepLearning.AI LangChain short course'],
    },
    {
      phase: 90,
      label: 'MLOps & Interview Mastery',
      goal: 'Production-grade MLOps skills and interview readiness',
      tasks: [
        { id: 't3-1', title: 'Build a complete MLOps pipeline', description: 'Automate model retraining with Airflow (your existing skill). Add data drift detection (Evidently AI). Push to model registry.', type: 'build', estimatedHours: 20, completed: false },
        { id: 't3-2', title: 'Learn model monitoring and drift detection', description: 'Implement data drift and concept drift monitoring using Evidently AI on a streaming dataset.', type: 'learn', estimatedHours: 8, completed: false, resources: ['Evidently AI docs', 'ML Observability course on Arize Phoenix'] },
        { id: 't3-3', title: 'Deploy to AWS SageMaker', description: 'Package your model, deploy to a SageMaker endpoint. Set up auto-scaling. Compare cost to self-hosted.', type: 'build', estimatedHours: 12, completed: false },
        { id: 't3-4', title: 'Practice ML system design questions', description: 'Cover: recommendation systems, fraud detection, search ranking, real-time inference. Use ML system design primer.', type: 'practice', estimatedHours: 10, completed: false },
        { id: 't3-5', title: 'Mock ML interviews x3', description: 'Use Trajectory AI. Focus on: evaluation metrics, system design, LLM topics, and behavioral answers about transition.', type: 'practice', estimatedHours: 4, completed: false },
      ],
      tools: ['Airflow', 'Evidently AI', 'AWS SageMaker', 'BentoML or Triton', 'MLflow Model Registry'],
      projects: [
        { id: 'p3-1', title: 'End-to-End MLOps Platform', description: 'Training → experiment tracking → model registry → deployment → monitoring. Includes CI/CD for model retraining triggers.', techStack: ['Airflow', 'MLflow', 'AWS SageMaker', 'Evidently AI', 'FastAPI', 'Docker'], proofOfSkill: 'Architecture diagram + GitHub repo + live model endpoint' },
      ],
      certifications: ['AWS Certified ML Specialty (study for this role)', 'Hugging Face certification (free)'],
    },
  ],
}

export const backendToAimlQuestions: InterviewQuestion[] = [
  {
    id: 'q-ba-01',
    question: 'Explain the bias-variance trade-off. Give a concrete example of a model that suffers from each extreme.',
    topic: 'ML Fundamentals',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
    hints: ['High bias = underfitting, High variance = overfitting', 'Think about model complexity'],
  },
  {
    id: 'q-ba-02',
    question: 'Your classification model has 95% accuracy but terrible performance in production. What could explain this and how do you diagnose it?',
    topic: 'Model Evaluation',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
  },
  {
    id: 'q-ba-03',
    question: 'Design an ML system for real-time fraud detection at 10,000 transactions per second. What are the architectural components and key decisions?',
    topic: 'ML System Design',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
  },
  {
    id: 'q-ba-04',
    question: 'When would you fine-tune an LLM versus use prompt engineering versus train a custom model from scratch? Walk through the decision framework.',
    topic: 'LLMs',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
  },
  {
    id: 'q-ba-05',
    question: 'Your model performs well on the test set but degrades after 3 weeks in production. What is happening and how do you address it?',
    topic: 'MLOps / Model Monitoring',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
  },
  {
    id: 'q-ba-06',
    question: 'Explain what a vector database is and how it differs from a traditional SQL database. When would you use one?',
    topic: 'Vector Databases',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'roadmap',
  },
  {
    id: 'q-ba-07',
    question: 'How does your backend engineering experience make you a stronger ML engineer candidate?',
    topic: 'Career Transition',
    difficulty: 'beginner',
    mode: 'behavioral',
    roleContext: 'AI/ML Engineer',
    source: 'resume',
  },
  {
    id: 'q-ba-08',
    question: 'What is gradient descent and why do we use mini-batch instead of full-batch in practice?',
    topic: 'Deep Learning Fundamentals',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'AI/ML Engineer',
    source: 'target-role',
  },
]

export const backendToAimlStrategy: TransitionStrategy = {
  profileId: 'backend-aiml-001',
  summary: 'You have the engineering foundation most ML engineers lack — strong Python, production systems, and data pipelines. The gap is the ML-specific layer. The strategy is to stack ML on top of your existing backend skills rather than starting over.',
  transferableStrengths: [
    'Python mastery — no learning curve for PyTorch, HuggingFace, or any ML library',
    'Production system design — ML models need the same patterns: APIs, queues, monitoring',
    'Airflow experience — your pipelines background maps directly to ML training pipelines',
    'API development — model serving is just another API; you are ahead of researchers on this',
    'AWS + Docker — model deployment and infrastructure knowledge is day-one useful',
  ],
  criticalGaps: [
    { area: 'ML Theory (fundamentals)', action: 'Complete fast.ai + StatQuest — do not skip this even though it is boring', urgency: 'immediate' },
    { area: 'PyTorch', action: 'Build 3 models from scratch before using any HuggingFace magic', urgency: 'immediate' },
    { area: 'Experiment Tracking (MLflow)', action: 'Track every experiment you run from day 1 — build the habit', urgency: 'immediate' },
    { area: 'LLM Engineering', action: 'Build a RAG system — the most in-demand ML engineering skill right now', urgency: 'short-term' },
    { area: 'Model Monitoring', action: 'Add Evidently AI to at least one project before interviewing', urgency: 'short-term' },
  ],
  strategy: [
    { step: 1, title: 'Build ML on Top of Backend Skills', description: 'Your FastAPI + Docker skills mean you can deploy models immediately. Start by deploying a simple model. That impresses ML interviewers who only know Jupyter.', duration: 'Week 1' },
    { step: 2, title: 'Prioritize LLM Projects', description: 'Build a RAG system. This is the single most in-demand ML engineering project in 2024–2025. It uses your backend skills (APIs, databases) + ML.', duration: 'Month 2' },
    { step: 3, title: 'Target "ML Engineer" not "Data Scientist"', description: 'You are an engineer who does ML, not a researcher. Target companies that need production ML systems, not pure research roles.', duration: 'Ongoing' },
    { step: 4, title: 'Publish on HuggingFace Hub', description: 'Push your fine-tuned models to HF Hub. Public models are a resume signal that is unique to this field.', duration: 'Month 2–3' },
    { step: 5, title: 'Target MLOps / AI Platform roles as a bridge', description: 'If initial ML engineering roles are hard to get, MLOps Engineer is a natural first step using your DevOps/backend knowledge.', duration: 'Month 3–4' },
  ],
  timeline: [
    { week: 2, milestone: 'First model trained and tracked', deliverable: 'MLflow experiment UI with training runs' },
    { week: 4, milestone: 'Model deployed as FastAPI service', deliverable: 'Docker image on GHCR with /predict endpoint' },
    { week: 8, milestone: 'RAG system built', deliverable: 'Live demo on HF Spaces or Render free tier' },
    { week: 12, milestone: 'Fine-tuned model on HF Hub', deliverable: 'Public model card with evaluation results' },
    { week: 16, milestone: 'MLOps pipeline complete', deliverable: 'Airflow DAG for retraining + drift monitoring' },
    { week: 20, milestone: 'First ML engineer interviews', deliverable: 'Portfolio: 3 projects, HF model, 20+ practice interviews' },
  ],
  portfolioPlan: [
    { project: 'Deployed ML Model API', purpose: 'Shows backend→ML bridge — something most researchers cannot do', techStack: ['PyTorch', 'FastAPI', 'Docker', 'MLflow'] },
    { project: 'RAG Document Q&A System', purpose: 'Most in-demand ML project type; uses your API and DB skills', techStack: ['LangChain', 'pgvector', 'FastAPI', 'HuggingFace'] },
    { project: 'Fine-tuned HF Model', purpose: 'Public HF Hub presence is a unique ML engineer signal', techStack: ['HuggingFace Transformers', 'PyTorch', 'Datasets'] },
  ],
  interviewFocus: [
    'Bias-variance trade-off and regularization',
    'Evaluation metrics beyond accuracy (F1, AUC-ROC, NDCG)',
    'ML system design for production-scale use cases',
    'LLM fine-tuning vs RAG decision framework',
    'Model monitoring and drift detection',
    'Why backend engineer → ML engineer is additive, not a restart (behavioral)',
  ],
}

export const backendToAimlFlow = {
  id: 'backend-aiml',
  profile: backendToAimlProfile,
  analysis: backendToAimlAnalysis,
  roadmap: backendToAimlRoadmap,
  interviewQuestions: backendToAimlQuestions,
  strategy: backendToAimlStrategy,
  evaluationSeeds: {} as Record<string, {
    strengths: string[]
    weaknesses: string[]
    missedPoints: string[]
    betterAnswer: string
    followUpQuestions: string[]
    recommendation: string
  }>,
}
