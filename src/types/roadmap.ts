export interface RoadmapTask {
  id: string
  title: string
  description: string
  type: 'learn' | 'build' | 'practice' | 'network'
  estimatedHours: number
  completed: boolean
  resources?: string[]
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  techStack: string[]
  proofOfSkill: string
}

export interface RoadmapPhase {
  phase: 30 | 60 | 90
  label: string
  goal: string
  tasks: RoadmapTask[]
  tools: string[]
  projects: PortfolioProject[]
  certifications: string[]
}

export interface Roadmap {
  id: string
  profileId: string
  targetRole: string
  phases: [RoadmapPhase, RoadmapPhase, RoadmapPhase]
  createdAt: string
}
