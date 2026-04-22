import type { AIAdapter } from './aiAdapter'
import type {
  CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion,
  InterviewEvaluation, TransitionStrategy, IndustryShift, SessionConfig,
  GapItem, TopicRecommendation, RoadmapPhase,
} from '@/types'
import { qeToDevopsFlow } from '@/data/flows/qe-to-devops'
import { backendToAimlFlow } from '@/data/flows/backend-to-aiml'
import { promptEngineerFlow } from '@/data/flows/prompt-engineer'
import { industryShiftData } from '@/data/industryShiftData'

const FLOWS: Record<string, typeof qeToDevopsFlow> = {
  'QE/SDET:DevOps Engineer': qeToDevopsFlow,
  'Backend Engineer:AI/ML Engineer': backendToAimlFlow as typeof qeToDevopsFlow,
  'Content Writer:Prompt Engineer': promptEngineerFlow as typeof qeToDevopsFlow,
}

// Role-specific skill gaps used when no pre-built flow exists
const ROLE_GAP_DATA: Record<string, { gaps: GapItem[]; topics: TopicRecommendation[]; interviewTopics: string[]; tools: string[] }> = {
  'Frontend Engineer': {
    gaps: [
      { skill: 'React / Component Architecture', severity: 'critical', reason: 'Core framework for modern frontend development' },
      { skill: 'TypeScript', severity: 'critical', reason: 'Industry standard for type-safe frontend code' },
      { skill: 'CSS / Tailwind / Styling Systems', severity: 'moderate', reason: 'Essential for building polished, responsive UIs' },
      { skill: 'State Management (Redux/Zustand)', severity: 'moderate', reason: 'Required for complex application state' },
      { skill: 'Web Performance Optimization', severity: 'moderate', reason: 'Critical for production-grade applications' },
      { skill: 'Accessibility (a11y)', severity: 'minor', reason: 'Increasingly required in enterprise environments' },
    ],
    topics: [
      { topic: 'React Fundamentals & Hooks', priority: 'high', resources: ['React Official Docs', 'Frontend Masters', 'Scrimba React Course'] },
      { topic: 'TypeScript for React', priority: 'high', resources: ['TypeScript Handbook', 'Matt Pocock TS tutorials'] },
      { topic: 'CSS & Tailwind', priority: 'high', resources: ['Tailwind CSS Docs', 'CSS Tricks', 'Kevin Powell YouTube'] },
      { topic: 'State Management', priority: 'medium', resources: ['Redux Toolkit Docs', 'Zustand GitHub'] },
      { topic: 'Web Performance', priority: 'medium', resources: ['web.dev', 'Lighthouse Docs', 'Chrome DevTools guide'] },
    ],
    interviewTopics: ['React lifecycle and hooks', 'Virtual DOM and reconciliation', 'CSS specificity and layout', 'Accessibility best practices', 'Performance profiling'],
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Storybook', 'Vitest'],
  },
  'Full Stack Engineer': {
    gaps: [
      { skill: 'Node.js / Express', severity: 'critical', reason: 'Core backend runtime for full-stack JavaScript development' },
      { skill: 'React', severity: 'critical', reason: 'Dominant frontend library for full-stack roles' },
      { skill: 'TypeScript', severity: 'critical', reason: 'Required for type-safe full-stack applications' },
      { skill: 'Database Design (SQL + NoSQL)', severity: 'moderate', reason: 'Full-stack engineers own the data layer' },
      { skill: 'REST / GraphQL APIs', severity: 'moderate', reason: 'API design is core to full-stack ownership' },
      { skill: 'Docker & Deployment', severity: 'minor', reason: 'Needed for shipping and running full-stack apps' },
    ],
    topics: [
      { topic: 'Node.js & Express', priority: 'high', resources: ['Node.js Docs', 'The Odin Project', 'Full Stack Open'] },
      { topic: 'React & TypeScript', priority: 'high', resources: ['React Docs', 'TypeScript Handbook', 'Frontend Masters'] },
      { topic: 'Database Fundamentals', priority: 'high', resources: ['PostgreSQL Tutorial', 'MongoDB University', 'Prisma Docs'] },
      { topic: 'API Design', priority: 'medium', resources: ['REST API Design Guide', 'GraphQL.org', 'Postman Learning'] },
      { topic: 'Docker Basics', priority: 'medium', resources: ['Docker Official Docs', 'Play with Docker'] },
    ],
    interviewTopics: ['Node.js event loop', 'REST vs GraphQL trade-offs', 'Database indexing', 'Authentication & JWT', 'Deployment and CI/CD basics'],
    tools: ['Node.js', 'React', 'PostgreSQL', 'Prisma', 'Docker', 'GitHub Actions'],
  },
  'AI/ML Engineer': {
    gaps: [
      { skill: 'Python for ML', severity: 'critical', reason: 'Primary language for the entire ML ecosystem' },
      { skill: 'PyTorch / TensorFlow', severity: 'critical', reason: 'Core deep learning frameworks used in production' },
      { skill: 'Machine Learning Fundamentals', severity: 'critical', reason: 'Theory underpins all applied ML work' },
      { skill: 'MLOps & Model Deployment', severity: 'moderate', reason: 'Critical for shipping models to production' },
      { skill: 'Data Processing (Pandas/NumPy)', severity: 'moderate', reason: 'Essential for data pipeline work' },
      { skill: 'Statistics & Probability', severity: 'minor', reason: 'Needed to reason about model performance' },
    ],
    topics: [
      { topic: 'Python for Data Science', priority: 'high', resources: ['Kaggle Python Course', 'Real Python', 'fast.ai'] },
      { topic: 'Machine Learning Theory', priority: 'high', resources: ['Coursera ML Specialization', 'fast.ai', 'Hands-On ML (book)'] },
      { topic: 'PyTorch Deep Learning', priority: 'high', resources: ['PyTorch Tutorials', 'fast.ai Part 2', 'Papers With Code'] },
      { topic: 'MLOps & Deployment', priority: 'medium', resources: ['MLflow Docs', 'Hugging Face Docs', 'Weights & Biases'] },
      { topic: 'Statistics for ML', priority: 'medium', resources: ['StatQuest YouTube', 'Think Stats (book)'] },
    ],
    interviewTopics: ['Bias-variance tradeoff', 'Overfitting and regularization', 'Model evaluation metrics', 'Transformer architecture', 'MLOps pipeline design'],
    tools: ['Python', 'PyTorch', 'Hugging Face', 'Pandas', 'MLflow', 'Jupyter'],
  },
  'Data Scientist': {
    gaps: [
      { skill: 'Python & Pandas', severity: 'critical', reason: 'Core tooling for data manipulation and analysis' },
      { skill: 'Statistics & Probability', severity: 'critical', reason: 'Foundation of all data science work' },
      { skill: 'Machine Learning', severity: 'critical', reason: 'Required to build predictive models' },
      { skill: 'Data Visualization', severity: 'moderate', reason: 'Communicating insights to stakeholders' },
      { skill: 'SQL for Analytics', severity: 'moderate', reason: 'Data scientists query databases daily' },
      { skill: 'Experiment Design (A/B Testing)', severity: 'minor', reason: 'Critical in product-focused data science roles' },
    ],
    topics: [
      { topic: 'Python for Data Analysis', priority: 'high', resources: ['Kaggle Python Course', 'DataCamp', 'Pandas Docs'] },
      { topic: 'Statistics Fundamentals', priority: 'high', resources: ['StatQuest YouTube', 'Khan Academy Statistics', 'Think Stats'] },
      { topic: 'Machine Learning with Scikit-Learn', priority: 'high', resources: ['Scikit-Learn Docs', 'Kaggle ML Course', 'Hands-On ML'] },
      { topic: 'Data Visualization', priority: 'medium', resources: ['Matplotlib Docs', 'Seaborn Tutorial', 'Plotly Docs'] },
      { topic: 'SQL for Analytics', priority: 'medium', resources: ['Mode SQL Tutorial', 'LeetCode SQL', 'Metabase Learning'] },
    ],
    interviewTopics: ['Hypothesis testing', 'Feature engineering', 'Model selection and cross-validation', 'A/B test design', 'Communicating results to non-technical stakeholders'],
    tools: ['Python', 'Pandas', 'Scikit-Learn', 'Jupyter', 'SQL', 'Tableau/Power BI'],
  },
  'DevOps Engineer': {
    gaps: [
      { skill: 'Kubernetes', severity: 'critical', reason: 'Required for container orchestration in most DevOps roles' },
      { skill: 'Terraform / IaC', severity: 'critical', reason: 'Infrastructure-as-code is a core DevOps skill' },
      { skill: 'Cloud Platforms (AWS/GCP/Azure)', severity: 'critical', reason: 'Cloud fundamentals required for most roles' },
      { skill: 'Prometheus + Grafana', severity: 'moderate', reason: 'Monitoring and observability stack' },
      { skill: 'CI/CD Pipelines', severity: 'moderate', reason: 'Owning the build and deploy pipeline' },
      { skill: 'GitOps (ArgoCD/Flux)', severity: 'minor', reason: 'Declarative deployment increasingly expected' },
    ],
    topics: [
      { topic: 'Kubernetes Fundamentals', priority: 'high', resources: ['Kubernetes.io', 'KodeKloud CKA', 'killer.sh'] },
      { topic: 'Terraform IaC', priority: 'high', resources: ['HashiCorp Learn', 'Terraform: Up & Running'] },
      { topic: 'AWS Core Services', priority: 'high', resources: ['AWS Cloud Practitioner', 'Adrian Cantrill course'] },
      { topic: 'Prometheus + Grafana', priority: 'medium', resources: ['Prometheus Docs', 'Grafana Labs Tutorials'] },
      { topic: 'CI/CD with GitHub Actions', priority: 'medium', resources: ['GitHub Actions Docs', 'Hands-on CI/CD'] },
    ],
    interviewTopics: ['Kubernetes pod lifecycle', 'CI/CD pipeline design', 'Infrastructure-as-code', 'Monitoring & SLOs', 'Incident response'],
    tools: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus', 'GitHub Actions', 'Docker'],
  },
  'SRE': {
    gaps: [
      { skill: 'SLOs / SLIs / Error Budgets', severity: 'critical', reason: 'Core SRE discipline for reliability engineering' },
      { skill: 'Observability (Prometheus/Grafana/Jaeger)', severity: 'critical', reason: 'Essential for diagnosing production issues' },
      { skill: 'Incident Management & Post-Mortems', severity: 'critical', reason: 'Structured incident response is the SRE core loop' },
      { skill: 'Kubernetes & Container Orchestration', severity: 'moderate', reason: 'Most SRE teams operate on Kubernetes infrastructure' },
      { skill: 'Chaos Engineering', severity: 'moderate', reason: 'Proactively testing system resilience' },
      { skill: 'On-Call Practice & Runbooks', severity: 'minor', reason: 'Operational readiness is expected from day one' },
    ],
    topics: [
      { topic: 'SRE Principles & SLOs', priority: 'high', resources: ['Google SRE Book', 'SRE Weekly', 'Implementing SLOs (book)'] },
      { topic: 'Observability Stack', priority: 'high', resources: ['Prometheus Docs', 'Grafana Labs', 'OpenTelemetry Docs'] },
      { topic: 'Incident Management', priority: 'high', resources: ['PagerDuty Incident Response Guide', 'Atlassian Incident Management'] },
      { topic: 'Kubernetes for SRE', priority: 'medium', resources: ['Kubernetes.io', 'Production Kubernetes (book)'] },
      { topic: 'Chaos Engineering', priority: 'medium', resources: ['Chaos Monkey', 'Principls of Chaos Engineering'] },
    ],
    interviewTopics: ['Defining and measuring SLOs', 'Root cause analysis', 'Postmortem culture', 'Capacity planning', 'Kubernetes reliability patterns'],
    tools: ['Prometheus', 'Grafana', 'PagerDuty', 'Kubernetes', 'Terraform', 'OpenTelemetry'],
  },
  'Cloud Engineer': {
    gaps: [
      { skill: 'AWS / GCP / Azure Core Services', severity: 'critical', reason: 'Deep cloud platform expertise is the primary requirement' },
      { skill: 'Terraform / CloudFormation', severity: 'critical', reason: 'IaC is fundamental to cloud engineering' },
      { skill: 'Cloud Networking (VPC, VPN, CDN)', severity: 'critical', reason: 'Network architecture is core cloud engineer scope' },
      { skill: 'Cloud Security & IAM', severity: 'moderate', reason: 'Security posture and access control are daily concerns' },
      { skill: 'Serverless (Lambda/Cloud Functions)', severity: 'moderate', reason: 'Serverless patterns are widely used in cloud architectures' },
      { skill: 'Cost Optimization', severity: 'minor', reason: 'Cloud cost management is a key business expectation' },
    ],
    topics: [
      { topic: 'AWS Solutions Architect', priority: 'high', resources: ['AWS Docs', 'Adrian Cantrill course', 'ACG AWS labs'] },
      { topic: 'Terraform IaC', priority: 'high', resources: ['HashiCorp Learn', 'Terraform Associate cert'] },
      { topic: 'Cloud Networking', priority: 'high', resources: ['AWS VPC Docs', 'Google Cloud Networking', 'Azure Networking'] },
      { topic: 'Cloud Security', priority: 'medium', resources: ['AWS Security Specialty', 'Cloud Security Alliance'] },
      { topic: 'Serverless Architecture', priority: 'medium', resources: ['AWS Lambda Docs', 'Serverless Framework', 'serverless.com'] },
    ],
    interviewTopics: ['VPC design and subnetting', 'IAM policies and roles', 'Multi-region architecture', 'Cost optimization strategies', 'Disaster recovery patterns'],
    tools: ['AWS / GCP / Azure', 'Terraform', 'CloudFormation', 'Lambda', 'Route 53', 'CloudWatch'],
  },
  'Platform Engineer': {
    gaps: [
      { skill: 'Internal Developer Platform Design', severity: 'critical', reason: 'Core of platform engineering — building tools for developers' },
      { skill: 'Kubernetes & Helm', severity: 'critical', reason: 'Most platforms are built on top of Kubernetes' },
      { skill: 'Developer Experience (DX)', severity: 'critical', reason: 'Platform engineers serve internal devs as their customers' },
      { skill: 'Service Mesh (Istio/Linkerd)', severity: 'moderate', reason: 'Traffic management between microservices on the platform' },
      { skill: 'GitOps (ArgoCD/Flux)', severity: 'moderate', reason: 'Declarative platform state management' },
      { skill: 'Observability Tooling', severity: 'minor', reason: 'Platform teams own the observability stack' },
    ],
    topics: [
      { topic: 'Platform Engineering Fundamentals', priority: 'high', resources: ['platformengineering.org', 'Team Topologies (book)', 'Humanitec Docs'] },
      { topic: 'Kubernetes Advanced', priority: 'high', resources: ['Kubernetes.io', 'CKA certification', 'Production Kubernetes (book)'] },
      { topic: 'Internal Developer Portals', priority: 'high', resources: ['Backstage.io', 'Port Docs', 'platformengineering.org'] },
      { topic: 'GitOps with ArgoCD', priority: 'medium', resources: ['ArgoCD Docs', 'GitOps Cookbook'] },
      { topic: 'Service Mesh', priority: 'medium', resources: ['Istio Docs', 'Linkerd Docs'] },
    ],
    interviewTopics: ['Platform vs. infrastructure engineering', 'Kubernetes operators and CRDs', 'Developer experience metrics', 'Service mesh trade-offs', 'Golden paths and paved roads'],
    tools: ['Kubernetes', 'ArgoCD', 'Backstage', 'Helm', 'Istio', 'Terraform'],
  },
  'Engineering Manager': {
    gaps: [
      { skill: 'People Management & 1:1s', severity: 'critical', reason: 'EM role is fundamentally about developing people' },
      { skill: 'Technical Roadmap Planning', severity: 'critical', reason: 'EMs own the engineering side of product planning' },
      { skill: 'Hiring & Interview Design', severity: 'critical', reason: 'Building and scaling teams is a core EM responsibility' },
      { skill: 'Cross-functional Collaboration', severity: 'moderate', reason: 'EMs partner with Product, Design, and Leadership daily' },
      { skill: 'Engineering Metrics & OKRs', severity: 'moderate', reason: 'EMs are accountable for team delivery metrics' },
      { skill: 'Conflict Resolution', severity: 'minor', reason: 'Managing team dynamics and interpersonal issues' },
    ],
    topics: [
      { topic: 'Engineering Management Fundamentals', priority: 'high', resources: ['The Manager\'s Path (book)', 'Lara Hogan blog', 'LeadDev'] },
      { topic: 'Effective 1:1s & Feedback', priority: 'high', resources: ['High Output Management', 'Radical Candor (book)'] },
      { topic: 'Technical Planning & Roadmaps', priority: 'high', resources: ['Shape Up (Basecamp)', 'Intercom Product Blog'] },
      { topic: 'Hiring & Leveling', priority: 'medium', resources: ['Hiring Engineers (blog)', 'Holloway Guide to Raising VC'] },
      { topic: 'Engineering Metrics', priority: 'medium', resources: ['DORA Metrics', 'Accelerate (book)', 'LinearB'] },
    ],
    interviewTopics: ['Managing performance and underperformers', 'Technical debt prioritization', 'Hiring bar and interview design', 'Cross-team collaboration', 'Delivering difficult feedback'],
    tools: ['JIRA / Linear', 'OKR frameworks', 'Lattice / 15Five', 'Notion', 'Loom'],
  },
  'Prompt Engineer': {
    gaps: [
      { skill: 'Prompt Design & Optimization', severity: 'critical', reason: 'Core craft of prompt engineering' },
      { skill: 'LLM Fundamentals', severity: 'critical', reason: 'Understanding model behavior is essential to effective prompting' },
      { skill: 'RAG (Retrieval-Augmented Generation)', severity: 'critical', reason: 'Production prompt systems almost always include retrieval' },
      { skill: 'Evaluation & Testing Prompts', severity: 'moderate', reason: 'Systematic evaluation is how you improve prompts reliably' },
      { skill: 'API Integration (OpenAI/Anthropic)', severity: 'moderate', reason: 'Prompt engineers ship via API in production' },
      { skill: 'Fine-tuning Basics', severity: 'minor', reason: 'Understanding when prompting falls short of fine-tuning' },
    ],
    topics: [
      { topic: 'Prompt Engineering Techniques', priority: 'high', resources: ['Anthropic Prompt Library', 'OpenAI Cookbook', 'Brex Prompt Engineering Guide'] },
      { topic: 'LLM Fundamentals', priority: 'high', resources: ['fast.ai Practical Deep Learning', 'Andrej Karpathy YouTube', '3Blue1Brown neural networks'] },
      { topic: 'RAG Systems', priority: 'high', resources: ['LangChain Docs', 'LlamaIndex Docs', 'Pinecone Learn'] },
      { topic: 'Prompt Evaluation', priority: 'medium', resources: ['HELM Benchmark', 'PromptFoo Docs', 'Anthropic Evals Guide'] },
      { topic: 'LLM APIs in Production', priority: 'medium', resources: ['Anthropic API Docs', 'OpenAI API Docs', 'Vercel AI SDK'] },
    ],
    interviewTopics: ['Chain-of-thought prompting', 'Hallucination mitigation', 'RAG architecture', 'Prompt injection and safety', 'Evaluating LLM outputs at scale'],
    tools: ['Anthropic Claude', 'OpenAI GPT-4', 'LangChain', 'LlamaIndex', 'PromptFoo', 'Pinecone'],
  },
  'Solopreneur': {
    gaps: [
      { skill: 'Audience Building & Marketing', severity: 'critical', reason: 'Solopreneurs live or die by their distribution' },
      { skill: 'Product/Service Design', severity: 'critical', reason: 'Creating something people want to pay for' },
      { skill: 'Revenue Model Design', severity: 'critical', reason: 'Understanding how to monetize skills and audience' },
      { skill: 'No-code / Low-code Tools', severity: 'moderate', reason: 'Speed of execution matters when you work alone' },
      { skill: 'Content Creation & SEO', severity: 'moderate', reason: 'Organic content is the most scalable solo marketing channel' },
      { skill: 'Email Marketing', severity: 'minor', reason: 'Email list is the most reliable owned distribution channel' },
    ],
    topics: [
      { topic: 'Audience Building', priority: 'high', resources: ['Creator Science (newsletter)', 'Ship 30 for 30', 'Gumroad University'] },
      { topic: 'Product Design for Solopreneurs', priority: 'high', resources: ['The Mom Test (book)', 'Just Fucking Ship', 'Pieter Levels blog'] },
      { topic: 'Revenue Models', priority: 'high', resources: ['Make (book by Pieter Levels)', 'Zero to Sold (book)', 'Indie Hackers'] },
      { topic: 'Content & SEO', priority: 'medium', resources: ['Ahrefs Blog', 'Backlinko', 'Nick Milo Notion'] },
      { topic: 'Email Marketing', priority: 'medium', resources: ['ConvertKit Blog', 'Beehiiv Academy', 'Email Mastery'] },
    ],
    interviewTopics: ['Niche selection', 'Validating ideas without building', 'Pricing strategies', 'Growing an email list', 'Managing client relationships solo'],
    tools: ['Substack / Beehiiv', 'Gumroad / Lemon Squeezy', 'Notion', 'Webflow', 'ConvertKit', 'Figma'],
  },
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(): Promise<void> {
  return delay(600 + Math.random() * 600)
}

function getFlow(currentRole: string, targetRole: string) {
  const key = `${currentRole}:${targetRole}`
  return FLOWS[key] ?? null
}

function buildDynamicAnalysis(profile: CareerProfile): CareerAnalysis {
  const roleData = ROLE_GAP_DATA[profile.targetRole]

  if (!roleData) {
    // Truly unknown role — generate generic role-named gaps
    return {
      profileId: profile.id,
      strengths: [
        `${profile.yearsExperience} years of professional experience provides a strong foundation`,
        'Existing technical skills are transferable across many domains',
        'Demonstrated ability to learn and adapt in your current role',
      ],
      gaps: [
        { skill: `Core ${profile.targetRole} Fundamentals`, severity: 'critical', reason: `Deep knowledge of ${profile.targetRole} domain-specific practices is required` },
        { skill: `${profile.targetRole} Tooling & Ecosystem`, severity: 'critical', reason: `Familiarity with the standard tools used by ${profile.targetRole} professionals` },
        { skill: 'Domain-Specific Communication', severity: 'moderate', reason: `Ability to collaborate effectively within a ${profile.targetRole} context` },
        { skill: 'Portfolio / Proof of Work', severity: 'moderate', reason: 'Demonstrable output is expected when switching roles' },
      ],
      transferableSkills: profile.currentSkills.slice(0, 4),
      readinessScore: 35,
      estimatedTimeline: `${profile.targetTimelineMonths ?? 6} months`,
      transitionDifficulty: 'moderate',
      recommendedTopics: [
        { topic: `${profile.targetRole} Fundamentals`, priority: 'high', resources: ['Official documentation', 'YouTube tutorials', 'Online courses'] },
        { topic: 'Portfolio Projects', priority: 'high', resources: ['GitHub', 'Personal blog', 'Open source contributions'] },
      ],
      recommendedInterviewTopics: [`${profile.targetRole} core concepts`, 'Problem solving', 'Communication and collaboration'],
      generatedAt: new Date().toISOString(),
    }
  }

  const readinessScore = 40 + Math.min(profile.yearsExperience * 3, 25)
  const transitionDifficulty: CareerAnalysis['transitionDifficulty'] =
    readinessScore >= 58 ? 'moderate' : readinessScore >= 46 ? 'challenging' : 'very-challenging'

  const timeline = profile.targetTimelineMonths
    ? `${profile.targetTimelineMonths} months`
    : '4–6 months'

  return {
    profileId: profile.id,
    strengths: [
      `${profile.yearsExperience} years in ${profile.currentRole} provides strong fundamentals to build on`,
      'Problem-solving mindset transfers well across technical roles',
      profile.currentSkills.length > 0
        ? `Existing skills (${profile.currentSkills.slice(0, 3).join(', ')}) accelerate onboarding`
        : 'Cross-functional experience is valued in any engineering role',
      'Motivation for career change is a strong predictor of successful transitions',
    ],
    gaps: roleData.gaps,
    transferableSkills: [
      `${profile.currentRole} domain experience informs better ${profile.targetRole} decisions`,
      'Communication and cross-team collaboration',
      ...profile.currentSkills.slice(0, 2),
    ],
    readinessScore,
    estimatedTimeline: timeline,
    transitionDifficulty,
    recommendedTopics: roleData.topics,
    recommendedInterviewTopics: roleData.interviewTopics,
    generatedAt: new Date().toISOString(),
  }
}

function buildDynamicRoadmap(profile: CareerProfile): Roadmap {
  const roleData = ROLE_GAP_DATA[profile.targetRole]
  const months = profile.targetTimelineMonths ?? 6
  const tools = roleData?.tools ?? [`${profile.targetRole} tooling`, 'GitHub', 'Documentation sites']

  const phase1: RoadmapPhase = {
    phase: Math.round((months / 3) * 30),
    label: `Foundation (Month 1${Math.round(months / 3) > 1 ? `–${Math.round(months / 3)}` : ''})`,
    goal: `Build core ${profile.targetRole} fundamentals and set up your learning environment`,
    tasks: [
      { id: 't1-1', title: `${profile.targetRole} Fundamentals`, description: 'Complete a structured course covering core concepts', type: 'learn', estimatedHours: 20, completed: false },
      { id: 't1-2', title: 'Environment Setup', description: 'Set up development environment and tooling', type: 'learn', estimatedHours: 4, completed: false },
      { id: 't1-3', title: 'First Hands-On Project', description: `Build a beginner project demonstrating ${profile.targetRole} skills`, type: 'build', estimatedHours: 15, completed: false },
      { id: 't1-4', title: 'Community & Networking', description: `Join ${profile.targetRole} communities on LinkedIn, Discord, and Reddit`, type: 'network', estimatedHours: 2, completed: false },
    ],
    tools: tools.slice(0, 3),
    projects: [
      { id: 'p1-1', title: `${profile.targetRole} Starter Project`, description: 'A foundational project demonstrating core skills', techStack: tools.slice(0, 2), proofOfSkill: 'Published to GitHub with a clear README' },
    ],
    certifications: roleData?.topics[0] ? [`${roleData.topics[0].topic} (beginner certification if available)`] : [],
  }

  const phase2: RoadmapPhase = {
    phase: Math.round((months * 2 / 3) * 30),
    label: `Core Skills (Month ${Math.round(months / 3) + 1}–${Math.round(months * 2 / 3)})`,
    goal: `Develop production-level ${profile.targetRole} skills and build portfolio projects`,
    tasks: [
      { id: 't2-1', title: 'Advanced Concepts', description: `Deep dive into intermediate ${profile.targetRole} patterns and best practices`, type: 'learn', estimatedHours: 25, completed: false },
      { id: 't2-2', title: 'Portfolio Project #1', description: 'Build a substantial project to demonstrate readiness', type: 'build', estimatedHours: 30, completed: false },
      { id: 't2-3', title: 'Code Reviews & Feedback', description: 'Share work in communities and get feedback from practitioners', type: 'practice', estimatedHours: 8, completed: false },
      { id: 't2-4', title: 'Mock Interviews', description: `Practice answering ${profile.targetRole} interview questions`, type: 'practice', estimatedHours: 6, completed: false },
    ],
    tools: tools.slice(0, Math.min(tools.length, 5)),
    projects: [
      { id: 'p2-1', title: `${profile.targetRole} Portfolio Project`, description: 'A complete, deployable project showcasing key skills', techStack: tools.slice(0, 3), proofOfSkill: 'Live demo URL and documented GitHub repo' },
    ],
    certifications: roleData?.topics[1] ? [`${roleData.topics[1].topic} certification`] : [],
  }

  const phase3: RoadmapPhase = {
    phase: months * 30,
    label: `Job Ready (Month ${Math.round(months * 2 / 3) + 1}–${months})`,
    goal: `Polish portfolio, apply actively, and land your first ${profile.targetRole} role`,
    tasks: [
      { id: 't3-1', title: 'Portfolio Polish', description: 'Clean up all projects, write strong READMEs, and deploy live demos', type: 'build', estimatedHours: 10, completed: false },
      { id: 't3-2', title: 'Resume & LinkedIn Update', description: `Reframe experience for a ${profile.targetRole} audience`, type: 'practice', estimatedHours: 5, completed: false },
      { id: 't3-3', title: 'Active Job Applications', description: 'Apply to 3–5 roles per week with tailored cover letters', type: 'network', estimatedHours: 8, completed: false },
      { id: 't3-4', title: 'Interview Preparation', description: 'Focused prep on the top interview topics for your target role', type: 'practice', estimatedHours: 20, completed: false },
    ],
    tools,
    projects: [
      { id: 'p3-1', title: 'Capstone Project', description: `A production-quality project that demonstrates full ${profile.targetRole} competency`, techStack: tools, proofOfSkill: 'Case study blog post + live deployment' },
    ],
    certifications: roleData?.topics.filter((_, i) => i >= 2).map(t => `${t.topic} certification`) ?? [],
  }

  return {
    id: `roadmap-${profile.id}`,
    profileId: profile.id,
    targetRole: profile.targetRole,
    totalMonths: months,
    phases: [phase1, phase2, phase3],
    createdAt: new Date().toISOString(),
  }
}

function buildDynamicStrategy(profile: CareerProfile, analysis: CareerAnalysis): TransitionStrategy {
  const criticalGaps = analysis.gaps.filter(g => g.severity === 'critical').slice(0, 3)
  const months = profile.targetTimelineMonths ?? 6

  return {
    profileId: profile.id,
    summary: `Transition from ${profile.currentRole} to ${profile.targetRole} by systematically closing skill gaps while building a portfolio of real projects. Your ${profile.yearsExperience} years of experience provides credibility — focus on demonstrating hands-on ${profile.targetRole} capability.`,
    transferableStrengths: analysis.transferableSkills,
    criticalGaps: criticalGaps.map((g, i) => ({
      area: g.skill,
      action: `Dedicate structured weekly time to ${g.skill} — start with the core course, then build a project`,
      urgency: i === 0 ? 'immediate' : i === 1 ? 'short-term' : 'long-term',
    })),
    strategy: [
      { step: 1, title: 'Assess & Plan', description: `Audit your current skills against the ${profile.targetRole} job descriptions you want to apply for`, duration: 'Week 1' },
      { step: 2, title: 'Foundation Learning', description: `Complete structured learning for the most critical ${profile.targetRole} skills`, duration: `Month 1–${Math.round(months / 3)}` },
      { step: 3, title: 'Build Portfolio', description: 'Create 2–3 projects that directly demonstrate the target role\'s required skills', duration: `Month ${Math.round(months / 3) + 1}–${Math.round(months * 2 / 3)}` },
      { step: 4, title: 'Apply & Interview', description: 'Begin active applications while continuing to learn; treat rejections as feedback', duration: `Month ${Math.round(months * 2 / 3) + 1}–${months}` },
    ],
    timeline: [
      { week: 2, milestone: 'Learning plan finalized', deliverable: 'Weekly schedule with specific courses and time blocks' },
      { week: Math.round(months * 4 / 3), milestone: 'First project shipped', deliverable: 'GitHub repo with live demo and strong README' },
      { week: Math.round(months * 8 / 3), milestone: 'Portfolio complete', deliverable: '2–3 projects with case studies' },
      { week: months * 4, milestone: 'Active in job market', deliverable: '10+ applications sent, interviews scheduled' },
    ],
    portfolioPlan: [
      { project: `${profile.targetRole} Foundations Project`, purpose: 'Proves you can do the core job', techStack: ROLE_GAP_DATA[profile.targetRole]?.tools.slice(0, 3) ?? [profile.targetRole, 'GitHub'] },
      { project: 'Real-World Problem Solver', purpose: 'Shows initiative and domain depth beyond tutorials', techStack: ROLE_GAP_DATA[profile.targetRole]?.tools ?? [profile.targetRole] },
    ],
    interviewFocus: ROLE_GAP_DATA[profile.targetRole]?.interviewTopics ?? [`${profile.targetRole} fundamentals`, 'Problem solving', 'System design basics'],
  }
}

export class MockEngine implements AIAdapter {
  async analyzeCareerGap(profile: CareerProfile): Promise<CareerAnalysis> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    if (flow) return { ...flow.analysis, profileId: profile.id }
    return buildDynamicAnalysis(profile)
  }

  async generateRoadmap(profile: CareerProfile, _analysis?: CareerAnalysis): Promise<Roadmap> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    if (flow) return { ...flow.roadmap, profileId: profile.id }
    return buildDynamicRoadmap(profile)
  }

  async generateInterviewQuestions(config: SessionConfig): Promise<InterviewQuestion[]> {
    await randomDelay()
    const allFlows = Object.values(FLOWS)
    const matchingFlow = allFlows.find(f => f.profile.targetRole === config.targetRole) ?? qeToDevopsFlow
    const all = matchingFlow.interviewQuestions
    return all.slice(0, config.questionCount)
  }

  async evaluateAnswer(question: InterviewQuestion, answer: string): Promise<InterviewEvaluation> {
    await delay(800 + Math.random() * 400)
    const wordCount = answer.trim().split(/\s+/).length
    const lengthScore = Math.min(10, Math.max(3, Math.round(wordCount / 15)))
    const baseScore = 5 + Math.floor(Math.random() * 3)
    const clarity = Math.min(10, baseScore + (wordCount > 50 ? 1 : 0))
    const depth = Math.min(10, lengthScore + Math.floor(Math.random() * 2))
    const relevance = Math.min(10, baseScore + (answer.toLowerCase().includes(question.topic.toLowerCase()) ? 2 : 0))
    const completeness = Math.min(10, Math.max(4, Math.round((clarity + depth) / 2)))
    const confidence = Math.min(10, baseScore)
    const overall = Math.round((clarity + depth + relevance + completeness + confidence) / 5 * 10) / 10

    const seed = qeToDevopsFlow.evaluationSeeds[question.id] ?? qeToDevopsFlow.evaluationSeeds['default']

    return {
      questionId: question.id,
      clarityScore: clarity,
      technicalDepth: depth,
      relevance,
      completeness,
      confidence,
      overallScore: overall,
      strengths: seed.strengths,
      weaknesses: seed.weaknesses,
      missedPoints: seed.missedPoints,
      betterAnswer: seed.betterAnswer,
      followUpQuestions: seed.followUpQuestions,
      recommendation: seed.recommendation,
      answeredAt: new Date().toISOString(),
    }
  }

  async generateTransitionStrategy(profile: CareerProfile, analysis?: CareerAnalysis): Promise<TransitionStrategy> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    if (flow) return { ...flow.strategy, profileId: profile.id }
    const resolvedAnalysis = analysis ?? buildDynamicAnalysis(profile)
    return buildDynamicStrategy(profile, resolvedAnalysis)
  }

  async generateIndustryShift(targetRole: string): Promise<IndustryShift> {
    await randomDelay()
    const shift = industryShiftData[targetRole] ?? industryShiftData['DevOps Engineer']
    return shift
  }
}
