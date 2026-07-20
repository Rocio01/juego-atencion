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

  // carga (barco de carga)
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
