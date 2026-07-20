import type { VehicleVariant } from '../types';

interface Props {
  variant: VehicleVariant;
  color: string;
  windowColor: string;
  width: number;
}

function Wheels() {
  return (
    <>
      <circle cx="55" cy="90" r="14" fill="#2b2b2b" />
      <circle cx="145" cy="90" r="14" fill="#2b2b2b" />
    </>
  );
}

function Chassis({ color }: { color: string }) {
  return <rect x="14" y="62" width="172" height="20" rx="10" fill={color} />;
}

export function VehicleShape({ variant, color, windowColor, width }: Props) {
  const height = (width * 110) / 200;

  return (
    <svg width={width} height={height} viewBox="0 0 200 110" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
      <Chassis color={color} />

      {variant === 'sedan' && (
        <>
          <path d="M50,62 L62,34 Q100,22 138,34 L150,62 Z" fill={color} />
          <path d="M68,58 L76,40 Q100,32 124,40 L132,58 Z" fill={windowColor} />
        </>
      )}

      {variant === 'deportivo' && (
        <>
          <path d="M46,62 L86,38 Q104,30 122,38 L168,62 Z" fill={color} />
          <path d="M96,55 L102,42 Q108,38 116,42 L124,55 Z" fill={windowColor} />
          <rect x="158" y="42" width="18" height="4" rx="2" fill={color} />
          <rect x="164" y="46" width="4" height="14" fill={color} />
        </>
      )}

      {variant === 'camioneta' && (
        <>
          <rect x="42" y="26" width="120" height="36" rx="8" fill={color} />
          <rect x="52" y="34" width="100" height="16" rx="3" fill={windowColor} />
        </>
      )}

      {variant === 'pickup' && (
        <>
          <path d="M40,62 L48,32 L88,32 L96,62 Z" fill={color} />
          <rect x="52" y="38" width="34" height="18" rx="3" fill={windowColor} />
          <path d="M100,62 L100,46 L178,46 L178,62 Z" fill={color} />
          <rect x="104" y="50" width="70" height="4" fill={windowColor} opacity="0.5" />
        </>
      )}

      {variant === 'camion' && (
        <>
          <rect x="26" y="34" width="34" height="28" rx="4" fill={color} />
          <rect x="32" y="40" width="20" height="12" rx="2" fill={windowColor} />
          <rect x="70" y="18" width="100" height="44" rx="3" fill={color} />
        </>
      )}

      {variant === 'furgoneta' && (
        <>
          <rect x="20" y="24" width="150" height="38" rx="10" fill={color} />
          <rect x="26" y="32" width="20" height="20" rx="3" fill={windowColor} />
          <rect x="56" y="32" width="100" height="16" rx="3" fill={windowColor} />
        </>
      )}

      <Wheels />
    </svg>
  );
}
