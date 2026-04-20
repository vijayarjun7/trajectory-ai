import { FlowSelector } from '@/components/shared/FlowSelector'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { getAdapterMode } from '@/lib/adapterFactory'
import { Sparkles, Cpu } from 'lucide-react'
import { clsx } from 'clsx'

export function TopBar() {
  const { profile } = useCareerStore()
  const { tracker } = useProgressStore()
  const mode = getAdapterMode()

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-surface-border bg-surface-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {profile && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">{profile.currentRole}</span>
            <span className="text-slate-600">→</span>
            <span className="text-sm font-semibold text-white">{profile.targetRole}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {tracker && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-surface-border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-slate-300">
              {tracker.overallReadiness}% Ready
            </span>
          </div>
        )}

        <div className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border',
          mode === 'live'
            ? 'bg-brand-green/10 border-brand-green/30 text-brand-green'
            : 'bg-surface-elevated border-surface-border text-slate-400'
        )}>
          {mode === 'live' ? <Sparkles size={12} /> : <Cpu size={12} />}
          {mode === 'live' ? 'AI Mode: Live' : 'Demo Mode'}
        </div>

        <FlowSelector />
      </div>
    </header>
  )
}
