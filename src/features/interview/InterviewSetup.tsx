import { useState } from 'react'
import { useCareerStore } from '@/store/useCareerStore'
import { useInterviewStore } from '@/store/useInterviewStore'
import { getAdapter } from '@/lib/adapterFactory'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import type { Difficulty, QuestionMode, QuestionSource, InterviewMode } from '@/types'
import { Mic, FileText } from 'lucide-react'

export function InterviewSetup() {
  const { profile, analysis } = useCareerStore()
  const { startSession } = useInterviewStore()
  const [loading, setLoading] = useState(false)

  const [source, setSource] = useState<QuestionSource>('target-role')
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate')
  const [questionMode, setQuestionMode] = useState<QuestionMode>('technical')
  const [interviewMode, setInterviewMode] = useState<InterviewMode>('text')
  const [customTopic, setCustomTopic] = useState('')
  const [questionCount, setQuestionCount] = useState(5)

  const sourceTopics: Record<QuestionSource, string> = {
    'resume': 'Based on your resume and current experience',
    'roadmap': 'Covering topics from your learning roadmap',
    'target-role': `Core ${profile?.targetRole ?? 'role'} interview topics`,
    'custom': 'Questions on a topic you specify',
  }

  const topicForConfig = source === 'custom' ? customTopic : sourceTopics[source]

  async function handleStart() {
    if (!profile) return
    if (source === 'custom' && !customTopic.trim()) return
    setLoading(true)
    const config = {
      profileId: profile.id,
      targetRole: profile.targetRole,
      topic: topicForConfig,
      source,
      difficulty,
      questionMode,
      interviewMode,
      questionCount,
    }
    const questions = await getAdapter().generateInterviewQuestions(config)
    startSession(config, questions.slice(0, questionCount))
    setLoading(false)
  }

  return (
    <Card className="max-w-2xl">
      <h3 className="font-semibold text-white mb-6">Configure Your Session</h3>

      <div className="space-y-6">
        {/* Source */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Question Source</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(sourceTopics) as [QuestionSource, string][]).map(([s, desc]) => (
              <button
                key={s}
                onClick={() => setSource(s)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  source === s
                    ? 'border-accent bg-accent-muted text-accent-light'
                    : 'border-surface-border bg-surface-elevated text-slate-400 hover:border-accent/40'
                }`}
              >
                <div className="text-xs font-semibold capitalize mb-1">{s.replace('-', ' ')}</div>
                <div className="text-xs opacity-75 leading-tight">{desc}</div>
              </button>
            ))}
          </div>
          {source === 'custom' && (
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. Docker networking, Kubernetes scheduling, RAG systems…"
              className="mt-2 w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent placeholder:text-slate-600"
            />
          )}
        </div>

        {/* Difficulty + Mode */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Difficulty</label>
            <Tabs
              tabs={[
                { id: 'beginner', label: 'Beginner' },
                { id: 'intermediate', label: 'Mid' },
                { id: 'advanced', label: 'Hard' },
              ]}
              activeId={difficulty}
              onChange={(id) => setDifficulty(id as Difficulty)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Question Type</label>
            <Tabs
              tabs={[
                { id: 'technical', label: 'Technical' },
                { id: 'behavioral', label: 'Behavioral' },
                { id: 'mixed', label: 'Mixed' },
              ]}
              activeId={questionMode}
              onChange={(id) => setQuestionMode(id as QuestionMode)}
            />
          </div>
        </div>

        {/* Question count */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Number of Questions: <span className="text-white font-bold">{questionCount}</span>
          </label>
          <input
            type="range" min={3} max={10} value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        {/* Interview mode */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Interview Mode</label>
          <div className="flex gap-3">
            <button
              onClick={() => setInterviewMode('text')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                interviewMode === 'text'
                  ? 'border-accent bg-accent-muted text-accent-light'
                  : 'border-surface-border text-slate-400 hover:border-accent/40'
              }`}
            >
              <FileText size={16} />
              <span className="text-sm font-medium">Text Mode</span>
            </button>
            <button
              onClick={() => setInterviewMode('voice')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                interviewMode === 'voice'
                  ? 'border-accent bg-accent-muted text-accent-light'
                  : 'border-surface-border text-slate-400 hover:border-accent/40'
              }`}
            >
              <Mic size={16} />
              <span className="text-sm font-medium">Voice Mode</span>
            </button>
          </div>
          {interviewMode === 'voice' && (
            <p className="text-xs text-slate-500 mt-2">
              Voice mode uses browser Speech APIs. Works best in Chrome or Edge.
              Text fallback is always available.
            </p>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          loading={loading}
          onClick={handleStart}
          disabled={source === 'custom' && !customTopic.trim()}
        >
          Start Session — {questionCount} Questions
        </Button>
      </div>
    </Card>
  )
}
