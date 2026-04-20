import type { TopicRecommendation } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, ExternalLink } from 'lucide-react'

export function TopicsToStudy({ topics }: { topics: TopicRecommendation[] }) {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  const sorted = [...topics].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={16} className="text-accent" />
        <h3 className="font-semibold text-white">Recommended Study Topics</h3>
      </div>
      <div className="space-y-3">
        {sorted.map((topic, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg">
            <div className="text-sm font-medium text-slate-400 w-6 text-right shrink-0 mt-0.5">
              {i + 1}.
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-white">{topic.topic}</span>
                <Badge
                  variant={
                    topic.priority === 'high' ? 'danger' :
                    topic.priority === 'medium' ? 'warning' : 'default'
                  }
                >
                  {topic.priority}
                </Badge>
              </div>
              {topic.resources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {topic.resources.map((r, j) => (
                    <span key={j} className="flex items-center gap-1 text-xs text-slate-500">
                      <ExternalLink size={10} />
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
