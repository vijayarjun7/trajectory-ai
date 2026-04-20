import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  to: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
  disabled?: boolean
}

export function SidebarItem({ to, icon: Icon, label, collapsed, disabled }: SidebarItemProps) {
  if (disabled) {
    return (
      <div className={clsx(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-40 cursor-not-allowed',
        collapsed ? 'justify-center' : ''
      )}>
        <Icon size={18} className="shrink-0 text-slate-500" />
        {!collapsed && <span className="text-sm text-slate-500">{label}</span>}
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) => clsx(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
        collapsed ? 'justify-center' : '',
        isActive
          ? 'bg-accent-muted text-accent-light border border-accent/20'
          : 'text-slate-400 hover:text-white hover:bg-surface-elevated'
      )}
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={clsx('shrink-0', isActive ? 'text-accent-light' : 'group-hover:text-white')} />
          {!collapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </>
      )}
    </NavLink>
  )
}
