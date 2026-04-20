import { useState, useEffect } from 'react'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { getAdapter } from '@/lib/adapterFactory'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { TrendingUp, TrendingDown, Bot, Zap, Lightbulb } from 'lucide-react'
import type { IndustryShift } from '@/types'
import { useNavigate } from 'react-router-dom'

export function IndustryShiftPage() {
  const { profile } = useCareerStore()
  const { updateModuleStatus } = useProgressStore()
  const navigate = useNavigate()
  const [shift, setShift] = useState<IndustryShift | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile?.targetRole && !shift) {
      setLoading(true)
      getAdapter().generateIndustryShift(profile.targetRole)
        .then((s) => { setShift(s); updateModuleStatus('industry', 100) })
        .finally(() => setLoading(false))
    }
  }, [profile?.targetRole])

  if (!profile) {
    return (
      <EmptyState
        icon={<TrendingUp size={32} />}
        title="No role selected"
        description="Load a demo flow or complete your career profile to see industry shift data."
        action={{ label: 'Get Started', onClick: () => navigate('/') }}
      />
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Industry Shift"
        subtitle={`What's changing for ${profile.targetRole} in 2025`}
      />

      {loading && <div className="space-y-4"><SkeletonCard /><SkeletonCard /></div>}

      {shift && !loading && (
        <div className="space-y-6">
          {/* AI Impact Banner */}
          <Card className={`border-l-4 ${
            shift.aiImpact.automationRisk === 'high' ? 'border-l-brand-rose' :
            shift.aiImpact.automationRisk === 'medium' ? 'border-l-brand-amber' :
            'border-l-brand-green'
          }`}>
            <div className="flex items-start gap-3">
              <Bot size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">AI Impact on {shift.targetRole}</h3>
                  <Badge variant={
                    shift.aiImpact.automationRisk === 'high' ? 'danger' :
                    shift.aiImpact.automationRisk === 'medium' ? 'warning' : 'success'
                  }>
                    {shift.aiImpact.automationRisk} automation risk
                  </Badge>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{shift.aiImpact.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">Areas Affected</div>
                    {shift.aiImpact.affectedAreas.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-rose" />{a}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">Emerging Opportunities</div>
                    {shift.aiImpact.emergingOpportunities.map((o, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />{o}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Rising vs Declining */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-brand-green" />
                <h3 className="font-semibold text-white">Rising</h3>
              </div>
              <div className="space-y-3">
                {shift.rising.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{item.skill}</span>
                        <Badge variant={
                          item.urgency === 'now' ? 'success' :
                          item.urgency === 'watch' ? 'warning' : 'default'
                        }>
                          {item.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{item.reason}</p>
                    </div>
                    <div className="w-16 h-1.5 bg-surface-elevated rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-brand-green rounded-full" style={{ width: `${item.urgency === 'now' ? 100 : item.urgency === 'watch' ? 60 : 30}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown size={16} className="text-brand-rose" />
                <h3 className="font-semibold text-white">Declining</h3>
              </div>
              <div className="space-y-3">
                {shift.declining.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{item.skill}</span>
                        <Badge variant={
                          item.urgency === 'archive' ? 'danger' :
                          item.urgency === 'watch' ? 'warning' : 'default'
                        }>
                          {item.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{item.reason}</p>
                    </div>
                    <div className="w-16 h-1.5 bg-surface-elevated rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-brand-rose rounded-full" style={{ width: `${item.urgency === 'archive' ? 90 : item.urgency === 'watch' ? 50 : 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Skills Now */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-brand-amber" />
              <h3 className="font-semibold text-white">Skills That Matter Right Now</h3>
            </div>
            <div className="space-y-3">
              {shift.skillsNow.map((skill, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-surface-elevated rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-white">{skill.skill}</span>
                      <Badge variant={
                        skill.demand === 'critical' ? 'danger' :
                        skill.demand === 'high' ? 'warning' : 'default'
                      }>
                        {skill.demand}
                      </Badge>
                      <span className="text-xs text-slate-500">{skill.category}</span>
                    </div>
                    <p className="text-xs text-slate-500">{skill.whyItMatters}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Adaptation */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className="text-brand-cyan" />
              <h3 className="font-semibold text-white">How to Adapt</h3>
            </div>
            <div className="space-y-3">
              {shift.adaptation.map((a, i) => (
                <div key={i} className="p-3 bg-surface-elevated rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge variant={
                      a.impact === 'high' ? 'danger' :
                      a.impact === 'medium' ? 'warning' : 'default'
                    }>
                      {a.impact}
                    </Badge>
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{a.advice}</p>
                      <p className="text-xs text-slate-400">
                        <span className="text-slate-500">Action: </span>{a.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Timeframe: {a.timeframe}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
