import type { CareerAnalysis } from '@/types'
import { Card } from '@/components/ui/Card'
import { useCareerStore } from '@/store/useCareerStore'

export function SkillMatrix({ analysis }: { analysis: CareerAnalysis }) {
  const { profile } = useCareerStore()
  const currentSkills = profile?.currentSkills ?? []

  const allSkillsMentioned = [
    ...currentSkills,
    ...analysis.gaps.map(g => g.skill),
  ]
  const unique = Array.from(new Set(allSkillsMentioned))

  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">Skill Matrix</h3>
      <div className="overflow-x-auto">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {unique.map((skill) => {
            const gap = analysis.gaps.find(g => g.skill.toLowerCase() === skill.toLowerCase())
            const isCurrentSkill = currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
            const isTransferable = analysis.transferableSkills.some(s =>
              s.toLowerCase().includes(skill.toLowerCase())
            )

            let status: 'have' | 'gap-critical' | 'gap-moderate' | 'gap-minor' | 'transferable'
            if (gap) {
              status = gap.severity === 'critical' ? 'gap-critical' :
                       gap.severity === 'moderate' ? 'gap-moderate' : 'gap-minor'
            } else if (isTransferable) {
              status = 'transferable'
            } else {
              status = 'have'
            }

            const config = {
              'have':          { bg: 'bg-brand-green/10 border-brand-green/20',  text: 'text-brand-green',  label: '✓ Have' },
              'gap-critical':  { bg: 'bg-brand-rose/10 border-brand-rose/20',    text: 'text-brand-rose',   label: '✗ Critical' },
              'gap-moderate':  { bg: 'bg-brand-amber/10 border-brand-amber/20',  text: 'text-brand-amber',  label: '△ Moderate' },
              'gap-minor':     { bg: 'bg-accent-muted border-accent/20',          text: 'text-accent-light', label: '○ Minor' },
              'transferable':  { bg: 'bg-brand-cyan/10 border-brand-cyan/20',    text: 'text-brand-cyan',   label: '→ Transfer' },
            }[status]

            return (
              <div key={skill} className={`p-3 rounded-lg border ${config.bg}`}>
                <div className="text-sm font-medium text-white truncate" title={skill}>{skill}</div>
                <div className={`text-xs mt-1 ${config.text}`}>{config.label}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-surface-border">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-sm bg-brand-green/20 border border-brand-green/30" /> Have
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-sm bg-brand-rose/20 border border-brand-rose/30" /> Critical gap
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-sm bg-brand-amber/20 border border-brand-amber/30" /> Moderate gap
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-sm bg-brand-cyan/20 border border-brand-cyan/30" /> Transferable
        </div>
      </div>
    </Card>
  )
}
