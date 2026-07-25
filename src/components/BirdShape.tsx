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

  if (variant === 'colibri') {
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

  if (variant === 'buho') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <ellipse cx="100" cy="80" rx="42" ry="44" fill={color} />
        <circle cx="100" cy="42" r="30" fill={color} />
        <polygon points="76,22 70,2 92,14" fill={color} />
        <polygon points="124,22 130,2 108,14" fill={color} />
        <circle cx="88" cy="40" r="10" fill={color} opacity="0.45" />
        <circle cx="112" cy="40" r="10" fill={color} opacity="0.45" />
        <polygon points="100,48 94,58 106,58" fill={color} opacity="0.7" />
        <ellipse cx="72" cy="84" rx="12" ry="30" fill={color} opacity="0.55" />
        <ellipse cx="128" cy="84" rx="12" ry="30" fill={color} opacity="0.55" />
      </svg>
    );
  }

  if (variant === 'pato') {
    return (
      <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <ellipse cx="110" cy="90" rx="55" ry="26" fill={color} />
        <polygon points="148,76 180,56 162,90" fill={color} />
        <rect x="58" y="34" width="22" height="52" rx="11" fill={color} />
        <circle cx="69" cy="32" r="18" fill={color} />
        <polygon points="53,26 24,32 53,40" fill={color} opacity="0.7" />
        <ellipse cx="118" cy="92" rx="30" ry="14" fill={color} opacity="0.45" />
      </svg>
    );
  }

  // flamenco
  return (
    <svg width={width} height={height} viewBox="0 0 200 130" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
      <ellipse cx="115" cy="58" rx="34" ry="24" fill={color} />
      <path d="M86,52 Q60,46 58,26 Q58,10 74,10 Q88,10 88,24 L84,24 Q84,16 74,16 Q64,16 64,26 Q66,42 90,46 Z" fill={color} />
      <circle cx="80" cy="14" r="10" fill={color} />
      <polygon points="72,16 54,22 72,24" fill={color} opacity="0.7" />
      <line x1="112" y1="80" x2="112" y2="118" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <line x1="112" y1="118" x2="124" y2="122" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M104,50 Q128,40 142,52 Q128,66 106,62 Z" fill={color} opacity="0.55" />
    </svg>
  );
}
