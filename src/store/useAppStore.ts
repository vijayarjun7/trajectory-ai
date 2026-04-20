import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AdapterMode = 'live' | 'demo'

interface AppState {
  activeFlowId: string | null
  sidebarOpen: boolean
  adapterMode: AdapterMode
  setActiveFlowId: (id: string | null) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setAdapterMode: (mode: AdapterMode) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeFlowId: null,
      sidebarOpen: true,
      adapterMode: 'demo',
      setActiveFlowId: (id) => set({ activeFlowId: id }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setAdapterMode: (mode) => set({ adapterMode: mode }),
    }),
    { name: 'trajectory-app' }
  )
)
