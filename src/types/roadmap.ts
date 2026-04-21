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
  phase: number
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
  totalMonths?: number
  phases: [RoadmapPhase, RoadmapPhase, RoadmapPhase]
  createdAt: string
}
