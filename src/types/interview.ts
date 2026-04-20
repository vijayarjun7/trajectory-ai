export type InterviewMode = 'text' | 'voice'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type QuestionMode = 'technical' | 'behavioral' | 'mixed' | 'leadership'
export type QuestionSource = 'resume' | 'roadmap' | 'target-role' | 'custom'
export type VoiceState = 'idle' | 'speaking' | 'recording' | 'processing'

export interface InterviewQuestion {
  id: string
  question: string
  topic: string
  difficulty: Difficulty
  mode: QuestionMode
  roleContext: string
  source: QuestionSource
  hints?: string[]
}

export interface InterviewEvaluation {
  questionId: string
  clarityScore: number
  technicalDepth: number
  relevance: number
  completeness: number
  confidence: number
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  missedPoints: string[]
  betterAnswer: string
  followUpQuestions: string[]
  recommendation: string
  answeredAt: string
}

export interface SessionConfig {
  profileId: string
  targetRole: string
  topic: string
  source: QuestionSource
  difficulty: Difficulty
  questionMode: QuestionMode
  interviewMode: InterviewMode
  questionCount: number
}

export interface InterviewSession {
  id: string
  config: SessionConfig
  questions: InterviewQuestion[]
  evaluations: Record<string, InterviewEvaluation>
  currentIndex: number
  startedAt: string
  completedAt?: string
  averageScore?: number
}
