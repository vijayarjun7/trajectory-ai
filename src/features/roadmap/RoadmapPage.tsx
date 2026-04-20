import { useRoadmapStore } from '@/store/useRoadmapStore'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Tabs } from '@/components/ui/Tabs'
import { EmptyState } from '@/components/ui/EmptyState'
import { PhaseColumn } from './PhaseColumn'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Map } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function RoadmapPage() {
  const { roadmap, activePhase, setActivePhase, getPhaseProgress } = useRoadmapStore()
  const { profile } = useCareerStore()
  const { updateModuleStatus } = useProgressStore()
  const navigate = useNavigate()

  if (!roadmap || !profile) {
    return (
      <EmptyState
        icon={<Map size={32} />}
        title="No roadmap loaded"
        description="Load a demo flow or complete career analysis to generate your 30/60/90-day roadmap."
        action={{ label: 'Go to Career Analysis', onClick: () => navigate('/analysis') }}
      />
    )
  }

  const tabs = roadmap.phases.map((p) => ({
    id: String(p.phase),
    label: `${p.phase} Days — ${p.label}`,
    badge: `${getPhaseProgress(p.phase)}%`,
  }))

  const activePhaseData = roadmap.phases.find((p) => p.phase === activePhase)!

  const overallProgress = Math.round(
    roadmap.phases.reduce((sum, p) => sum + getPhaseProgress(p.phase), 0) / 3
  )

  if (overallProgress > 0) {
    updateModuleStatus('roadmap', overallProgress)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Your Roadmap"
        subtitle={`${profile.currentRole} → ${profile.targetRole} — 30/60/90-day plan`}
      />

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={overallProgress} showLabel size="md" color="green" />
        </div>
        <span className="text-sm text-slate-400 whitespace-nowrap">{overallProgress}% complete</span>
      </div>

      <Tabs
        tabs={tabs}
        activeId={String(activePhase)}
        onChange={(id) => setActivePhase(parseInt(id) as 30 | 60 | 90)}
      />

      <PhaseColumn phase={activePhaseData} />
    </div>
  )
}
