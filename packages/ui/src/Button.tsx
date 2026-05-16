import type { ButtonHTMLAttributes, CSSProperties } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  fontWeight: 600,
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  cursor: 'pointer',
  transition: 'background 120ms ease, border-color 120ms ease, transform 80ms ease',
}

const variants: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'linear-gradient(180deg, #2563eb, #1d4ed8)',
    borderColor: '#1e40af',
    color: '#f8fafc',
    boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
  },
  secondary: {
    background: '#f8fafc',
    borderColor: '#e2e8f0',
    color: '#0f172a',
  },
  ghost: {
    background: 'transparent',
    borderColor: 'transparent',
    color: '#334155',
  },
}

const sizes: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '6px 10px', fontSize: 13, lineHeight: '18px' },
  md: { padding: '10px 14px', fontSize: 14, lineHeight: '20px' },
  lg: { padding: '12px 16px', fontSize: 15, lineHeight: '22px' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  style,
  disabled,
  ...props
}: ButtonProps) {
  const v = variants[variant]
  const s = sizes[size]
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        ...base,
        ...v,
        ...s,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    />
  )
}
