import type { RoadmapPhase } from '@/types'
import { TaskCard } from './TaskCard'
import { ProjectCard } from './ProjectCard'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useRoadmapStore } from '@/store/useRoadmapStore'
import { Wrench, Award } from 'lucide-react'

export function PhaseColumn({ phase }: { phase: RoadmapPhase }) {
  const { completedTaskIds, getPhaseProgress } = useRoadmapStore()
  const progress = getPhaseProgress(phase.phase)
  const completedCount = phase.tasks.filter(t => completedTaskIds.includes(t.id)).length

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Phase header */}
      <Card className="bg-accent-muted border-accent/30">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info" size="md">{phase.phase}-Day Goal</Badge>
              <span className="text-lg font-bold text-white">{phase.label}</span>
            </div>
            <p className="text-sm text-slate-300">{phase.goal}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progress}%</div>
            <div className="text-xs text-slate-400">{completedCount}/{phase.tasks.length} tasks</div>
          </div>
        </div>
        <ProgressBar value={progress} className="mt-3" color="accent" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Tasks</h3>
          {phase.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Tools */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={14} className="text-brand-cyan" />
              <h3 className="text-sm font-semibold text-white">Tools to Learn</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {phase.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 bg-brand-cyan/10 text-brand-cyan text-xs rounded-full border border-brand-cyan/20">
                  {tool}
                </span>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          {phase.certifications.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Award size={14} className="text-brand-amber" />
                <h3 className="text-sm font-semibold text-white">Certifications</h3>
              </div>
              <div className="space-y-2">
                {phase.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
                    <span className="text-slate-300">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Projects */}
          {phase.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
