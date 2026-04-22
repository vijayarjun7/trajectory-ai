import { useCareerStore } from '@/store/useCareerStore'
import { useAppStore } from '@/store/useAppStore'
import { DEMO_FLOWS } from '@/data/roleRegistry'
import { ChevronDown, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'

export function FlowSelector() {
  const { activeFlowId, isCustomProfile, setActiveFlowId, setIsCustomProfile } = useAppStore()
  const { loadFlow } = useCareerStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const active = DEMO_FLOWS.find((f) => f.id === activeFlowId)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(id: string) {
    setActiveFlowId(id)
    setIsCustomProfile(false)
    loadFlow(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-elevated border border-surface-border rounded-lg text-sm text-slate-300 hover:border-accent/50 transition-colors"
      >
        <Zap size={14} className="text-accent" />
        <span>{isCustomProfile ? 'Custom Profile' : active ? active.label : 'Select Demo Flow'}</span>
        <ChevronDown size={14} className={clsx('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 w-56 md:w-64 bg-surface-elevated border border-surface-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <div className="px-3 py-2 border-b border-surface-border">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Demo Flows</span>
          </div>
          {DEMO_FLOWS.map((flow) => (
            <button
              key={flow.id}
              onClick={() => handleSelect(flow.id)}
              className={clsx(
                'w-full text-left px-4 py-3 text-sm hover:bg-surface-card transition-colors',
                flow.id === activeFlowId ? 'text-accent-light bg-accent-muted' : 'text-slate-300'
              )}
            >
              <div className="font-medium">{flow.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{flow.currentRole} → {flow.targetRole}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
