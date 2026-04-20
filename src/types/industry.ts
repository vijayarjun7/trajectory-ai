export interface TrendItem {
  skill: string
  trajectory: 'declining' | 'rising'
  reason: string
  urgency: 'now' | 'watch' | 'archive'
}

export interface RoleImpact {
  role: string
  automationRisk: 'low' | 'medium' | 'high'
  summary: string
  affectedAreas: string[]
  emergingOpportunities: string[]
}

export interface PrioritizedSkill {
  skill: string
  demand: 'critical' | 'high' | 'moderate'
  category: string
  whyItMatters: string
}

export interface AdaptationAdvice {
  advice: string
  timeframe: string
  action: string
  impact: 'high' | 'medium' | 'low'
}

export interface IndustryShift {
  id: string
  targetRole: string
  declining: TrendItem[]
  rising: TrendItem[]
  aiImpact: RoleImpact
  skillsNow: PrioritizedSkill[]
  adaptation: AdaptationAdvice[]
  updatedAt: string
}
