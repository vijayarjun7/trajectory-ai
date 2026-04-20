import { create } from 'zustand'
import type {
  InterviewSession, InterviewQuestion, InterviewEvaluation,
  SessionConfig, VoiceState,
} from '@/types'
import { getAdapter } from '@/lib/adapterFactory'
import { useProgressStore } from './useProgressStore'

interface InterviewState {
  session: InterviewSession | null
  currentAnswer: string
  transcript: string
  voiceState: VoiceState
  isEvaluating: boolean
  error: string | null

  startSession: (config: SessionConfig, questions: InterviewQuestion[]) => void
  submitAnswer: (answer: string) => Promise<void>
  nextQuestion: () => void
  setTranscript: (t: string) => void
  setCurrentAnswer: (a: string) => void
  setVoiceState: (s: VoiceState) => void
  endSession: () => void
  reset: () => void
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  session: null,
  currentAnswer: '',
  transcript: '',
  voiceState: 'idle',
  isEvaluating: false,
  error: null,

  startSession: (config, questions) => {
    set({
      session: {
        id: `session-${Date.now()}`,
        config,
        questions,
        evaluations: {},
        currentIndex: 0,
        startedAt: new Date().toISOString(),
      },
      currentAnswer: '',
      transcript: '',
      voiceState: 'idle',
      isEvaluating: false,
      error: null,
    })
  },

  submitAnswer: async (answer) => {
    const { session } = get()
    if (!session) return
    const question = session.questions[session.currentIndex]
    if (!question) return

    set({ isEvaluating: true, error: null })
    try {
      const evaluation = await getAdapter().evaluateAnswer(question, answer)
      const updatedEvaluations = { ...session.evaluations, [question.id]: evaluation }
      const scores = Object.values(updatedEvaluations).map((e) => e.overallScore)
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length

      set({
        session: {
          ...session,
          evaluations: updatedEvaluations,
          averageScore: Math.round(avgScore * 10) / 10,
        },
        isEvaluating: false,
      })
      useProgressStore.getState().completeQuestion(question.id)
    } catch (e) {
      set({ error: String(e), isEvaluating: false })
    }
  },

  nextQuestion: () => {
    const { session } = get()
    if (!session) return
    const nextIndex = session.currentIndex + 1
    if (nextIndex >= session.questions.length) {
      const completedAt = new Date().toISOString()
      set({ session: { ...session, currentIndex: nextIndex, completedAt } })
      useProgressStore.getState().updateModuleStatus('interview', 100)
    } else {
      set({
        session: { ...session, currentIndex: nextIndex },
        currentAnswer: '',
        transcript: '',
        voiceState: 'idle',
      })
    }
  },

  setTranscript: (t) => set({ transcript: t }),
  setCurrentAnswer: (a) => set({ currentAnswer: a }),
  setVoiceState: (s) => set({ voiceState: s }),

  endSession: () => {
    const { session } = get()
    if (session) {
      set({ session: { ...session, completedAt: new Date().toISOString() } })
      useProgressStore.getState().updateModuleStatus('interview', 100)
    }
  },

  reset: () => set({
    session: null, currentAnswer: '', transcript: '',
    voiceState: 'idle', isEvaluating: false, error: null,
  }),
}))
