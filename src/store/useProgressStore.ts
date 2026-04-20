import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressTracker, ModuleName, ModuleStatus } from '@/types'

const MODULE_WEIGHTS: Record<ModuleName, number> = {
  analysis: 0.20,
  roadmap: 0.30,
  interview: 0.30,
  transition: 0.10,
  industry: 0.10,
}

const DEFAULT_STATUSES: ModuleStatus[] = [
  { module: 'analysis',   label: 'Career Analysis',     completed: false, percentComplete: 0 },
  { module: 'roadmap',    label: 'Roadmap',              completed: false, percentComplete: 0 },
  { module: 'interview',  label: 'Interview Coach',      completed: false, percentComplete: 0 },
  { module: 'transition', label: 'Transition Strategy',  completed: false, percentComplete: 0 },
  { module: 'industry',   label: 'Industry Shift',       completed: false, percentComplete: 0 },
]

function computeReadiness(statuses: ModuleStatus[]): number {
  return Math.round(
    statuses.reduce((sum, s) => sum + s.percentComplete * MODULE_WEIGHTS[s.module], 0)
  )
}

interface ProgressState {
  tracker: ProgressTracker | null
  initTracker: (profileId: string) => void
  updateModuleStatus: (module: ModuleName, pct: number) => void
  completeQuestion: (questionId: string) => void
  completeTask: (taskId: string) => void
  addMilestone: (label: string, icon: string) => void
  getOverallReadiness: () => number
  reset: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      tracker: null,

      initTracker: (profileId) => {
        const existing = get().tracker
        if (existing?.profileId === profileId) return
        set({
          tracker: {
            profileId,
            overallReadiness: 0,
            moduleStatuses: [...DEFAULT_STATUSES],
            completedTaskIds: [],
            completedQuestionIds: [],
            milestones: [],
          },
        })
      },

      updateModuleStatus: (module, pct) => {
        set((state) => {
          if (!state.tracker) return state
          const statuses = state.tracker.moduleStatuses.map((s) =>
            s.module === module
              ? { ...s, percentComplete: pct, completed: pct >= 100, lastVisited: new Date().toISOString() }
              : s
          )
          return {
            tracker: {
              ...state.tracker,
              moduleStatuses: statuses,
              overallReadiness: computeReadiness(statuses),
            },
          }
        })
      },

      completeQuestion: (questionId) => {
        set((state) => {
          if (!state.tracker) return state
          if (state.tracker.completedQuestionIds.includes(questionId)) return state
          const completedQuestionIds = [...state.tracker.completedQuestionIds, questionId]
          const interviewPct = Math.min(100, completedQuestionIds.length * 10)
          const statuses = state.tracker.moduleStatuses.map((s) =>
            s.module === 'interview' ? { ...s, percentComplete: interviewPct } : s
          )
          return {
            tracker: {
              ...state.tracker,
              completedQuestionIds,
              moduleStatuses: statuses,
              overallReadiness: computeReadiness(statuses),
            },
          }
        })
      },

      completeTask: (taskId) => {
        set((state) => {
          if (!state.tracker) return state
          if (state.tracker.completedTaskIds.includes(taskId)) return state
          const completedTaskIds = [...state.tracker.completedTaskIds, taskId]
          const roadmapPct = Math.min(100, Math.round(completedTaskIds.length * 6.67))
          const statuses = state.tracker.moduleStatuses.map((s) =>
            s.module === 'roadmap' ? { ...s, percentComplete: roadmapPct } : s
          )
          return {
            tracker: {
              ...state.tracker,
              completedTaskIds,
              moduleStatuses: statuses,
              overallReadiness: computeReadiness(statuses),
            },
          }
        })
      },

      addMilestone: (label, icon) => {
        set((state) => {
          if (!state.tracker) return state
          return {
            tracker: {
              ...state.tracker,
              milestones: [
                ...state.tracker.milestones,
                { id: `m-${Date.now()}`, label, icon, achievedAt: new Date().toISOString() },
              ],
            },
          }
        })
      },

      getOverallReadiness: () => get().tracker?.overallReadiness ?? 0,

      reset: () => set({ tracker: null }),
    }),
    { name: 'trajectory-progress' }
  )
)
