export type ModuleName = 'analysis' | 'roadmap' | 'interview' | 'transition' | 'industry'

export interface ModuleStatus {
  module: ModuleName
  label: string
  completed: boolean
  percentComplete: number
  lastVisited?: string
}

export interface AchievedMilestone {
  id: string
  label: string
  achievedAt: string
  icon: string
}

export interface ProgressTracker {
  profileId: string
  overallReadiness: number
  moduleStatuses: ModuleStatus[]
  completedTaskIds: string[]
  completedQuestionIds: string[]
  milestones: AchievedMilestone[]
}
