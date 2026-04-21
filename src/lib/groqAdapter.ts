import Groq from 'groq-sdk'
import type { AIAdapter } from './aiAdapter'
import type {
  CareerProfile, CareerAnalysis, Roadmap, InterviewQuestion,
  InterviewEvaluation, TransitionStrategy, IndustryShift, SessionConfig,
} from '@/types'
import { MockEngine } from './mockEngine'

const MODEL = 'llama-3.3-70b-versatile'

function buildAnalysisPrompt(profile: CareerProfile): string {
  return `You are a senior career coach. Analyze this career transition and return ONLY valid JSON matching the schema exactly.

Profile:
- Current Role: ${profile.currentRole}
- Target Role: ${profile.targetRole}
- Years of Experience: ${profile.yearsExperience}
- Current Skills: ${profile.currentSkills.join(', ')}
- Goal: ${profile.goal}
- Available Hours/Week: ${profile.availableHoursPerWeek ?? 10}
- Target Timeline: ${profile.targetTimelineMonths ?? 6} months
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

Be specific to the exact roles. Identify real skill gaps for ${profile.currentRole} transitioning to ${profile.targetRole}.
The estimatedTimeline MUST reflect the user's target of ${profile.targetTimelineMonths ?? 6} months given ${profile.availableHoursPerWeek ?? 10} hours/week.`
}

function buildEvaluationPrompt(question: InterviewQuestion, answer: string): string {
  return `You are a strict technical interviewer. Return ONLY valid JSON.

Question: ${question.question}
Topic: ${question.topic}
Role Context: ${question.roleContext}
Difficulty: ${question.difficulty}

Candidate's Answer: "${answer}"

Score each dimension 0-10. Be strict.

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
  "betterAnswer": "string",
  "followUpQuestions": ["string"],
  "recommendation": "string",
  "answeredAt": "${new Date().toISOString()}"
}`
}

export class GroqAdapter implements AIAdapter {
  private groq: Groq
  private fallback: MockEngine

  constructor(apiKey: string) {
    this.groq = new Groq({ apiKey, dangerouslyAllowBrowser: true })
    this.fallback = new MockEngine()
  }

