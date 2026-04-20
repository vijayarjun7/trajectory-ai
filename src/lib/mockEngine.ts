import type { AIAdapter } from './aiAdapter'
import type {
  CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion,
  InterviewEvaluation, TransitionStrategy, IndustryShift, SessionConfig,
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(): Promise<void> {
  return delay(600 + Math.random() * 600)
}

function getFlow(currentRole: string, targetRole: string) {
  const key = `${currentRole}:${targetRole}`
  return FLOWS[key] ?? qeToDevopsFlow
}

export class MockEngine implements AIAdapter {
  async analyzeCareerGap(profile: CareerProfile): Promise<CareerAnalysis> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    return { ...flow.analysis, profileId: profile.id }
  }

  async generateRoadmap(profile: CareerProfile, _analysis?: CareerAnalysis): Promise<Roadmap> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    return { ...flow.roadmap, profileId: profile.id }
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

  async generateTransitionStrategy(profile: CareerProfile, _analysis?: CareerAnalysis): Promise<TransitionStrategy> {
    await randomDelay()
    const flow = getFlow(profile.currentRole, profile.targetRole)
    return { ...flow.strategy, profileId: profile.id }
  }

  async generateIndustryShift(targetRole: string): Promise<IndustryShift> {
    await randomDelay()
    const shift = industryShiftData[targetRole] ?? industryShiftData['DevOps Engineer']
    return shift
  }
}
