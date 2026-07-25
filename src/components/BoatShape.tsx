import type { BoatVariant } from '../types';

interface Props {
  variant: BoatVariant;
  color: string;
  width: number;
}

export function BoatShape({ variant, color, width }: Props) {
  const height = (width * 130) / 200;

  if (variant === 'velero') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points="30,100 170,100 145,120 55,120" fill={color} />
        <rect x="98" y="20" width="4" height="82" fill={color} />
        <polygon points="102,26 102,96 150,88" fill={color} opacity="0.85" />
        <polygon points="98,40 98,96 62,90" fill={color} opacity="0.55" />
      </svg>
    );
  }

  if (variant === 'lancha') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <path d="M20,96 L180,96 L158,118 L42,118 Z" fill={color} />
        <path d="M50,96 Q60,66 90,64 L150,64 Q166,64 172,80 L172,96 Z" fill={color} opacity="0.85" />
        <rect x="96" y="46" width="34" height="20" rx="4" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (variant === 'carga') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <path d="M14,98 L186,98 L168,116 L32,116 Z" fill={color} />
        <rect x="30" y="60" width="140" height="38" fill={color} />
        <rect x="42" y="68" width="26" height="20" fill={color} opacity="0.55" />
        <rect x="78" y="68" width="26" height="20" fill={color} opacity="0.55" />
        <rect x="114" y="68" width="26" height="20" fill={color} opacity="0.55" />
        <rect x="150" y="40" width="18" height="58" fill={color} />
      </svg>
    );
  }

  if (variant === 'canoa') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <path d="M16,86 Q100,116 184,86 Q170,112 100,112 Q30,112 16,86 Z" fill={color} />
        <path d="M16,86 Q100,104 184,86 Q100,98 16,86 Z" fill={color} opacity="0.5" />
        <line x1="80" y1="40" x2="128" y2="100" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="74" cy="34" rx="10" ry="14" fill={color} transform="rotate(-40 74 34)" />
      </svg>
    );
  }

  if (variant === 'pesquero') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <path d="M22,92 L178,92 L160,116 L40,116 Z" fill={color} />
        <rect x="48" y="62" width="52" height="30" rx="4" fill={color} opacity="0.85" />
        <rect x="56" y="68" width="16" height="12" fill={color} opacity="0.5" />
        <line x1="130" y1="90" x2="130" y2="34" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <line x1="130" y1="38" x2="170" y2="62" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <line x1="170" y1="62" x2="170" y2="88" stroke={color} strokeWidth="2.5" />
      </svg>
    );
  }

  // crucero
  return (
    <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
      <path d="M10,90 L190,90 L164,118 L36,118 Z" fill={color} />
      <rect x="30" y="64" width="150" height="26" fill={color} opacity="0.85" />
      <rect x="48" y="42" width="112" height="22" fill={color} opacity="0.7" />
      <rect x="86" y="24" width="24" height="18" rx="3" fill={color} />
      <circle cx="52" cy="77" r="4" fill={color} opacity="0.4" />
      <circle cx="76" cy="77" r="4" fill={color} opacity="0.4" />
      <circle cx="100" cy="77" r="4" fill={color} opacity="0.4" />
      <circle cx="124" cy="77" r="4" fill={color} opacity="0.4" />
      <circle cx="148" cy="77" r="4" fill={color} opacity="0.4" />
      <rect x="60" y="48" width="14" height="10" fill={color} opacity="0.4" />
      <rect x="86" y="48" width="14" height="10" fill={color} opacity="0.4" />
      <rect x="112" y="48" width="14" height="10" fill={color} opacity="0.4" />
      <rect x="138" y="48" width="14" height="10" fill={color} opacity="0.4" />
    </svg>
  );
}
