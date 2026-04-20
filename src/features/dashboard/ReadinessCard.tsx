import { ScoreRing } from '@/components/ui/ScoreRing'
import { Card } from '@/components/ui/Card'

export function ReadinessCard({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 75) return '#10b981'
    if (s >= 50) return '#f59e0b'
    return '#6366f1'
  }

  const getLabel = (s: number) => {
    if (s >= 75) return 'Interview Ready'
    if (s >= 50) return 'Good Progress'
    if (s >= 25) return 'Building Base'
    return 'Getting Started'
  }

  return (
    <Card className="flex flex-col items-center justify-center gap-3">
      <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Overall Readiness</div>
      <ScoreRing
        score={score}
        size={120}
        strokeWidth={8}
        color={getColor(score)}
        label={`/ 100`}
      />
      <div className="text-sm font-medium text-slate-300">{getLabel(score)}</div>
    </Card>
  )
}
