import { useProgressStore } from '@/store/useProgressStore'
import { useCareerStore } from '@/store/useCareerStore'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/Card'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { BarChart3, Trophy, CheckCircle, Circle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MODULE_WEIGHTS = { analysis: 20, roadmap: 30, interview: 30, transition: 10, industry: 10 }

export function ProgressPage() {
  const { tracker } = useProgressStore()
  const { profile } = useCareerStore()
  const navigate = useNavigate()

  if (!tracker || !profile) {
    return (
      <EmptyState
        icon={<BarChart3 size={32} />}
        title="No progress data yet"
        description="Load a demo flow to start tracking your readiness across all modules."
        action={{ label: 'Get Started', onClick: () => navigate('/') }}
      />
    )
  }

  const getReadinessLabel = (score: number) => {
    if (score >= 75) return { label: 'Interview Ready', color: 'text-brand-green' }
    if (score >= 50) return { label: 'Good Progress', color: 'text-brand-amber' }
    if (score >= 25) return { label: 'Building Base', color: 'text-accent-light' }
    return { label: 'Getting Started', color: 'text-slate-400' }
  }

  const { label, color } = getReadinessLabel(tracker.overallReadiness)

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Progress Tracker"
        subtitle={`${profile.currentRole} → ${profile.targetRole}`}
      />

      {/* Overall readiness */}
      <Card className="flex flex-col md:flex-row items-center gap-8 py-8">
        <ScoreRing
          score={tracker.overallReadiness}
          size={140}
          strokeWidth={10}
          color={tracker.overallReadiness >= 75 ? '#10b981' : tracker.overallReadiness >= 50 ? '#f59e0b' : '#6366f1'}
        />
        <div className="flex-1">
          <div className={`text-2xl font-bold ${color} mb-1`}>{label}</div>
          <p className="text-sm text-slate-400 mb-4">
            Overall readiness score based on weighted module completion.
          </p>
          <div className="space-y-2">
            {tracker.moduleStatuses.map((s) => (
              <div key={s.module} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 md:w-36 shrink-0 truncate">{s.label}</span>
                <ProgressBar
                  value={s.percentComplete}
                  className="flex-1"
                  size="sm"
                  color={s.completed ? 'green' : 'accent'}
                />
                <span className="text-xs text-slate-400 w-10 text-right">{s.percentComplete}%</span>
                <span className="text-xs text-slate-600 w-8 text-right">×{MODULE_WEIGHTS[s.module]}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Module breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tracker.moduleStatuses.map((s) => (
          <Card key={s.module} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              {s.completed
                ? <CheckCircle size={14} className="text-brand-green" />
                : <Circle size={14} className="text-slate-600" />
              }
              <span className="text-xs font-medium text-slate-300 truncate">{s.label}</span>
            </div>
            <div className="text-xl font-bold text-white">{s.percentComplete}%</div>
            <ProgressBar value={s.percentComplete} size="sm" color={s.completed ? 'green' : 'accent'} />
            <span className="text-xs text-slate-600">weight: {MODULE_WEIGHTS[s.module]}%</span>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-3xl font-bold text-white">{tracker.completedTaskIds.length}</div>
          <div className="text-xs text-slate-400 mt-1">Tasks Completed</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-white">{tracker.completedQuestionIds.length}</div>
          <div className="text-xs text-slate-400 mt-1">Questions Answered</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-white">{tracker.milestones.length}</div>
          <div className="text-xs text-slate-400 mt-1">Milestones Reached</div>
        </Card>
      </div>

      {/* Milestones */}
      {tracker.milestones.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-brand-amber" />
            <h3 className="font-semibold text-white">Milestones</h3>
          </div>
          <div className="space-y-2">
            {tracker.milestones.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-2">
                <span className="text-lg">{m.icon}</span>
                <span className="text-sm text-slate-300">{m.label}</span>
                <Badge variant="default" className="ml-auto">
                  {new Date(m.achievedAt).toLocaleDateString()}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
