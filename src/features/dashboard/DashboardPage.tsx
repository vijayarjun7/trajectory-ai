import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useRoadmapStore } from '@/store/useRoadmapStore'
import { QuickStartPanel } from './QuickStartPanel'
import { ReadinessCard } from './ReadinessCard'
import { ModuleStatusGrid } from './ModuleStatusGrid'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  CheckCircle, Clock, Target, AlertTriangle,
  ArrowRight, Calendar,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const { profile, analysis } = useCareerStore()
  const { tracker } = useProgressStore()
  const { roadmap, completedTaskIds } = useRoadmapStore()
  const navigate = useNavigate()

  if (!profile || !analysis) {
    return <QuickStartPanel />
  }

  const totalTasks = roadmap?.phases.reduce((sum, p) => sum + p.tasks.length, 0) ?? 0
  const completedTasks = completedTaskIds.length

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Dashboard"
        subtitle={`${profile.currentRole} → ${profile.targetRole} transition overview`}
      />

      {/* Top cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReadinessCard score={tracker?.overallReadiness ?? analysis.readinessScore} />

        <Card className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
            <Clock size={14} />
            Timeline
          </div>
          <div className="text-2xl font-bold text-white">{analysis.estimatedTimeline}</div>
          <div className="flex items-center gap-2">
            <Badge variant={
              analysis.transitionDifficulty === 'easy' ? 'success' :
              analysis.transitionDifficulty === 'moderate' ? 'warning' :
              'danger'
            }>
              {analysis.transitionDifficulty}
            </Badge>
            <span className="text-xs text-slate-500">transition difficulty</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
            <Target size={14} />
            Roadmap Progress
          </div>
          <div className="text-2xl font-bold text-white">
            {completedTasks} <span className="text-lg text-slate-400">/ {totalTasks}</span>
          </div>
          <ProgressBar value={completedTasks} max={Math.max(totalTasks, 1)} color="green" />
          <span className="text-xs text-slate-500">tasks completed</span>
        </Card>
      </div>

      {/* Gap snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-brand-amber" />
            <h3 className="font-semibold text-white">Critical Skill Gaps</h3>
          </div>
          <div className="space-y-2">
            {analysis.gaps.filter(g => g.severity === 'critical').slice(0, 4).map((gap) => (
              <div key={gap.skill} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-rose shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-200">{gap.skill}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{gap.reason}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/analysis')}
            className="mt-4 flex items-center gap-1 text-xs text-accent-light hover:underline"
          >
            View full analysis <ArrowRight size={12} />
          </button>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} className="text-brand-green" />
            <h3 className="font-semibold text-white">Your Strengths</h3>
          </div>
          <div className="space-y-2">
            {analysis.strengths.slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-green shrink-0" />
                <div className="text-sm text-slate-300">{s}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Module status */}
      {tracker && <ModuleStatusGrid statuses={tracker.moduleStatuses} />}

      {/* Upcoming roadmap tasks */}
      {roadmap && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-accent" />
              <h3 className="font-semibold text-white">30-Day Quick Wins</h3>
            </div>
            <button
              onClick={() => navigate('/roadmap')}
              className="flex items-center gap-1 text-xs text-accent-light hover:underline"
            >
              Full roadmap <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {roadmap.phases[0].tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                <div className={`w-3 h-3 rounded-full shrink-0 ${
                  completedTaskIds.includes(task.id) ? 'bg-brand-green' : 'border-2 border-surface-border'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 truncate">{task.title}</div>
                  <div className="text-xs text-slate-500">{task.estimatedHours}h estimated</div>
                </div>
                <Badge variant="default">{task.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
