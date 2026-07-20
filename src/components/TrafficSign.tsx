import type { SignDef } from '../types';
import { SIGN_COLORS } from '../palettes';

interface Props {
  sign: SignDef;
  size: number;
}

const OCTAGON_POINTS = '35,6 65,6 94,35 94,65 65,94 35,94 6,65 6,35';
const TRIANGLE_UP_POINTS = '50,8 92,88 8,88';
const TRIANGLE_DOWN_POINTS = '8,12 92,12 50,92';
const DIAMOND_POINTS = '50,6 94,50 50,94 6,50';

function WalkingPersonIcon() {
  return (
    <g stroke={SIGN_COLORS.dark} strokeWidth="4" strokeLinecap="round" fill="none">
      <circle cx="50" cy="46" r="6" fill={SIGN_COLORS.dark} stroke="none" />
      <path d="M50 53 L50 68 M50 68 L40 82 M50 68 L61 79 M50 59 L37 65 M50 59 L65 61" />
    </g>
  );
}

function CurveArrowIcon({ mirror }: { mirror: boolean }) {
  return (
    <g transform={mirror ? 'scale(-1,1) translate(-100,0)' : undefined}>
      <path
        d="M38,76 C38,54 46,42 60,36"
        stroke={SIGN_COLORS.dark}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="72,32 62,44 56,31" fill={SIGN_COLORS.dark} />
    </g>
  );
}

function RailroadIcon() {
  return (
    <g stroke={SIGN_COLORS.dark} strokeWidth="8" strokeLinecap="round">
      <line x1="33" y1="33" x2="67" y2="67" />
      <line x1="67" y1="33" x2="33" y2="67" />
    </g>
  );
}

export function TrafficSign({ sign, size }: Props) {
  const textStyle = { fontFamily: 'Atkinson Hyperlegible, sans-serif' };

  if (sign.shape === 'octagono') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-label={sign.label} style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points={OCTAGON_POINTS} fill={SIGN_COLORS.red} stroke={SIGN_COLORS.white} strokeWidth="4" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="20"
          fontWeight="700"
          fill={SIGN_COLORS.white}
          style={textStyle}
        >
          ALTO
        </text>
      </svg>
    );
  }

  if (sign.shape === 'triangulo') {
    const isCeda = sign.id === 'ceda-paso';
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-label={sign.label} style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon
          points={isCeda ? TRIANGLE_DOWN_POINTS : TRIANGLE_UP_POINTS}
          fill={isCeda ? SIGN_COLORS.white : SIGN_COLORS.yellow}
          stroke={SIGN_COLORS.red}
          strokeWidth={isCeda ? 8 : 5}
          strokeLinejoin="round"
        />
        {!isCeda && <WalkingPersonIcon />}
      </svg>
    );
  }

  if (sign.shape === 'circulo') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-label={sign.label} style={{ maxWidth: '100%', height: 'auto' }}>
        <circle cx="50" cy="50" r="44" fill={SIGN_COLORS.white} stroke={SIGN_COLORS.red} strokeWidth="9" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="32"
          fontWeight="700"
          fill={SIGN_COLORS.dark}
          style={textStyle}
        >
          {sign.speed}
        </text>
      </svg>
    );
  }

  // rombo
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={sign.label} style={{ maxWidth: '100%', height: 'auto' }}>
      <polygon points={DIAMOND_POINTS} fill={SIGN_COLORS.yellow} stroke={SIGN_COLORS.dark} strokeWidth="4" />
      {sign.icon === 'curva-derecha' && <CurveArrowIcon mirror={false} />}
      {sign.icon === 'curva-izquierda' && <CurveArrowIcon mirror={true} />}
      {sign.icon === 'ferrocarril' && <RailroadIcon />}
    </svg>
  );
}
