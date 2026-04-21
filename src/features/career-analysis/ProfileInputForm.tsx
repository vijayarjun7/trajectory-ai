import { useState } from 'react'
import { useCareerStore } from '@/store/useCareerStore'
import { useAppStore } from '@/store/useAppStore'
import { ROLE_REGISTRY } from '@/data/roleRegistry'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { CareerProfile } from '@/types'

interface Props {
  onSubmit: () => void
}

export function ProfileInputForm({ onSubmit }: Props) {
  const { profile, setProfile } = useCareerStore()
  const { setIsCustomProfile, setActiveFlowId } = useAppStore()
  const roles = Object.keys(ROLE_REGISTRY)

  const [form, setForm] = useState({
    currentRole: profile?.currentRole ?? '',
    targetRole: profile?.targetRole ?? '',
    yearsExperience: profile?.yearsExperience ?? 2,
    availableHoursPerWeek: profile?.availableHoursPerWeek ?? 10,
    targetTimelineMonths: profile?.targetTimelineMonths ?? 6,
    goal: profile?.goal ?? '',
    resumeSummary: profile?.resumeSummary ?? '',
    currentSkillsStr: profile?.currentSkills.join(', ') ?? '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const p: CareerProfile = {
      id: `profile-${Date.now()}`,
      currentRole: form.currentRole,
      targetRole: form.targetRole,
      yearsExperience: form.yearsExperience,
      availableHoursPerWeek: form.availableHoursPerWeek,
      targetTimelineMonths: form.targetTimelineMonths,
      goal: form.goal,
      resumeSummary: form.resumeSummary || undefined,
      currentSkills: form.currentSkillsStr.split(',').map(s => s.trim()).filter(Boolean),
      track: ROLE_REGISTRY[form.targetRole]?.track ?? 'engineering',
    }
    setProfile(p)
    setIsCustomProfile(true)
    setActiveFlowId(null)
    onSubmit()
  }

  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">Your Career Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Current Role</label>
            <select
              value={form.currentRole}
              onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
              required
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
            >
              <option value="">Select current role…</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Role</label>
            <select
              value={form.targetRole}
              onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
              required
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
            >
              <option value="">Select target role…</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Years of Experience</label>
            <input
              type="number"
              min={0} max={30}
              value={form.yearsExperience}
              onChange={(e) => setForm({ ...form, yearsExperience: parseInt(e.target.value) || 0 })}
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Hours/week available</label>
            <input
              type="number"
              min={1} max={60}
              value={form.availableHoursPerWeek}
              onChange={(e) => setForm({ ...form, availableHoursPerWeek: parseInt(e.target.value) || 5 })}
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Target timeline (months)</label>
            <input
              type="number"
              min={1} max={24}
              value={form.targetTimelineMonths}
              onChange={(e) => setForm({ ...form, targetTimelineMonths: parseInt(e.target.value) || 6 })}
              className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Current Skills <span className="text-slate-600">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={form.currentSkillsStr}
            onChange={(e) => setForm({ ...form, currentSkillsStr: e.target.value })}
            placeholder="e.g. Python, Docker, Jenkins, SQL"
            className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Goal</label>
          <input
            type="text"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            required
            placeholder="e.g. Transition from QA into DevOps with focus on Kubernetes"
            className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Resume Summary <span className="text-slate-600">(optional — improves analysis accuracy)</span>
          </label>
          <textarea
            value={form.resumeSummary}
            onChange={(e) => setForm({ ...form, resumeSummary: e.target.value })}
            rows={4}
            placeholder="Paste a brief summary of your experience and key skills…"
            className="w-full bg-surface-elevated border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent placeholder:text-slate-600 resize-none"
          />
        </div>

        <Button type="submit" className="w-full">
          Run Career Analysis
        </Button>
      </form>
    </Card>
  )
}
