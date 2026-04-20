import type { InterviewEvaluation } from '@/types'
import { clsx } from 'clsx'

const DIMENSIONS = [
  { key: 'clarityScore',    label: 'Clarity' },
  { key: 'technicalDepth', label: 'Technical Depth' },
  { key: 'relevance',       label: 'Relevance' },
  { key: 'completeness',   label: 'Completeness' },
  { key: 'confidence',     label: 'Confidence' },
] as const

function getScoreColor(score: number): string {
  if (score >= 8) return 'bg-brand-green'
  if (score >= 6) return 'bg-brand-amber'
  return 'bg-brand-rose'
}

function getScoreTextColor(score: number): string {
  if (score >= 8) return 'text-brand-green'
  if (score >= 6) return 'text-brand-amber'
  return 'text-brand-rose'
}

export function ScoreBreakdown({ evaluation }: { evaluation: InterviewEvaluation }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-white">Score Breakdown</span>
        <span className={clsx('text-2xl font-bold', getScoreTextColor(evaluation.overallScore))}>
          {evaluation.overallScore.toFixed(1)}
          <span className="text-sm text-slate-500 font-normal">/10</span>
        </span>
      </div>
      {DIMENSIONS.map(({ key, label }) => {
        const score = evaluation[key] as number
        return (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{label}</span>
              <span className={getScoreTextColor(score)}>{score}/10</span>
            </div>
            <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className={clsx('h-full rounded-full transition-all duration-700', getScoreColor(score))}
                style={{ width: `${(score / 10) * 100}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
