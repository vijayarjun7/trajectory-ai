import type { Difficulty } from '@/types'
import { Badge } from '@/components/ui/Badge'

const map: Record<Difficulty, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
  beginner:     { variant: 'success', label: 'Beginner' },
  intermediate: { variant: 'warning', label: 'Intermediate' },
  advanced:     { variant: 'danger',  label: 'Advanced' },
}

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  const { variant, label } = map[difficulty]
  return <Badge variant={variant}>{label}</Badge>
}