  private async generateJSON<T>(prompt: string): Promise<T> {
    const response = await this.groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })
    const text = response.choices[0]?.message?.content ?? ''
    return JSON.parse(text) as T
  }

  async analyzeCareerGap(profile: CareerProfile): Promise<CareerAnalysis> {
    try {
      return await this.generateJSON<CareerAnalysis>(buildAnalysisPrompt(profile))
    } catch (e) {
      console.error('[GroqAdapter] analyzeCareerGap failed:', e)
      return this.fallback.analyzeCareerGap(profile)
    }
  }

  async generateRoadmap(profile: CareerProfile, analysis: CareerAnalysis): Promise<Roadmap> {
    try {
      const months = profile.targetTimelineMonths ?? 6
      const phase1Days = Math.round((months / 3) * 30)
      const phase2Days = Math.round((months * 2 / 3) * 30)
      const phase3Days = months * 30

      const prompt = `Generate a learning roadmap for transitioning from ${profile.currentRole} to ${profile.targetRole}.
Target timeline: ${months} months (${profile.availableHoursPerWeek ?? 10} hours/week available).
Gaps to address: ${analysis.gaps.map(g => g.skill).join(', ')}

Split into exactly 3 phases proportional to ${months} months:
- Phase 1: first ${Math.round(months / 3)} month(s) — Foundation
- Phase 2: up to ${Math.round(months * 2 / 3)} month(s) — Core Skills
- Phase 3: full ${months} month(s) — Advanced & Job Ready

Return ONLY valid JSON:
{
  "id": "roadmap-${profile.id}",
  "profileId": "${profile.id}",
  "targetRole": "${profile.targetRole}",
  "totalMonths": ${months},
  "phases": [
    {
      "phase": ${phase1Days},
      "label": "Foundation (Month 1${Math.round(months / 3) > 1 ? `-${Math.round(months / 3)}` : ''})",
      "goal": "string",
      "tasks": [{"id": "t1", "title": "string", "description": "string", "type": "learn|build|practice|network", "estimatedHours": number, "completed": false}],
      "tools": ["string"],
      "projects": [{"id": "p1", "title": "string", "description": "string", "techStack": ["string"], "proofOfSkill": "string"}],
      "certifications": ["string"]
    },
    {
      "phase": ${phase2Days},
      "label": "Core Skills (Month ${Math.round(months / 3) + 1}-${Math.round(months * 2 / 3)})",
      "goal": "string",
      "tasks": [...],
      "tools": ["string"],
      "projects": [...],
      "certifications": ["string"]
    },
    {
      "phase": ${phase3Days},
      "label": "Job Ready (Month ${Math.round(months * 2 / 3) + 1}-${months})",
      "goal": "string",
      "tasks": [...],
      "tools": ["string"],
      "projects": [...],
      "certifications": ["string"]
    }
  ]
}
Each phase must have 4-6 concrete tasks. Be specific for ${profile.targetRole}.`
      return await this.generateJSON<Roadmap>(prompt)
    } catch (e) {
      console.error('[GroqAdapter] generateRoadmap failed:', e)
      return this.fallback.generateRoadmap(profile, analysis)
    }
  }

  async generateInterviewQuestions(config: SessionConfig): Promise<InterviewQuestion[]> {
    try {
      const prompt = `Generate exactly ${config.questionCount} UNIQUE and DISTINCT interview questions for a ${config.targetRole} candidate.

Context:
- Topic area: ${config.topic}
- Difficulty: ${config.difficulty}
- Question type: ${config.questionMode}

Rules:
- Every question must cover a DIFFERENT sub-topic or concept — no repeats
- Spread questions across varied aspects: fundamentals, system design, debugging, best practices, trade-offs, real scenarios
- Each question must be independently answerable and test something different
- ${config.questionMode === 'behavioral' ? 'Use STAR-format behavioral scenarios' : config.questionMode === 'mixed' ? 'Mix technical and behavioral questions' : 'Focus on technical depth and specificity'}
- Vary question format: some conceptual, some scenario-based, some "how would you debug/fix/design"

Return ONLY a JSON object:
{
  "questions": [
    {
      "id": "q${Date.now()}-1",
      "question": "full question text",
      "topic": "specific sub-topic (NOT just '${config.topic}')",
      "difficulty": "${config.difficulty}",
      "mode": "${config.questionMode}",
      "roleContext": "why this matters for ${config.targetRole}",
      "source": "ai-generated",
      "hints": ["hint 1", "hint 2"]
    }
  ]
}
Generate all ${config.questionCount} questions, each on a different concept.`

      const result = await this.generateJSON<{ questions: InterviewQuestion[] } | InterviewQuestion[]>(prompt)
      const questions = Array.isArray(result) ? result : (result as { questions: InterviewQuestion[] }).questions
      // Ensure unique questions by deduplicating on question text
      const seen = new Set<string>()
      const unique = questions.filter(q => {
        const key = q.question.slice(0, 60).toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      return unique.slice(0, config.questionCount)
    } catch (e) {
      console.error('[GroqAdapter] generateInterviewQuestions failed:', e)
      return this.fallback.generateInterviewQuestions(config)
    }
  }

  async evaluateAnswer(question: InterviewQuestion, answer: string): Promise<InterviewEvaluation> {
    try {
      return await this.generateJSON<InterviewEvaluation>(buildEvaluationPrompt(question, answer))
    } catch (e) {
      console.error('[GroqAdapter] evaluateAnswer failed:', e)
      return this.fallback.evaluateAnswer(question, answer)
    }
  }

  async generateTransitionStrategy(profile: CareerProfile, analysis: CareerAnalysis): Promise<TransitionStrategy> {
    try {
      const prompt = `Create a career transition strategy from ${profile.currentRole} to ${profile.targetRole}.
Gaps: ${analysis.gaps.map(g => g.skill).join(', ')}
Target timeline: ${profile.targetTimelineMonths ?? 6} months.

Return ONLY valid JSON matching this exact structure:
{
  "profileId": "${profile.id}",
  "summary": "2-3 sentence overview of the transition plan",
  "transferableStrengths": ["string - skills that transfer directly"],
  "criticalGaps": [
    {"area": "skill name", "action": "specific action to close this gap", "urgency": "immediate|short-term|long-term"}
  ],
  "strategy": [
    {"step": 1, "title": "string", "description": "string", "duration": "e.g. Week 1-2"}
  ],
  "timeline": [
    {"week": 1, "milestone": "string", "deliverable": "concrete output"}
  ],
  "portfolioPlan": [
    {"project": "project name", "purpose": "why this project matters for the role", "techStack": ["string"]}
  ],
  "interviewFocus": ["topic to prepare for interviews"]
}
Be specific and practical. Generate 3-5 items per array.`
      return await this.generateJSON<TransitionStrategy>(prompt)
    } catch (e) {
      console.error('[GroqAdapter] generateTransitionStrategy failed:', e)
      return this.fallback.generateTransitionStrategy(profile, analysis)
    }
  }

  async generateIndustryShift(targetRole: string): Promise<IndustryShift> {
    try {
      const prompt = `Analyze industry trends for the ${targetRole} role in 2025.

Return ONLY valid JSON:
{
  "id": "shift-${targetRole.toLowerCase().replace(/\s+/g, '-')}",
  "targetRole": "${targetRole}",
  "declining": [{"skill": "string", "reason": "string", "urgency": "immediate|gradual|monitor"}],
  "rising": [{"skill": "string", "reason": "string", "urgency": "immediate|gradual|monitor"}],
  "aiImpact": {"role": "${targetRole}", "automationRisk": "low|medium|high|very-high", "summary": "string", "affectedAreas": ["string"], "emergingOpportunities": ["string"]},
  "skillsNow": [{"skill": "string", "why": "string", "priority": "critical|important|nice-to-have"}],
  "adaptation": [{"title": "string", "description": "string", "timeframe": "string"}]
}`
      return await this.generateJSON<IndustryShift>(prompt)
    } catch (e) {
      console.error('[GroqAdapter] generateIndustryShift failed:', e)
      return this.fallback.generateIndustryShift(targetRole)
    }
  }
}
