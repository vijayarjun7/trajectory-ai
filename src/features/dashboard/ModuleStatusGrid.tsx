import type { ModuleStatus } from '@/types'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { CheckCircle, Circle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MODULE_ROUTES: Record<string, string> = {
  analysis: '/analysis',
  roadmap: '/roadmap',
  interview: '/interview',
  transition: '/transition',
  industry: '/industry',
}

export function ModuleStatusGrid({ statuses }: { statuses: ModuleStatus[] }) {
  const navigate = useNavigate()

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Module Progress</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statuses.map((s) => (
          <Card
            key={s.module}
            hoverable
            onClick={() => navigate(MODULE_ROUTES[s.module] ?? '/')}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{s.label}</span>
              {s.completed
                ? <CheckCircle size={14} className="text-brand-green" />
                : <Circle size={14} className="text-slate-600" />
              }
            </div>
            <div className="text-lg font-bold text-white">{s.percentComplete}%</div>
            <ProgressBar
              value={s.percentComplete}
              size="sm"
              color={s.completed ? 'green' : 'accent'}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
