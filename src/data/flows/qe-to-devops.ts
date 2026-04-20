import type { CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion, TransitionStrategy } from '@/types'

export const qeToDevopsProfile: CareerProfile = {
  id: 'qe-devops-001',
  currentRole: 'QE/SDET',
  targetRole: 'DevOps Engineer',
  yearsExperience: 4,
  goal: 'Transition from manual/automation QA into a DevOps role focused on CI/CD and infrastructure',
  resumeSummary: '4 years in QE/SDET with experience in Selenium, Pytest, Jenkins CI pipelines, and basic Docker usage.',
  currentSkills: ['Selenium', 'Pytest', 'Jenkins', 'Docker (basic)', 'Git', 'Bash scripting', 'SQL', 'REST API testing'],
  track: 'engineering',
}

export const qeToDevopsAnalysis: CareerAnalysis = {
  profileId: 'qe-devops-001',
  strengths: [
    'Strong understanding of CI/CD pipelines from a QE perspective — can translate this to ownership',
    'Scripting skills (Bash, Python) are directly transferable to infrastructure automation',
    'Existing Docker knowledge gives a real head start in container-based deployments',
    'Experience with Jenkins puts you closer to pipeline ownership than most candidates',
    'API testing background maps naturally to endpoint monitoring and health checks',
  ],
  gaps: [
    { skill: 'Kubernetes', severity: 'critical', reason: 'Required for container orchestration in most DevOps roles; currently no hands-on experience' },
    { skill: 'Terraform / IaC', severity: 'critical', reason: 'Infrastructure-as-code is a core DevOps skill; not part of typical QE scope' },
    { skill: 'Cloud Platforms (AWS/GCP/Azure)', severity: 'critical', reason: 'Cloud fundamentals required; QE exposure is usually limited to test environments' },
    { skill: 'Prometheus + Grafana', severity: 'moderate', reason: 'Monitoring and observability stack widely expected in DevOps roles' },
    { skill: 'Helm Charts', severity: 'moderate', reason: 'Kubernetes package management; prerequisite for most production K8s deployments' },
    { skill: 'GitOps (ArgoCD/Flux)', severity: 'moderate', reason: 'Increasingly expected; bridges the gap from CI/CD to declarative deployment' },
    { skill: 'Ansible', severity: 'minor', reason: 'Configuration management; useful for server provisioning workflows' },
  ],
  transferableSkills: [
    'CI/CD pipeline design and troubleshooting (Jenkins → GitHub Actions, GitLab CI)',
    'Scripting and automation mindset',
    'Docker containerization basics',
    'Test environment setup and configuration management',
    'Cross-functional collaboration with Dev and Ops teams',
  ],
  readinessScore: 38,
  estimatedTimeline: '4–6 months',
  transitionDifficulty: 'moderate',
  recommendedTopics: [
    { topic: 'Docker Deep Dive', priority: 'high', resources: ['Docker Official Docs', 'Play with Docker', 'KodeKloud Docker course'] },
    { topic: 'Kubernetes Fundamentals', priority: 'high', resources: ['Kubernetes.io tutorials', 'KodeKloud CKA course', 'killer.sh practice'] },
    { topic: 'Terraform IaC', priority: 'high', resources: ['HashiCorp Learn', 'Terraform: Up & Running (book)', 'AWS Free Tier'] },
    { topic: 'AWS Core Services', priority: 'high', resources: ['AWS Cloud Practitioner', 'Adrian Cantrill AWS course', 'ACG AWS labs'] },
    { topic: 'GitHub Actions', priority: 'medium', resources: ['GitHub Actions docs', 'Hands-on GitHub Actions projects'] },
    { topic: 'Prometheus + Grafana', priority: 'medium', resources: ['Prometheus official docs', 'Grafana Labs tutorials'] },
    { topic: 'ArgoCD / GitOps', priority: 'medium', resources: ['ArgoCD getting started', 'GitOps with ArgoCD (free course)'] },
  ],
  recommendedInterviewTopics: [
    'Docker networking and volumes',
    'Kubernetes pod lifecycle and scheduling',
    'CI/CD pipeline design patterns',
    'Infrastructure-as-code with Terraform',
    'Incident response and on-call practices',
    'Monitoring, alerting, and SLO definition',
  ],
  generatedAt: '2025-01-15T10:00:00Z',
}

