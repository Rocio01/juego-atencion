import type { GeoShapeKind, Palette } from '../types';

interface Props {
  shape: GeoShapeKind;
  palette: Palette;
  size: number;
}

const SQUARE_POINTS = '15,15 85,15 85,85 15,85';
const HEXAGON_POINTS = '50,4 91,27 91,73 50,96 9,73 9,27';
const PENTAGON_POINTS = '50,4 95,38 78,92 22,92 5,38';

function starPoints(): string {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const r = i % 2 === 0 ? 46 : 20;
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
    })
    .join(' ');
}

// Formas neutras sin ningún parecido a una señal de tránsito real: sin
// rojo/amarillo/blanco, sin íconos ni texto. Sirven como ruido visual que
// compite por atención, nunca por identidad con la señal objetivo.
// El relleno usa el tono medio de la paleta (line): con exposiciones de
// 800ms un relleno casi igual al fondo pasaba desapercibido y no distraía.
export function GeoDistractor({ shape, palette, size }: Props) {
  const fill = palette.line;
  const stroke = palette.text;

  if (shape === 'cuadrado') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points={SQUARE_POINTS} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shape === 'hexagono') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points={HEXAGON_POINTS} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shape === 'pentagono') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points={PENTAGON_POINTS} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shape === 'estrella') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
        <polygon points={starPoints()} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  // cruz
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
      <polygon
        points="35,6 65,6 65,35 94,35 94,65 65,65 65,94 35,94 35,65 6,65 6,35 35,35"
        fill={fill}
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
