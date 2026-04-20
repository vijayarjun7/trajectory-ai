import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { CareerAnalysisPage } from '@/features/career-analysis/CareerAnalysisPage'
import { RoadmapPage } from '@/features/roadmap/RoadmapPage'
import { InterviewPage } from '@/features/interview/InterviewPage'
import { TransitionPage } from '@/features/transition/TransitionPage'
import { IndustryShiftPage } from '@/features/industry-shift/IndustryShiftPage'
import { ProgressPage } from '@/features/progress/ProgressPage'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="analysis" element={<CareerAnalysisPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="interview" element={<InterviewPage />} />
          <Route path="transition" element={<TransitionPage />} />
          <Route path="industry" element={<IndustryShiftPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
