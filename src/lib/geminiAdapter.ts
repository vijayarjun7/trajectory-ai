import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIAdapter } from './aiAdapter'
import type {
  CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion,
  InterviewEvaluation, TransitionStrategy, IndustryShift, SessionConfig,
} from '@/types'
import { MockEngine } from './mockEngine'

const MODEL = 'gemini-1.5-flash-latest'

function buildAnalysisPrompt(profile: CareerProfile): string {
  return `You are a senior career coach. Analyze this career transition and return ONLY valid JSON matching the schema exactly.

Profile:
- Current Role: ${profile.currentRole}
- Target Role: ${profile.targetRole}
- Years of Experience: ${profile.yearsExperience}
- Current Skills: ${profile.currentSkills.join(', ')}
- Goal: ${profile.goal}
${profile.resumeSummary ? `- Resume Summary: ${profile.resumeSummary}` : ''}

Return JSON with this exact structure:
{
  "profileId": "${profile.id}",
  "strengths": ["string"],
  "gaps": [{"skill": "string", "severity": "critical|moderate|minor", "reason": "string"}],
  "transferableSkills": ["string"],
  "readinessScore": number_0_to_100,
  "estimatedTimeline": "string like '4-6 months'",
  "transitionDifficulty": "easy|moderate|challenging|very-challenging",
  "recommendedTopics": [{"topic": "string", "priority": "high|medium|low", "resources": ["string"]}],
  "recommendedInterviewTopics": ["string"],
  "generatedAt": "${new Date().toISOString()}"
}

Be direct, realistic, and specific. Identify real gaps, not generic ones.`
}

function buildEvaluationPrompt(question: InterviewQuestion, answer: string): string {
  return `You are a strict technical interviewer evaluating a candidate's answer. Return ONLY valid JSON.

Question: ${question.question}
Topic: ${question.topic}
Role Context: ${question.roleContext}
Difficulty: ${question.difficulty}

Candidate's Answer: "${answer}"

Score each dimension 0-10. Be strict — a mediocre answer scores 5-6, good is 7-8, excellent is 9-10.

Return JSON:
{
  "questionId": "${question.id}",
  "clarityScore": number,
  "technicalDepth": number,
  "relevance": number,
  "completeness": number,
  "confidence": number,
  "overallScore": number,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missedPoints": ["string"],
  "betterAnswer": "string - a strong version of the answer they should have given",
  "followUpQuestions": ["string"],
  "recommendation": "string - direct actionable feedback",
  "answeredAt": "${new Date().toISOString()}"
}

Do not be gentle. Real interviewers are not.`
}

export class GeminiAdapter implements AIAdapter {
  private genAI: GoogleGenerativeAI
  private fallback: MockEngine

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.fallback = new MockEngine()
  }

  private async generateJSON<T>(prompt: string): Promise<T> {
    const model = this.genAI.getGenerativeModel({ model: MODEL })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('No JSON in Gemini response')
    return JSON.parse(jsonMatch[0]) as T
  }

  async analyzeCareerGap(profile: CareerProfile): Promise<CareerAnalysis> {
    try {
      return await this.generateJSON<CareerAnalysis>(buildAnalysisPrompt(profile))
    } catch (e) {
      console.error('[GeminiAdapter] analyzeCareerGap failed:', e)
      return this.fallback.analyzeCareerGap(profile)
    }
  }

  async generateRoadmap(profile: CareerProfile, analysis: CareerAnalysis): Promise<Roadmap> {
    try {
      const prompt = `Generate a 30/60/90 day roadmap for transitioning from ${profile.currentRole} to ${profile.targetRole}.
Gaps to address: ${analysis.gaps.map(g => g.skill).join(', ')}
Return JSON matching Roadmap type with phases array of 3 items (phase: 30, 60, 90).
Each phase has: label, goal, tasks[], tools[], projects[], certifications[].
Each task has: id, title, description, type (learn|build|practice|network), estimatedHours, completed: false.
Be specific and practical. No filler content.`
      return await this.generateJSON<Roadmap>(prompt)
    } catch {
      return this.fallback.generateRoadmap(profile, analysis)
    }
  }

  async generateInterviewQuestions(config: SessionConfig): Promise<InterviewQuestion[]> {
    try {
      const prompt = `Generate ${config.questionCount} realistic interview questions for a ${config.targetRole} candidate.
Topic focus: ${config.topic}
Difficulty: ${config.difficulty}
Question mode: ${config.questionMode}
Return JSON array of InterviewQuestion objects with fields: id, question, topic, difficulty, mode, roleContext, source, hints[].
Questions must be specific, realistic, and avoid generic patterns.`
      return await this.generateJSON<InterviewQuestion[]>(prompt)
    } catch {
      return this.fallback.generateInterviewQuestions(config)
    }
  }

  async evaluateAnswer(question: InterviewQuestion, answer: string): Promise<InterviewEvaluation> {
    try {
      return await this.generateJSON<InterviewEvaluation>(buildEvaluationPrompt(question, answer))
    } catch {
      return this.fallback.evaluateAnswer(question, answer)
    }
  }

  async generateTransitionStrategy(profile: CareerProfile, analysis: CareerAnalysis): Promise<TransitionStrategy> {
    try {
      const prompt = `Create a career transition strategy from ${profile.currentRole} to ${profile.targetRole}.
Gaps: ${analysis.gaps.map(g => g.skill).join(', ')}
Return JSON TransitionStrategy with: profileId, summary, transferableStrengths[], criticalGaps[], strategy[], timeline[], portfolioPlan[], interviewFocus[].`
      return await this.generateJSON<TransitionStrategy>(prompt)
    } catch {
      return this.fallback.generateTransitionStrategy(profile, analysis)
    }
  }

  async generateIndustryShift(targetRole: string): Promise<IndustryShift> {
    try {
      const prompt = `Analyze industry trends for the ${targetRole} role in 2025.
Return JSON IndustryShift with: id, targetRole, declining[], rising[], aiImpact{role,automationRisk,summary,affectedAreas[],emergingOpportunities[]}, skillsNow[], adaptation[].
Be specific about actual trends. No hype.`
      return await this.generateJSON<IndustryShift>(prompt)
    } catch {
      return this.fallback.generateIndustryShift(targetRole)
    }
  }
}
