import { useState } from 'react'
import type { InterviewQuestion, InterviewMode } from '@/types'
import { useInterviewStore } from '@/store/useInterviewStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DifficultyChip } from '@/components/shared/DifficultyChip'
import { VoiceControls } from './VoiceControls'
import { Lightbulb, Send, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface Props {
  question: InterviewQuestion
  questionNumber: number
  total: number
  interviewMode: InterviewMode
  hasEvaluation: boolean
}

export function QuestionPanel({ question, questionNumber, total, interviewMode, hasEvaluation }: Props) {
  const { submitAnswer, nextQuestion, setTranscript, isEvaluating } = useInterviewStore()
  const [textAnswer, setTextAnswer] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [voiceAnswer, setVoiceAnswer] = useState('')

  const answer = interviewMode === 'voice' ? voiceAnswer : textAnswer

  async function handleSubmit() {
    if (!answer.trim()) return
    await submitAnswer(answer)
  }

  function handleNext() {
    setTextAnswer('')
    setVoiceAnswer('')
    nextQuestion()
  }

  return (
    <Card className="space-y-4">
      {/* Question header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-slate-500">
          Question {questionNumber} of {total}
        </span>
        <div className="h-3 w-px bg-surface-border" />
        <Badge variant="default">{question.topic}</Badge>
        <DifficultyChip difficulty={question.difficulty} />
        <Badge variant={question.mode === 'technical' ? 'cyan' : question.mode === 'behavioral' ? 'amber' : 'purple'}>
          {question.mode}
        </Badge>
      </div>

      {/* Question text */}
      <div className="p-4 bg-surface-elevated rounded-xl border border-surface-border">
        <p className="text-base text-white leading-relaxed font-medium">{question.question}</p>
        <p className="text-xs text-slate-500 mt-2">Role context: {question.roleContext}</p>
      </div>

      {/* Hints */}
      {question.hints && question.hints.length > 0 && (
        <div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1.5 text-xs text-brand-amber hover:text-brand-amber/80 transition-colors"
          >
            <Lightbulb size={12} />
            {showHints ? 'Hide hints' : 'Show hints'}
          </button>
          {showHints && (
            <div className="mt-2 space-y-1">
              {question.hints.map((hint, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-brand-amber">•</span> {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Answer input */}
      {!hasEvaluation && (
        interviewMode === 'voice' ? (
          <VoiceControls
            questionText={question.question}
            onTranscriptChange={setVoiceAnswer}
          />
        ) : (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Answer</label>
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              rows={6}
              placeholder="Type your answer here… Be specific and use concrete examples."
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent placeholder:text-slate-600 resize-none"
            />
            <div className="text-xs text-slate-600 mt-1">
              {textAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
        )
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        {!hasEvaluation ? (
          <Button
            className="flex-1"
            loading={isEvaluating}
            disabled={!answer.trim() || isEvaluating}
            onClick={handleSubmit}
          >
            <Send size={14} />
            Submit Answer
          </Button>
        ) : (
          <Button
            className="flex-1"
            variant="secondary"
            onClick={handleNext}
          >
            Next Question
            <ChevronRight size={14} />
          </Button>
        )}
      </div>

      {hasEvaluation && (
        <div className="text-xs text-slate-500 text-center">
          Check the evaluation panel →
        </div>
      )}
    </Card>
  )
}
