import type { BirdVariant } from '../types';

interface Props {
  variant: BirdVariant;
  color: string;
  width: number;
}

export function BirdShape({ variant, color, width }: Props) {
  const height = (width * 130) / 200;

  if (variant === 'paloma') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <ellipse cx="95" cy="75" rx="55" ry="34" fill={color} />
        <circle cx="150" cy="52" r="24" fill={color} />
        <polygon points="172,50 192,44 172,60" fill={color} />
        <path d="M55,72 Q30,80 20,100 Q45,96 60,84 Z" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (variant === 'aguila') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <ellipse cx="100" cy="65" rx="26" ry="34" fill={color} />
        <circle cx="100" cy="30" r="18" fill={color} />
        <polygon points="118,26 140,32 118,40" fill={color} />
        <path d="M76,55 Q10,45 4,75 Q60,80 82,72 Z" fill={color} />
        <path d="M124,55 Q190,45 196,75 Q140,80 118,72 Z" fill={color} />
        <polygon points="88,96 100,120 112,96" fill={color} />
      </svg>
    );
  }

  // colibri
  return (
    <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
      <ellipse cx="105" cy="72" rx="26" ry="18" fill={color} />
      <circle cx="140" cy="58" r="13" fill={color} />
      <line x1="152" y1="56" x2="188" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M92,66 Q55,40 40,52 Q70,72 88,76 Z" fill={color} opacity="0.65" />
      <path d="M84,84 Q70,110 78,120 Q92,100 92,84 Z" fill={color} />
    </svg>
  );
}
