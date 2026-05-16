import type { CSSProperties, ReactNode } from 'react';

export type CardProps = {
  title?: string;
  /** Optional footer slot (actions, meta, etc.) */
  footer?: ReactNode;
  children?: ReactNode;
};

const shell: CSSProperties = {
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
  overflow: 'hidden',
};

const header: CSSProperties = {
  padding: '14px 16px',
  borderBottom: '1px solid #f1f5f9',
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: '#0f172a',
};

const body: CSSProperties = {
  padding: 16,
  color: '#334155',
  fontSize: 14,
  lineHeight: 1.55,
};

const foot: CSSProperties = {
  padding: '12px 16px',
  borderTop: '1px solid #f1f5f9',
  background: '#f8fafc',
};

export function Card({ title, footer, children }: CardProps) {
  return (
    <section style={shell}>
      {title ? <header style={header}>{title}</header> : null}
      <div style={body}>{children}</div>
      {footer ? <footer style={foot}>{footer}</footer> : null}
    </section>
  );
}
