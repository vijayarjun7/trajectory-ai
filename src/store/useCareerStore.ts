import { create } from 'zustand'
import type { CareerProfile, CareerAnalysis } from '@/types'
import { qeToDevopsFlow, backendToAimlFlow, promptEngineerFlow } from '@/data'
import { getAdapter } from '@/lib/adapterFactory'
import { useRoadmapStore } from './useRoadmapStore'
import { useProgressStore } from './useProgressStore'

const FLOWS: Record<string, typeof qeToDevopsFlow> = {
  'qe-devops': qeToDevopsFlow,
  'backend-aiml': backendToAimlFlow as typeof qeToDevopsFlow,
  'prompt-engineer': promptEngineerFlow as typeof qeToDevopsFlow,
}

interface CareerState {
  profile: CareerProfile | null
  analysis: CareerAnalysis | null
  isAnalyzing: boolean
  error: string | null
  setProfile: (p: CareerProfile) => void
  setAnalysis: (a: CareerAnalysis) => void
  loadFlow: (flowId: string) => void
  runAnalysis: () => Promise<void>
  reset: () => void
}

export const useCareerStore = create<CareerState>((set, get) => ({
  profile: null,
  analysis: null,
  isAnalyzing: false,
  error: null,

  setProfile: (p) => set({ profile: p }),
  setAnalysis: (a) => set({ analysis: a }),

  loadFlow: (flowId: string) => {
    const flow = FLOWS[flowId]
    if (!flow) return
    set({ profile: flow.profile, analysis: flow.analysis, error: null })
    useRoadmapStore.getState().setRoadmap(flow.roadmap)
    useProgressStore.getState().initTracker(flow.profile.id)
  },

  runAnalysis: async () => {
    const { profile } = get()
    if (!profile) return
    set({ isAnalyzing: true, error: null })
    try {
      const analysis = await getAdapter().analyzeCareerGap(profile)
      set({ analysis, isAnalyzing: false })
      useProgressStore.getState().updateModuleStatus('analysis', 100)
    } catch (e) {
      set({ error: String(e), isAnalyzing: false })
    }
  },

  reset: () => set({ profile: null, analysis: null, error: null }),
}))
