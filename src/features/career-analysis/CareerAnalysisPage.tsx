import { useState } from 'react'
import { useCareerStore } from '@/store/useCareerStore'
import { useProgressStore } from '@/store/useProgressStore'
import { ProfileInputForm } from './ProfileInputForm'
import { GapAnalysisPanel } from './GapAnalysisPanel'
import { SkillMatrix } from './SkillMatrix'
import { TopicsToStudy } from './TopicsToStudy'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { RefreshCw } from 'lucide-react'

export function CareerAnalysisPage() {
  const { profile, analysis, isAnalyzing, runAnalysis } = useCareerStore()
  const { updateModuleStatus } = useProgressStore()
  const [showForm, setShowForm] = useState(!profile)

  async function handleRunAnalysis() {
    await runAnalysis()
    updateModuleStatus('analysis', 100)
    setShowForm(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Career Analysis"
        subtitle="Understand your gaps, strengths, and transition readiness"
        action={
          analysis && (
            <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'View Analysis' : 'Edit Profile'}
            </Button>
          )
        }
      />

      {(showForm || !profile) && (
        <ProfileInputForm onSubmit={() => { handleRunAnalysis(); setShowForm(false) }} />
      )}

      {isAnalyzing && (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {analysis && !isAnalyzing && !showForm && (
        <div className="space-y-6">
          {/* Readiness overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="flex flex-col items-center justify-center gap-2 py-6">
              <ScoreRing
                score={analysis.readinessScore}
                size={100}
                strokeWidth={7}
                color={analysis.readinessScore >= 60 ? '#10b981' : '#6366f1'}
              />
              <span className="text-xs text-slate-400 mt-1">Readiness Score</span>
            </Card>
            <Card className="flex flex-col justify-center gap-2">
              <span className="text-xs text-slate-400">Estimated Timeline</span>
              <span className="text-xl font-bold text-white">{analysis.estimatedTimeline}</span>
              <span className="text-xs text-slate-500">to interview-ready</span>
            </Card>
            <Card className="flex flex-col justify-center gap-2">
              <span className="text-xs text-slate-400">Transition Difficulty</span>
              <Badge
                variant={
                  analysis.transitionDifficulty === 'easy' ? 'success' :
                  analysis.transitionDifficulty === 'moderate' ? 'warning' :
                  'danger'
                }
                size="md"
              >
                {analysis.transitionDifficulty}
              </Badge>
            </Card>
            <Card className="flex flex-col justify-center gap-2">
              <span className="text-xs text-slate-400">Skill Gaps</span>
              <span className="text-xl font-bold text-white">{analysis.gaps.length}</span>
              <span className="text-xs text-slate-500">
                {analysis.gaps.filter(g => g.severity === 'critical').length} critical
              </span>
            </Card>
          </div>

          <GapAnalysisPanel analysis={analysis} />
          <SkillMatrix analysis={analysis} />
          <TopicsToStudy topics={analysis.recommendedTopics} />

          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              loading={isAnalyzing}
              onClick={handleRunAnalysis}
            >
              <RefreshCw size={14} />
              Re-run Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
