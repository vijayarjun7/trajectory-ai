import { clsx } from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'accent' | 'green' | 'amber' | 'rose' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
}

const colorMap = {
  accent: 'bg-accent',
  green: 'bg-brand-green',
  amber: 'bg-brand-amber',
  rose: 'bg-brand-rose',
  cyan: 'bg-brand-cyan',
}

export function ProgressBar({
  value, max = 100, className, color = 'accent',
  size = 'md', showLabel = false, animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-medium text-slate-300">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={clsx(
        'w-full bg-surface-elevated rounded-full overflow-hidden',
        { 'h-1': size === 'sm', 'h-2': size === 'md', 'h-3': size === 'lg' }
      )}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            colorMap[color],
            animated && 'ease-out'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
