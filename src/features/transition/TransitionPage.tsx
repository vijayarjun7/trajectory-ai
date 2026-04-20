import { useState, useEffect } from 'react'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { getAdapter } from '@/lib/adapterFactory'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Compass, CheckCircle, AlertTriangle, FolderGit2, Calendar, Target } from 'lucide-react'
import type { TransitionStrategy } from '@/types'
import { useNavigate } from 'react-router-dom'

export function TransitionPage() {
  const { profile, analysis } = useCareerStore()
  const { updateModuleStatus } = useProgressStore()
  const navigate = useNavigate()
  const [strategy, setStrategy] = useState<TransitionStrategy | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile && analysis && !strategy) {
      setLoading(true)
      getAdapter().generateTransitionStrategy(profile, analysis)
        .then((s) => { setStrategy(s); updateModuleStatus('transition', 100) })
        .finally(() => setLoading(false))
    }
  }, [profile, analysis])

  if (!profile || !analysis) {
    return (
      <EmptyState
        icon={<Compass size={32} />}
        title="No profile loaded"
        description="Complete career analysis first to generate your transition strategy."
        action={{ label: 'Go to Career Analysis', onClick: () => navigate('/analysis') }}
      />
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Transition Strategy"
        subtitle={`${profile.currentRole} → ${profile.targetRole}`}
      />

      {loading && (
        <div className="space-y-4">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      )}

      {strategy && !loading && (
        <div className="space-y-6">
          {/* Summary */}
          <Card className="border-accent/30 bg-accent-muted">
            <h3 className="font-semibold text-white mb-2">Strategy Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{strategy.summary}</p>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Transferable Strengths */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={16} className="text-brand-green" />
                <h3 className="font-semibold text-white">Transferable Strengths</h3>
              </div>
              <ul className="space-y-2">
                {strategy.transferableStrengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-green mt-0.5 shrink-0">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Critical Gaps */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={16} className="text-brand-amber" />
                <h3 className="font-semibold text-white">Critical Gaps</h3>
              </div>
              <div className="space-y-3">
                {strategy.criticalGaps.map((gap, i) => (
                  <div key={i} className="p-3 bg-surface-elevated rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{gap.area}</span>
                      <Badge variant={
                        gap.urgency === 'immediate' ? 'danger' :
                        gap.urgency === 'short-term' ? 'warning' : 'default'
                      }>
                        {gap.urgency}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">{gap.action}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Strategy Steps */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-accent" />
              <h3 className="font-semibold text-white">Action Plan</h3>
            </div>
            <div className="space-y-3">
              {strategy.strategy.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {step.step}
                    </div>
                    {step.step < strategy.strategy.length && (
                      <div className="w-px h-full bg-surface-border mt-1" />
                    )}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{step.title}</span>
                      <Badge variant="default">{step.duration}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-brand-cyan" />
              <h3 className="font-semibold text-white">Milestone Timeline</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max pb-2">
                {strategy.timeline.map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-40">
                    <div className="w-px h-4 bg-surface-border" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="text-xs font-bold text-accent">Week {m.week}</div>
                    <div className="text-xs font-medium text-white text-center">{m.milestone}</div>
                    <div className="text-xs text-slate-500 text-center">{m.deliverable}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Portfolio Plan */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FolderGit2 size={16} className="text-brand-violet" />
              <h3 className="font-semibold text-white">Portfolio Plan</h3>
            </div>
            <div className="space-y-3">
              {strategy.portfolioPlan.map((item, i) => (
                <div key={i} className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-sm font-medium text-white mb-1">{item.project}</div>
                  <p className="text-xs text-slate-400 mb-2">{item.purpose}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-brand-violet/10 text-brand-violet text-xs rounded-full border border-brand-violet/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Interview Focus */}
          <Card>
            <h3 className="font-semibold text-white mb-3">Interview Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {strategy.interviewFocus.map((f, i) => (
                <span key={i} className="px-3 py-1.5 bg-surface-elevated text-slate-300 text-xs rounded-full border border-surface-border">
                  {f}
                </span>
              ))}
            </div>
            <Button className="mt-4" onClick={() => navigate('/interview')}>
              Practice Interview Topics
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