export const qeToDevopsRoadmap: Roadmap = {
  id: 'roadmap-qe-devops-001',
  profileId: 'qe-devops-001',
  targetRole: 'DevOps Engineer',
  createdAt: '2025-01-15T10:00:00Z',
  phases: [
    {
      phase: 30,
      label: 'Foundation',
      goal: 'Master Docker deeply and build foundational CI/CD pipeline ownership',
      tasks: [
        { id: 't1-1', title: 'Complete Docker Deep Dive course', description: 'Go beyond basic usage — learn networking, volumes, multi-stage builds, and Docker Compose', type: 'learn', estimatedHours: 12, completed: false, resources: ['KodeKloud Docker', 'Play with Docker'] },
        { id: 't1-2', title: 'Migrate a Jenkins pipeline to GitHub Actions', description: 'Take an existing CI pipeline and recreate it in GitHub Actions. Add lint, test, and build stages.', type: 'build', estimatedHours: 8, completed: false },
        { id: 't1-3', title: 'Complete AWS Cloud Practitioner (CCP)', description: 'Get foundational cloud certification. Covers EC2, S3, IAM, VPC basics.', type: 'learn', estimatedHours: 20, completed: false, resources: ['Adrian Cantrill CCP', 'AWS Free Tier labs'] },
        { id: 't1-4', title: 'Build a Dockerized multi-service app', description: 'Create a simple app (frontend + backend + DB) using Docker Compose. Document the setup.', type: 'build', estimatedHours: 10, completed: false },
        { id: 't1-5', title: 'Set up local Kubernetes cluster with minikube', description: 'Install minikube, deploy a sample app, expose it via service, inspect pods and logs.', type: 'practice', estimatedHours: 6, completed: false },
      ],
      tools: ['Docker', 'Docker Compose', 'GitHub Actions', 'minikube', 'AWS CLI'],
      projects: [
        { id: 'p1-1', title: 'CI/CD Pipeline for a Python Service', description: 'Build a full pipeline from commit to Docker image push with GitHub Actions. Includes linting, testing, and GHCR image push.', techStack: ['GitHub Actions', 'Docker', 'Python', 'GHCR'], proofOfSkill: 'Working pipeline with green badges in GitHub repo' },
      ],
      certifications: ['AWS Certified Cloud Practitioner'],
    },
    {
      phase: 60,
      label: 'Application',
      goal: 'Achieve hands-on Kubernetes and Terraform proficiency with deployable projects',
      tasks: [
        { id: 't2-1', title: 'Complete Kubernetes for Beginners (KodeKloud CKA prep)', description: 'Cover deployments, services, ingress, configmaps, secrets, namespaces, RBAC basics', type: 'learn', estimatedHours: 25, completed: false, resources: ['KodeKloud CKA', 'killer.sh'] },
        { id: 't2-2', title: 'Deploy a multi-tier app to Kubernetes', description: 'Deploy the Dockerized app from Phase 1 to a local K8s cluster with proper services, ingress, and resource limits', type: 'build', estimatedHours: 15, completed: false },
        { id: 't2-3', title: 'Learn Terraform fundamentals', description: 'Study HCL syntax, providers, state management, modules, and remote backends. Complete HashiCorp Learn track.', type: 'learn', estimatedHours: 16, completed: false, resources: ['HashiCorp Learn', 'Terraform: Up & Running'] },
        { id: 't2-4', title: 'Provision AWS infrastructure with Terraform', description: 'Spin up a VPC, EC2 instance, S3 bucket, and IAM role using Terraform. Store state in S3 backend.', type: 'build', estimatedHours: 12, completed: false },
        { id: 't2-5', title: 'Set up Prometheus + Grafana monitoring stack', description: 'Deploy Prometheus and Grafana via Docker Compose, configure scrape targets, build a dashboard', type: 'practice', estimatedHours: 8, completed: false },
        { id: 't2-6', title: 'Practice 30 Kubernetes CKAD-style exercises', description: 'Use killer.sh or Kubernetes exercises repo to solve real CLI tasks under time pressure', type: 'practice', estimatedHours: 10, completed: false },
      ],
      tools: ['Kubernetes', 'kubectl', 'Helm', 'Terraform', 'AWS EC2/VPC/S3', 'Prometheus', 'Grafana'],
      projects: [
        { id: 'p2-1', title: 'Terraform + K8s Infrastructure on AWS', description: 'Provision an EKS cluster using Terraform. Deploy a containerized app to it. Add monitoring with Prometheus/Grafana.', techStack: ['Terraform', 'AWS EKS', 'Kubernetes', 'Prometheus', 'Grafana'], proofOfSkill: 'GitHub repo with Terraform code, architecture diagram, and live deployment screenshots' },
      ],
      certifications: ['Terraform Associate (optional)', 'CKA study progress'],
    },
    {
      phase: 90,
      label: 'Mastery',
      goal: 'Build production-grade skills: GitOps, SRE practices, and interview readiness',
      tasks: [
        { id: 't3-1', title: 'Implement GitOps with ArgoCD', description: 'Set up ArgoCD on a K8s cluster. Configure declarative app deployment from a Git repo. Practice sync and rollback.', type: 'learn', estimatedHours: 10, completed: false },
        { id: 't3-2', title: 'Learn SRE fundamentals (SLOs, error budgets, on-call)', description: 'Read Google SRE book chapters on SLIs/SLOs. Design SLOs for your demo app. Create runbooks.', type: 'learn', estimatedHours: 8, completed: false, resources: ["Google SRE Book (free online)"] },
        { id: 't3-3', title: 'Simulate incident response scenarios', description: 'Use tools like chaos-monkey or deliberately break your K8s cluster. Practice identifying and resolving issues.', type: 'practice', estimatedHours: 8, completed: false },
        { id: 't3-4', title: 'Complete 20 mock DevOps interview questions', description: 'Practice scenario-based questions on Kubernetes, Terraform, CI/CD design, and incident response', type: 'practice', estimatedHours: 6, completed: false },
        { id: 't3-5', title: 'Contribute to an open source DevOps tool or write a blog post', description: 'Document your QE→DevOps journey or contribute to a Helm chart / Terraform module on GitHub', type: 'network', estimatedHours: 5, completed: false },
        { id: 't3-6', title: 'Mock interviews x3 with feedback', description: 'Use Trajectory AI interview coach. Focus on Docker/K8s deep dives and system design scenarios.', type: 'practice', estimatedHours: 4, completed: false },
      ],
      tools: ['ArgoCD', 'Flux (optional)', 'Helm', 'chaos-monkey', 'Datadog (trial)', 'PagerDuty concepts'],
      projects: [
        { id: 'p3-1', title: 'Full GitOps Production-Sim Stack', description: 'End-to-end: GitHub Actions builds image → ArgoCD deploys to K8s → Prometheus monitors → Grafana dashboards → Runbook for incident response', techStack: ['GitHub Actions', 'ArgoCD', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana'], proofOfSkill: 'Live demo URL + GitHub repo with README, architecture diagram, and CI/CD badge' },
      ],
      certifications: ['CKA (Certified Kubernetes Administrator)', 'AWS Solutions Architect Associate'],
    },
  ],
}

export const qeToDevopsQuestions: InterviewQuestion[] = [
  {
    id: 'q-qd-01',
    question: 'Explain the difference between a Docker bridge network and a host network. When would you use each?',
    topic: 'Docker Networking',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
    hints: ['Think about isolation vs performance', 'Consider container-to-container communication'],
  },
  {
    id: 'q-qd-02',
    question: 'You have a Kubernetes pod that keeps crashing with OOMKilled. Walk me through your diagnosis and resolution steps.',
    topic: 'Kubernetes Troubleshooting',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
    hints: ['kubectl describe pod', 'resource limits and requests', 'application memory profiling'],
  },
  {
    id: 'q-qd-03',
    question: 'Design a CI/CD pipeline for a microservice that has unit tests, integration tests, Docker build, and deploys to a staging Kubernetes cluster. What stages would you include and why?',
    topic: 'CI/CD Pipeline Design',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
  },
  {
    id: 'q-qd-04',
    question: "What is Terraform state, and why is managing it properly critical? What problems can arise from state drift?",
    topic: 'Terraform IaC',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
  },
  {
    id: 'q-qd-05',
    question: 'Your application SLO is 99.9% uptime. An incident has consumed 80% of your monthly error budget in one day. What do you do?',
    topic: 'SRE / Incident Response',
    difficulty: 'advanced',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
  },
  {
    id: 'q-qd-06',
    question: 'As someone coming from QE, how would your testing background make you a better DevOps engineer than someone who came directly from a developer background?',
    topic: 'Career Transition',
    difficulty: 'beginner',
    mode: 'behavioral',
    roleContext: 'DevOps Engineer',
    source: 'resume',
  },
  {
    id: 'q-qd-07',
    question: 'Explain how Kubernetes rolling updates work. How do you prevent downtime during a bad deployment?',
    topic: 'Kubernetes Deployments',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
  },
  {
    id: 'q-qd-08',
    question: 'What is a Kubernetes Ingress controller and how does it differ from a LoadBalancer service?',
    topic: 'Kubernetes Networking',
    difficulty: 'intermediate',
    mode: 'technical',
    roleContext: 'DevOps Engineer',
    source: 'target-role',
  },
]

export const qeToDevopsStrategy: TransitionStrategy = {
  profileId: 'qe-devops-001',
  summary: 'Your QE background is a genuine asset for DevOps — you already understand pipelines, scripting, and the importance of reliability. The gap is infrastructure ownership. The strategy is to build that ownership through hands-on projects, not just courses.',
  transferableStrengths: [
    'CI/CD pipeline knowledge (Jenkins, GitHub Actions) — you understand the mechanics, just need ownership',
    'Scripting and automation mindset — Bash and Python skills transfer directly to IaC and tooling',
    'Cross-team communication — DevOps requires heavy collaboration with Dev and Product teams',
    'Testing culture — DevOps benefits enormously from people who think about failure modes',
    'Docker experience — already past the containerization learning curve',
  ],
  criticalGaps: [
    { area: 'Cloud Infrastructure (AWS/GCP/Azure)', action: 'Start with AWS CCP, then build real infra using free tier', urgency: 'immediate' },
    { area: 'Kubernetes', action: 'Complete KodeKloud CKA prep + deploy real apps to local cluster', urgency: 'immediate' },
    { area: 'Terraform / IaC', action: 'Complete HashiCorp Learn + provision real AWS resources', urgency: 'immediate' },
    { area: 'Monitoring & Observability', action: 'Set up Prometheus + Grafana for your project apps', urgency: 'short-term' },
    { area: 'GitOps workflows', action: 'Learn ArgoCD and implement on a personal project', urgency: 'short-term' },
  ],
  strategy: [
    { step: 1, title: 'Leverage CI/CD Edge', description: 'Start job applications at companies using Jenkins — you have a real advantage there. Get your first DevOps role, then grow.', duration: 'Ongoing' },
    { step: 2, title: 'Build Before Applying', description: 'Have 2 portfolio projects live on GitHub before applying: a Dockerized CI/CD pipeline and a Terraform+K8s infra demo.', duration: 'Month 1–2' },
    { step: 3, title: 'Target QE-Adjacent DevOps Roles', description: 'Look for "DevOps Engineer" or "Platform Engineer" at companies with QA teams. Your QE context is a differentiator.', duration: 'Month 2–4' },
    { step: 4, title: 'Get CKA Certified', description: 'CKA certification is a strong signal. Schedule the exam for month 3–4 after completing killer.sh practice.', duration: 'Month 3–4' },
    { step: 5, title: 'Network via DevOps Slack/Discord communities', description: 'Join DevOps communities (CNCF Slack, DevOps Discord). Share your QE→DevOps journey — it is unique and memorable.', duration: 'Month 2 onwards' },
  ],
  timeline: [
    { week: 2, milestone: 'Docker mastery complete', deliverable: 'CI/CD pipeline project pushed to GitHub' },
    { week: 4, milestone: 'AWS CCP certification', deliverable: 'AWS account with hands-on labs documented' },
    { week: 8, milestone: 'K8s + Terraform projects complete', deliverable: 'EKS cluster provisioned via Terraform on GitHub' },
    { week: 12, milestone: 'CKA exam scheduled', deliverable: 'GitOps stack live + interview prep started' },
    { week: 16, milestone: 'First DevOps interviews', deliverable: '5+ applications sent, mock interview scores above 7.5' },
    { week: 20, milestone: 'Offer stage', deliverable: 'CKA certified + 2 portfolio projects + 20+ interviews practiced' },
  ],
  portfolioPlan: [
    { project: 'CI/CD Pipeline with GitHub Actions + Docker', purpose: 'Demonstrates pipeline ownership, not just usage', techStack: ['GitHub Actions', 'Docker', 'GHCR', 'Python'] },
    { project: 'AWS EKS via Terraform + Monitoring Stack', purpose: 'Shows IaC + K8s + observability in one project', techStack: ['Terraform', 'AWS EKS', 'Kubernetes', 'Prometheus', 'Grafana'] },
    { project: 'GitOps Demo with ArgoCD', purpose: 'Proves awareness of modern deployment practices', techStack: ['ArgoCD', 'Kubernetes', 'Helm', 'GitHub'] },
  ],
  interviewFocus: [
    'Docker networking and multi-container setups',
    'Kubernetes pod troubleshooting scenarios',
    'CI/CD pipeline design questions',
    'Terraform state management and module design',
    'SRE concepts: SLOs, error budgets, incident response',
    'Why QE → DevOps is a strength, not a gap (behavioral)',
  ],
}

export const qeToDevopsEvaluationSeeds: Record<string, {
  strengths: string[]
  weaknesses: string[]
  missedPoints: string[]
  betterAnswer: string
  followUpQuestions: string[]
  recommendation: string
}> = {
  'default': {
    strengths: ['Showed some familiarity with the concept', 'Structured the answer reasonably'],
    weaknesses: ['Lacked specific technical details', 'Did not mention failure scenarios or edge cases'],
    missedPoints: ['Production implications', 'Specific command examples', 'Trade-offs between approaches'],
    betterAnswer: 'A strong answer would start with the definition, provide a concrete example, explain the trade-offs, and mention how this applies in production environments.',
    followUpQuestions: ['Can you give a specific example from your experience?', 'What would you do differently in a high-traffic scenario?'],
    recommendation: 'Study the topic more deeply with hands-on labs. The concept knowledge is there but the depth expected in a DevOps interview is higher.',
  },
  'q-qd-01': {
    strengths: ['Understood the basic distinction between bridge and host networks'],
    weaknesses: ['Did not explain the performance implications of host network mode', 'Missing mention of overlay networks for multi-host setups'],
    missedPoints: ['Host network removes network namespace isolation — security implication', 'Bridge networks require explicit port mapping', 'macvlan as an alternative for direct network access'],
    betterAnswer: 'Bridge network creates an isolated virtual network — containers communicate via IP, and you expose ports with -p. Use it for most app deployments where isolation matters. Host network makes the container share the host\'s network stack directly — no port mapping needed, better performance, but no isolation. Use it for network-intensive services like monitoring agents or when you need direct access to host interfaces. In production, bridge is the default; host mode is reserved for specific infrastructure tools.',
    followUpQuestions: ['What happens when two containers on the same bridge try to reach each other vs containers on different bridges?', 'How do you handle inter-service discovery in Docker Compose?'],
    recommendation: 'Practice docker network inspect and trace actual packet flows. The question is testing whether you understand isolation vs. performance trade-offs, not just names.',
  },
  'q-qd-02': {
    strengths: ['Knew to use kubectl describe and check logs'],
    weaknesses: ['Did not mention setting resource requests vs limits distinction', 'Skipped application-level profiling as a diagnostic step'],
    missedPoints: ['OOMKilled means the container exceeded its memory limit — not the node', 'memory requests affect scheduling; limits affect runtime behavior', 'tools: kubectl top pod, metrics-server', 'application-level: heap dumps, memory profiling for JVM apps'],
    betterAnswer: 'First: kubectl describe pod <name> to confirm OOMKilled and see the last restart reason. Then kubectl logs --previous to catch any last-gasp output. Check the resource limits with kubectl get pod -o yaml — if limits are too low for legitimate usage, increase them. But also check if the app itself has a memory leak: for JVM apps, look at heap settings; for Node.js, check for unclosed connections. Set requests and limits properly — requests affect scheduling, limits affect when the OOM killer fires. Add memory metrics to your Grafana dashboard so you can see the trend before the next crash.',
    followUpQuestions: ['What is the difference between Burstable and Guaranteed QoS classes in Kubernetes?', 'How would you prevent this from happening without increasing the memory limit?'],
    recommendation: 'Strong on diagnosis, weak on prevention. Practice setting resource requests/limits in real Kubernetes manifests and understand the QoS tiers.',
  },
}

export const qeToDevopsFlow = {
  id: 'qe-devops',
  profile: qeToDevopsProfile,
  analysis: qeToDevopsAnalysis,
  roadmap: qeToDevopsRoadmap,
  interviewQuestions: qeToDevopsQuestions,
  strategy: qeToDevopsStrategy,
  evaluationSeeds: qeToDevopsEvaluationSeeds,
}
