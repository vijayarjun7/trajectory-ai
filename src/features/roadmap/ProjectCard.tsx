import type { PortfolioProject } from '@/types'
import { Card } from '@/components/ui/Card'
import { Github, Star } from 'lucide-react'

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Card className="border-brand-violet/30 bg-brand-violet/5">
      <div className="flex items-center gap-2 mb-2">
        <Github size={14} className="text-brand-violet" />
        <h4 className="text-sm font-semibold text-white">{project.title}</h4>
      </div>
      <p className="text-xs text-slate-400 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.techStack.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-surface-elevated text-slate-400 text-xs rounded border border-surface-border">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-start gap-2 text-xs">
        <Star size={12} className="text-brand-amber shrink-0 mt-0.5" />
        <span className="text-slate-500">{project.proofOfSkill}</span>
      </div>
    </Card>
  )
}
