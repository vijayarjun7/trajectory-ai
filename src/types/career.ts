export type TrackType = 'engineering' | 'career-path'

export interface CareerProfile {
  id: string
  currentRole: string
  targetRole: string
  yearsExperience: number
  availableHoursPerWeek?: number
  targetTimelineMonths?: number
  goal: string
  resumeSummary?: string
  currentSkills: string[]
  track: TrackType
}

export interface GapItem {
  skill: string
  severity: 'critical' | 'moderate' | 'minor'
  reason: string
}

export interface TopicRecommendation {
  topic: string
  priority: 'high' | 'medium' | 'low'
  resources: string[]
}

export interface CareerAnalysis {
  profileId: string
  strengths: string[]
  gaps: GapItem[]
  transferableSkills: string[]
  readinessScore: number
  estimatedTimeline: string
  transitionDifficulty: 'easy' | 'moderate' | 'challenging' | 'very-challenging'
  recommendedTopics: TopicRecommendation[]
  recommendedInterviewTopics: string[]
  generatedAt: string
}
