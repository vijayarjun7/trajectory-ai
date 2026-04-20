import type {
  CareerProfile,
  CareerAnalysis,
  Roadmap,
  InterviewQuestion,
  InterviewEvaluation,
  TransitionStrategy,
  IndustryShift,
  SessionConfig,
} from '@/types'

export interface AIAdapter {
  analyzeCareerGap(profile: CareerProfile): Promise<CareerAnalysis>
  generateRoadmap(profile: CareerProfile, analysis: CareerAnalysis): Promise<Roadmap>
  generateInterviewQuestions(config: SessionConfig): Promise<InterviewQuestion[]>
  evaluateAnswer(question: InterviewQuestion, answer: string): Promise<InterviewEvaluation>
  generateTransitionStrategy(profile: CareerProfile, analysis: CareerAnalysis): Promise<TransitionStrategy>
  generateIndustryShift(targetRole: string): Promise<IndustryShift>
}
