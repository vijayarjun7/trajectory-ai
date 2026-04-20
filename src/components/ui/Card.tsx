import { type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  hoverable?: boolean
  bordered?: boolean
}

export function Card({ elevated, hoverable, bordered = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl p-5',
        elevated ? 'bg-surface-elevated' : 'bg-surface-card',
        bordered && 'border border-surface-border',
        hoverable && 'cursor-pointer hover:border-accent/50 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
