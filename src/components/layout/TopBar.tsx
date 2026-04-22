import { Menu, Sparkles, Cpu } from 'lucide-react'
import { FlowSelector } from '@/components/shared/FlowSelector'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useAppStore } from '@/store/useAppStore'
import { getAdapterMode } from '@/lib/adapterFactory'
import { clsx } from 'clsx'

export function TopBar() {
  const { profile } = useCareerStore()
  const { tracker } = useProgressStore()
  const { toggleSidebar } = useAppStore()
  const mode = getAdapterMode()

  return (
    <header className="h-14 md:h-16 shrink-0 flex items-center justify-between px-3 md:px-6 border-b border-surface-border bg-surface-card/50 backdrop-blur-sm gap-2">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-elevated transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        {profile && (
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs md:text-sm text-slate-400 truncate hidden sm:block max-w-[80px] md:max-w-none">
              {profile.currentRole}
            </span>
            <span className="text-slate-600 hidden sm:block">→</span>
            <span className="text-xs md:text-sm font-semibold text-white truncate max-w-[110px] md:max-w-none">
              {profile.targetRole}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        {tracker && (
          <div className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 bg-surface-elevated border border-surface-border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
              {tracker.overallReadiness}%
              <span className="hidden sm:inline"> Ready</span>
            </span>
          </div>
        )}

        <div className={clsx(
          'hidden sm:flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium border',
          mode === 'live'
            ? 'bg-brand-green/10 border-brand-green/30 text-brand-green'
            : 'bg-surface-elevated border-surface-border text-slate-400'
        )}>
          {mode === 'live' ? <Sparkles size={12} /> : <Cpu size={12} />}
          <span className="hidden md:inline">{mode === 'live' ? 'AI Mode: Live' : 'Demo Mode'}</span>
          <span className="sm:hidden md:hidden">{mode === 'live' ? 'Live' : 'Demo'}</span>
        </div>

        <FlowSelector />
      </div>
    </header>
  )
}
