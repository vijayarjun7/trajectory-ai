import type { TrackType } from '@/types'

export interface RoleConfig {
  track: TrackType
  interview: boolean
  label: string
  color: string
}

export const ROLE_REGISTRY: Record<string, RoleConfig> = {
  'QE/SDET':              { track: 'engineering', interview: true,  label: 'QE / SDET',           color: 'cyan' },
  'Backend Engineer':     { track: 'engineering', interview: true,  label: 'Backend Engineer',     color: 'violet' },
  'Frontend Engineer':    { track: 'engineering', interview: true,  label: 'Frontend Engineer',    color: 'blue' },
  'Full Stack Engineer':  { track: 'engineering', interview: true,  label: 'Full Stack Engineer',  color: 'indigo' },
  'DevOps Engineer':      { track: 'engineering', interview: true,  label: 'DevOps Engineer',      color: 'emerald' },
  'SRE':                  { track: 'engineering', interview: true,  label: 'SRE',                  color: 'green' },
  'Cloud Engineer':       { track: 'engineering', interview: true,  label: 'Cloud Engineer',       color: 'sky' },
  'Platform Engineer':    { track: 'engineering', interview: true,  label: 'Platform Engineer',    color: 'teal' },
  'Engineering Manager':  { track: 'engineering', interview: true,  label: 'Engineering Manager',  color: 'amber' },
  'AI/ML Engineer':       { track: 'engineering', interview: true,  label: 'AI / ML Engineer',     color: 'purple' },
  'Data Scientist':       { track: 'engineering', interview: true,  label: 'Data Scientist',       color: 'pink' },
  'Prompt Engineer':      { track: 'engineering', interview: true,  label: 'Prompt Engineer',      color: 'rose' },
  'Content Writer':       { track: 'engineering', interview: true,  label: 'Content Writer',       color: 'orange' },
  'Solopreneur':          { track: 'career-path', interview: false, label: 'Solopreneur',          color: 'yellow' },
  'Startup Founder':      { track: 'career-path', interview: false, label: 'Startup Founder',      color: 'lime' },
}

export const DEMO_FLOWS = [
  { id: 'qe-devops',        label: 'QE → DevOps Engineer',  currentRole: 'QE/SDET',           targetRole: 'DevOps Engineer' },
  { id: 'backend-aiml',     label: 'Backend → AI/ML Eng',   currentRole: 'Backend Engineer',  targetRole: 'AI/ML Engineer' },
  { id: 'prompt-engineer',  label: 'Content → Prompt Eng',  currentRole: 'Content Writer',    targetRole: 'Prompt Engineer' },
]
