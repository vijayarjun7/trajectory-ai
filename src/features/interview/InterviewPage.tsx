import { useInterviewStore } from '@/store/useInterviewStore'
import { useCareerStore } from '@/store/useCareerStore'
import { ROLE_REGISTRY } from '@/data/roleRegistry'
import { InterviewSetup } from './InterviewSetup'
import { InterviewSession } from './InterviewSession'
import { SessionSummary } from './SessionSummary'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function InterviewPage() {
  const { session, reset } = useInterviewStore()
  const { profile } = useCareerStore()
  const navigate = useNavigate()

  if (!profile) {
    return (
      <EmptyState
        icon={<MessageSquare size={32} />}
        title="No profile loaded"
        description="Load a demo flow or complete your career profile to access interview coaching."
        action={{ label: 'Get Started', onClick: () => navigate('/') }}
      />
    )
  }

  const roleConfig = ROLE_REGISTRY[profile.targetRole]
  if (roleConfig?.interview === false) {
    return (
      <EmptyState
        icon={<MessageSquare size={32} />}
        title="Interview coaching not available"
        description={`Interview coaching is available for engineering roles. ${profile.targetRole} is a career path track with roadmap and strategy only.`}
      />
    )
  }

  const isCompleted = session?.completedAt !== undefined
  const isActive = session && !isCompleted

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Interview Coach"
          subtitle={`Practice interviews for ${profile.targetRole}`}
        />
        {(session) && (
          <Button variant="ghost" size="sm" onClick={reset}>
            ← New Session
          </Button>
        )}
      </div>

      {!session && <InterviewSetup />}
      {isActive && <InterviewSession />}
      {isCompleted && <SessionSummary />}
    </div>
  )
}
