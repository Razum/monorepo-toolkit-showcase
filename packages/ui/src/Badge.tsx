import type { CSSProperties, ReactNode } from 'react'
import type { UserRole } from '@repo/types'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** Maps shared domain roles to badge tones */
  role?: UserRole
}

const tones: Record<BadgeTone, CSSProperties> = {
  neutral: { background: '#f1f5f9', color: '#0f172a', borderColor: '#e2e8f0' },
  success: { background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' },
  warning: { background: '#fffbeb', color: '#92400e', borderColor: '#fde68a' },
  danger: { background: '#fef2f2', color: '#991b1b', borderColor: '#fecaca' },
}

function roleToTone(role: UserRole): BadgeTone {
  if (role === 'admin') return 'danger'
  if (role === 'member') return 'success'
  return 'neutral'
}

export function Badge({ children, tone = 'neutral', role }: BadgeProps) {
  const resolvedTone = role ? roleToTone(role) : tone
  const palette = tones[resolvedTone]
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.01em',
    ...palette,
  }
  return <span style={style}>{children}</span>
}
