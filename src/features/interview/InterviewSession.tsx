import { useInterviewStore } from '@/store/useInterviewStore'
import { QuestionPanel } from './QuestionPanel'
import { EvaluationPanel } from './EvaluationPanel'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function InterviewSession() {
  const { session } = useInterviewStore()
  if (!session) return null

  const { questions, currentIndex, evaluations } = session
  const currentQuestion = questions[currentIndex]
  const currentEval = currentQuestion ? evaluations[currentQuestion.id] : undefined
  const answered = Object.keys(evaluations).length
  const progress = Math.round((answered / questions.length) * 100)

  return (
    <div className="space-y-4">
      {/* Session header */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={answered} max={questions.length} showLabel size="md" />
        </div>
        <Badge variant="info">{answered} / {questions.length} answered</Badge>
        <Badge variant={session.config.interviewMode === 'voice' ? 'purple' : 'default'}>
          {session.config.interviewMode === 'voice' ? '🎤 Voice' : '✏️ Text'}
        </Badge>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-4 items-start">
        <QuestionPanel
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          total={questions.length}
          interviewMode={session.config.interviewMode}
          hasEvaluation={!!currentEval}
        />
        <EvaluationPanel evaluation={currentEval} />
      </div>
    </div>
  )
}
