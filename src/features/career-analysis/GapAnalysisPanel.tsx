import type { CareerAnalysis } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

const severityConfig = {
  critical: { variant: 'danger' as const, dot: 'bg-brand-rose', label: 'Critical' },
  moderate: { variant: 'warning' as const, dot: 'bg-brand-amber', label: 'Moderate' },
  minor:    { variant: 'info' as const,    dot: 'bg-accent',      label: 'Minor' },
}

export function GapAnalysisPanel({ analysis }: { analysis: CareerAnalysis }) {
  const critical = analysis.gaps.filter(g => g.severity === 'critical')
  const moderate = analysis.gaps.filter(g => g.severity === 'moderate')
  const minor = analysis.gaps.filter(g => g.severity === 'minor')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Gaps */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} className="text-brand-amber" />
          <h3 className="font-semibold text-white">Skill Gaps</h3>
          <span className="ml-auto text-xs text-slate-500">{analysis.gaps.length} total</span>
        </div>
        <div className="space-y-1">
          {[...critical, ...moderate, ...minor].map((gap) => {
            const cfg = severityConfig[gap.severity]
            return (
              <div key={gap.skill} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${cfg.dot} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white">{gap.skill}</span>
                    <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{gap.reason}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Strengths + Transferable */}
      <div className="space-y-4">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} className="text-brand-green" />
            <h3 className="font-semibold text-white">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight size={16} className="text-brand-cyan" />
            <h3 className="font-semibold text-white">Transferable Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.transferableSkills.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-xs rounded-full border border-brand-cyan/20">
                {s}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
