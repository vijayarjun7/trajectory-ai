import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-surface text-center">
      <div className="text-6xl font-bold text-surface-elevated mb-4">404</div>
      <h1 className="text-xl font-semibold text-white mb-2">Page not found</h1>
      <p className="text-sm text-slate-400 mb-6">The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
    </div>
  )
}
