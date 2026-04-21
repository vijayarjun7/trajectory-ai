import { Rocket, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DEMO_FLOWS } from '@/data/roleRegistry'
import { useCareerStore } from '@/store/useCareerStore'
import { useAppStore } from '@/store/useAppStore'
import { useNavigate } from 'react-router-dom'

export function QuickStartPanel() {
  const { loadFlow } = useCareerStore()
  const { setActiveFlowId, setIsCustomProfile } = useAppStore()
  const navigate = useNavigate()

  function handleFlow(id: string) {
    setActiveFlowId(id)
    setIsCustomProfile(false)
    loadFlow(id)
    navigate('/analysis')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="mb-6 p-4 bg-accent-muted rounded-2xl">
        <Rocket size={40} className="text-accent" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">
        Welcome to Trajectory AI
      </h1>
      <p className="text-slate-400 max-w-lg mb-2">
        A career transition system that identifies skill gaps, generates structured roadmaps,
        and coaches you through targeted interviews.
      </p>
      <p className="text-sm text-slate-500 mb-8">
        Not a chatbot. A system designed to get you from{' '}
        <em>"I want to switch roles"</em> to{' '}
        <em>"I am ready for interviews."</em>
      </p>

      <div className="w-full max-w-xl">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
          Load a demo flow to get started
        </p>
        <div className="grid gap-3">
          {DEMO_FLOWS.map((flow) => (
            <Card
              key={flow.id}
              hoverable
              onClick={() => handleFlow(flow.id)}
              className="flex items-center justify-between p-4 text-left"
            >
              <div>
                <div className="font-semibold text-white">{flow.label}</div>
                <div className="text-sm text-slate-400 mt-0.5">
                  {flow.currentRole} → {flow.targetRole}
                </div>
              </div>
              <ChevronRight size={18} className="text-accent shrink-0" />
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-xs text-slate-500">or</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => navigate('/analysis')}
        >
          Enter your own profile
        </Button>
      </div>
    </div>
  )
}
