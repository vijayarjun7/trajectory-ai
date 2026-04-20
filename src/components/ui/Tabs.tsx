import { clsx } from 'clsx'

interface Tab {
  id: string
  label: string
  badge?: string | number
}

interface TabsProps {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeId, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex gap-1 p-1 bg-surface-elevated rounded-xl border border-surface-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
            tab.id === activeId
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-slate-400 hover:text-white hover:bg-surface-card'
          )}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className={clsx(
              'inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs rounded-full font-bold',
              tab.id === activeId ? 'bg-white/20 text-white' : 'bg-surface-border text-slate-400'
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
