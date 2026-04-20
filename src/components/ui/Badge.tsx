import { type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'cyan' | 'amber'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

export function Badge({ variant = 'default', size = 'sm', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-medium rounded-full',
        {
          'sm': 'px-2 py-0.5 text-xs',
          'md': 'px-3 py-1 text-sm',
        }[size],
        {
          default: 'bg-surface-elevated text-slate-400 border border-surface-border',
          success: 'bg-brand-green/15 text-brand-green',
          warning: 'bg-brand-amber/15 text-brand-amber',
          danger: 'bg-brand-rose/15 text-brand-rose',
          info: 'bg-accent-muted text-accent-light',
          purple: 'bg-brand-violet/15 text-brand-violet',
          cyan: 'bg-brand-cyan/15 text-brand-cyan',
          amber: 'bg-brand-amber/15 text-brand-amber',
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
