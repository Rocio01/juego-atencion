import type { CSSProperties, ReactNode } from 'react';
import type { Palette } from '../types';

interface Props {
  onClick: () => void;
  children: ReactNode;
  palette: Palette;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  style?: CSSProperties;
}

export function TouchButton({ onClick, children, palette, variant = 'primary', fullWidth, style }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: 200,
        minHeight: 72,
        height: 'clamp(72px, 9vh, 88px)',
        padding: '0 clamp(24px,3vw,36px)',
        borderRadius: 22,
        border: isPrimary ? 'none' : `4px solid ${palette.line}`,
        background: isPrimary ? palette.primary : 'transparent',
        color: isPrimary ? palette.primaryText : palette.text,
        fontSize: 'clamp(22px, 2.6vw, 28px)',
        fontWeight: 700,
        cursor: 'pointer',
        width: fullWidth ? '100%' : undefined,
        boxShadow: isPrimary ? '0 6px 0 rgba(0,0,0,0.16)' : 'none',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
