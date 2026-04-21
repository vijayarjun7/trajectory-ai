import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Roadmap } from '@/types'

interface RoadmapState {
  roadmap: Roadmap | null
  completedTaskIds: string[]
  activePhase: number
  setRoadmap: (r: Roadmap) => void
  toggleTask: (taskId: string) => void
  setActivePhase: (p: number) => void
  getPhaseProgress: (phase: number) => number
  reset: () => void
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      roadmap: null,
      completedTaskIds: [],
      activePhase: 30,

      setRoadmap: (r) => set({ roadmap: r, activePhase: r.phases[0]?.phase ?? 30 }),

      toggleTask: (taskId) => {
        const { completedTaskIds } = get()
        const isCompleted = completedTaskIds.includes(taskId)
        set({
          completedTaskIds: isCompleted
            ? completedTaskIds.filter((id) => id !== taskId)
            : [...completedTaskIds, taskId],
        })
      },

      setActivePhase: (p) => set({ activePhase: p }),

      getPhaseProgress: (phase) => {
        const { roadmap, completedTaskIds } = get()
        if (!roadmap) return 0
        const phaseData = roadmap.phases.find((p) => p.phase === phase)
        if (!phaseData || phaseData.tasks.length === 0) return 0
        const completed = phaseData.tasks.filter((t) =>
          completedTaskIds.includes(t.id)
        ).length
        return Math.round((completed / phaseData.tasks.length) * 100)
      },

      reset: () => set({ roadmap: null, completedTaskIds: [], activePhase: 30 }),
    }),
    { name: 'trajectory-roadmap' }
  )
)
