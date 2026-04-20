import type { RoadmapTask } from '@/types'
import { useRoadmapStore } from '@/store/useRoadmapStore'
import { useProgressStore } from '@/store/useProgressStore'
import { Badge } from '@/components/ui/Badge'
import { clsx } from 'clsx'
import { Clock, Code, BookOpen, Users, Hammer } from 'lucide-react'

const typeConfig = {
  learn:    { icon: BookOpen, color: 'text-accent-light',  bg: 'bg-accent-muted',    label: 'Learn' },
  build:    { icon: Hammer,   color: 'text-brand-green',   bg: 'bg-brand-green/10',  label: 'Build' },
  practice: { icon: Code,     color: 'text-brand-cyan',    bg: 'bg-brand-cyan/10',   label: 'Practice' },
  network:  { icon: Users,    color: 'text-brand-amber',   bg: 'bg-brand-amber/10',  label: 'Network' },
}

export function TaskCard({ task }: { task: RoadmapTask }) {
  const { completedTaskIds, toggleTask } = useRoadmapStore()
  const { completeTask } = useProgressStore()
  const isCompleted = completedTaskIds.includes(task.id)
  const cfg = typeConfig[task.type]
  const Icon = cfg.icon

  function handleToggle() {
    toggleTask(task.id)
    if (!isCompleted) completeTask(task.id)
  }

  return (
    <div
      className={clsx(
        'flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer group',
        isCompleted
          ? 'bg-brand-green/5 border-brand-green/20 opacity-75'
          : 'bg-surface-card border-surface-border hover:border-accent/40 hover:bg-surface-elevated'
      )}
      onClick={handleToggle}
    >
      {/* Checkbox */}
      <div
        className={clsx(
          'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
          isCompleted ? 'bg-brand-green border-brand-green' : 'border-surface-border group-hover:border-accent'
        )}
      >
        {isCompleted && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={clsx('text-sm font-medium', isCompleted ? 'line-through text-slate-500' : 'text-white')}>
            {task.title}
          </span>
          <div className={clsx('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs', cfg.bg, cfg.color)}>
            <Icon size={10} />
            {cfg.label}
          </div>
        </div>
        <p className={clsx('text-xs leading-relaxed', isCompleted ? 'text-slate-600' : 'text-slate-400')}>
          {task.description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
        <Clock size={12} />
        {task.estimatedHours}h
      </div>
    </div>
  )
}
