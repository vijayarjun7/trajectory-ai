import type { InterviewEvaluation } from '@/types'
import { Card } from '@/components/ui/Card'
import { ScoreBreakdown } from './ScoreBreakdown'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { useInterviewStore } from '@/store/useInterviewStore'
import { CheckCircle, XCircle, AlertCircle, Lightbulb, MessageSquare } from 'lucide-react'
import { useState } from 'react'

interface Props {
  evaluation?: InterviewEvaluation
}

export function EvaluationPanel({ evaluation }: Props) {
  const { isEvaluating } = useInterviewStore()
  const [showBetterAnswer, setShowBetterAnswer] = useState(false)

  if (isEvaluating) {
    return (
      <Card className="space-y-4">
        <Skeleton className="h-5 w-2/3" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          ))}
        </div>
        <SkeletonText lines={3} />
      </Card>
    )
  }

  if (!evaluation) {
    return (
      <Card className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare size={32} className="text-surface-border mb-3" />
        <p className="text-sm text-slate-500">Submit your answer to see the evaluation here.</p>
      </Card>
    )
  }

  return (
    <Card className="space-y-5">
      <ScoreBreakdown evaluation={evaluation} />

      <div className="border-t border-surface-border pt-4 space-y-4">
        {/* Strengths */}
        {evaluation.strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle size={13} className="text-brand-green" />
              <span className="text-xs font-semibold text-brand-green">Strengths</span>
            </div>
            <ul className="space-y-1">
              {evaluation.strengths.map((s, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-brand-green mt-0.5 shrink-0">+</span>{s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {evaluation.weaknesses.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <XCircle size={13} className="text-brand-rose" />
              <span className="text-xs font-semibold text-brand-rose">Weaknesses</span>
            </div>
            <ul className="space-y-1">
              {evaluation.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-brand-rose mt-0.5 shrink-0">−</span>{w}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missed Points */}
        {evaluation.missedPoints.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle size={13} className="text-brand-amber" />
              <span className="text-xs font-semibold text-brand-amber">Missed Points</span>
            </div>
            <ul className="space-y-1">
              {evaluation.missedPoints.map((m, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-brand-amber mt-0.5 shrink-0">○</span>{m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendation */}
        <div className="p-3 bg-surface-elevated rounded-lg">
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb size={12} className="text-accent-light" />
            <span className="text-xs font-semibold text-accent-light">Recommendation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{evaluation.recommendation}</p>
        </div>

        {/* Better Answer */}
        <div>
          <button
            onClick={() => setShowBetterAnswer(!showBetterAnswer)}
            className="text-xs text-accent-light hover:underline flex items-center gap-1"
          >
            {showBetterAnswer ? '▼' : '▶'} View a stronger answer
          </button>
          {showBetterAnswer && (
            <div className="mt-2 p-3 bg-brand-green/5 border border-brand-green/20 rounded-lg">
              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.betterAnswer}</p>
            </div>
          )}
        </div>

        {/* Follow-up questions */}
        {evaluation.followUpQuestions.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2">Likely Follow-ups</div>
            <div className="space-y-1">
              {evaluation.followUpQuestions.map((q, i) => (
                <div key={i} className="text-xs text-slate-500 flex items-start gap-2">
                  <span className="text-slate-600 shrink-0">Q:</span>{q}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
