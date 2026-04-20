import { useInterviewStore } from '@/store/useInterviewStore'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Badge } from '@/components/ui/Badge'
import { Trophy, RefreshCw, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export function SessionSummary() {
  const { session, reset } = useInterviewStore()
  const navigate = useNavigate()
  if (!session) return null

  const evals = Object.values(session.evaluations)
  const avgScore = session.averageScore ?? 0
  const avgClarity = evals.reduce((s, e) => s + e.clarityScore, 0) / Math.max(evals.length, 1)
  const avgDepth = evals.reduce((s, e) => s + e.technicalDepth, 0) / Math.max(evals.length, 1)

  const getGrade = (score: number) => {
    if (score >= 8) return { label: 'Excellent', variant: 'success' as const }
    if (score >= 6.5) return { label: 'Good', variant: 'warning' as const }
    if (score >= 5) return { label: 'Needs Work', variant: 'danger' as const }
    return { label: 'Struggling', variant: 'danger' as const }
  }

  const { label, variant } = getGrade(avgScore)

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="text-center py-8">
        <div className="flex justify-center mb-4">
          <ScoreRing
            score={avgScore * 10}
            size={140}
            strokeWidth={10}
            color={avgScore >= 8 ? '#10b981' : avgScore >= 6 ? '#f59e0b' : '#f43f5e'}
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy size={20} className="text-brand-amber" />
          <h2 className="text-xl font-bold text-white">Session Complete</h2>
        </div>
        <Badge variant={variant} size="md">{label}</Badge>
        <p className="text-sm text-slate-400 mt-3">
          Answered {evals.length} of {session.questions.length} questions
        </p>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-white">{avgScore.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Overall Score /10</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-white">{avgClarity.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Avg Clarity /10</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-white">{avgDepth.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Avg Depth /10</div>
        </Card>
      </div>

      {/* Per-question recap */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Question Recap</h3>
        <div className="space-y-3">
          {session.questions.map((q, i) => {
            const ev = session.evaluations[q.id]
            return (
              <div key={q.id} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg">
                <span className="text-xs text-slate-500 w-6 text-right shrink-0 mt-0.5">Q{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 truncate">{q.question}</p>
                  <p className="text-xs text-slate-500">{q.topic}</p>
                </div>
                {ev ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-sm font-bold ${
                      ev.overallScore >= 8 ? 'text-brand-green' :
                      ev.overallScore >= 6 ? 'text-brand-amber' : 'text-brand-rose'
                    }`}>
                      {ev.overallScore.toFixed(1)}
                    </span>
                    <CheckCircle size={14} className="text-brand-green" />
                  </div>
                ) : (
                  <XCircle size={14} className="text-slate-600 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={reset}>
          <RefreshCw size={14} />
          New Session
        </Button>
        <Button className="flex-1" onClick={() => navigate('/progress')}>
          View Progress
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  )
}
