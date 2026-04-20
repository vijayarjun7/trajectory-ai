export interface CriticalGap {
  area: string
  action: string
  urgency: 'immediate' | 'short-term' | 'long-term'
}

export interface StrategyStep {
  step: number
  title: string
  description: string
  duration: string
}

export interface StrategyMilestone {
  week: number
  milestone: string
  deliverable: string
}

export interface PortfolioItem {
  project: string
  purpose: string
  techStack: string[]
}

export interface TransitionStrategy {
  profileId: string
  summary: string
  transferableStrengths: string[]
  criticalGaps: CriticalGap[]
  strategy: StrategyStep[]
  timeline: StrategyMilestone[]
  portfolioPlan: PortfolioItem[]
  interviewFocus: string[]
}
