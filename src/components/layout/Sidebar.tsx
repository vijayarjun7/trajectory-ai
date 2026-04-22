import {
  LayoutDashboard, Brain, Map, MessageSquare,
  Compass, TrendingUp, BarChart3, ChevronLeft, ChevronRight,
  Rocket, X,
} from 'lucide-react'
import { SidebarItem } from './SidebarItem'
import { useAppStore } from '@/store/useAppStore'
import { useCareerStore } from '@/store/useCareerStore'
import { ROLE_REGISTRY } from '@/data/roleRegistry'
import { clsx } from 'clsx'

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore()
  const { profile } = useCareerStore()

  const roleConfig = profile ? ROLE_REGISTRY[profile.targetRole] : null
  const interviewEnabled = roleConfig?.interview !== false

  return (
    <aside
      className={clsx(
        'flex flex-col bg-surface-card border-r border-surface-border',
        'transition-all duration-300 ease-in-out',
        // Mobile: fixed overlay that slides in/out
        'fixed inset-y-0 left-0 z-30 h-full',
        // Desktop: back to normal flex child
        'md:relative md:z-auto md:inset-auto',
        sidebarOpen
          ? 'w-64 md:w-60 translate-x-0'
          : 'w-64 md:w-16 -translate-x-full md:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className={clsx(
        'flex items-center h-16 px-4 border-b border-surface-border shrink-0',
        !sidebarOpen && 'md:justify-center md:px-0'
      )}>
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <div className="shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Rocket size={16} className="text-white" />
          </div>
          {(sidebarOpen) && (
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white leading-tight whitespace-nowrap">Trajectory</div>
              <div className="text-xs text-accent-light leading-tight whitespace-nowrap">AI Career System</div>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-surface-elevated transition-colors shrink-0"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <SidebarItem to="/"           icon={LayoutDashboard} label="Dashboard"           collapsed={!sidebarOpen} />
        <SidebarItem to="/analysis"   icon={Brain}           label="Career Analysis"     collapsed={!sidebarOpen} />
        <SidebarItem to="/roadmap"    icon={Map}             label="Roadmap"             collapsed={!sidebarOpen} />
        <SidebarItem to="/interview"  icon={MessageSquare}   label="Interview Coach"     collapsed={!sidebarOpen} disabled={!interviewEnabled} />
        <SidebarItem to="/transition" icon={Compass}         label="Transition Strategy" collapsed={!sidebarOpen} />
        <SidebarItem to="/industry"   icon={TrendingUp}      label="Industry Shift"      collapsed={!sidebarOpen} />
        <SidebarItem to="/progress"   icon={BarChart3}       label="Progress"            collapsed={!sidebarOpen} />
      </nav>

      {/* Collapse toggle — desktop only */}
      <div className="p-3 border-t border-surface-border hidden md:block">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-white hover:bg-surface-elevated transition-colors"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </aside>
  )
}
