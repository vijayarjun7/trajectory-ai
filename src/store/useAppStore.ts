import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AdapterMode = 'live' | 'demo'

interface AppState {
  activeFlowId: string | null
  isCustomProfile: boolean
  sidebarOpen: boolean
  adapterMode: AdapterMode
  setActiveFlowId: (id: string | null) => void
  setIsCustomProfile: (v: boolean) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setAdapterMode: (mode: AdapterMode) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeFlowId: null,
      isCustomProfile: false,
      sidebarOpen: true,
      adapterMode: 'demo',
      setActiveFlowId: (id) => set({ activeFlowId: id }),
      setIsCustomProfile: (v) => set({ isCustomProfile: v }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setAdapterMode: (mode) => set({ adapterMode: mode }),
    }),
    { name: 'trajectory-app' }
  )
)
