import type { BirdVariant, BoatVariant, ObjectVariant, Palette, RoundConfig, VehicleVariant } from '../types';
import { CATEGORY_QUESTION } from '../data/objects';
import { VehicleShape } from './VehicleShape';
import { BirdShape } from './BirdShape';
import { BoatShape } from './BoatShape';

interface Props {
  round: RoundConfig;
  palette: Palette;
  onAnswer: (variant: ObjectVariant) => void;
}

export function ObjectQuestion({ round, palette, onAnswer }: Props) {
  const category = round.central.def.category;
  const options = round.objectOptions;

  return (
    <div
      className="anim-fade-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(24px,4vh,40px)',
        width: '100%',
      }}
    >
      <div style={{ fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 700, textAlign: 'center' }}>
        {CATEGORY_QUESTION[category]}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
          gap: 'clamp(12px,2.5vw,28px)',
          width: '100%',
          maxWidth: 700,
        }}
      >
        {options.map((opt) => (
          <button
            key={opt.variant}
            onClick={() => onAnswer(opt.variant)}
            style={{
              minWidth: 0,
              minHeight: 120,
              borderRadius: 24,
              border: '4px solid transparent',
              background: palette.bg2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
              fontFamily: 'inherit',
            }}
          >
            {category === 'vehiculo' && (
              <VehicleShape
                variant={opt.variant as VehicleVariant}
                color={palette.text}
                windowColor={palette.bg2}
                width={110}
              />
            )}
            {category === 'pajaro' && (
              <BirdShape variant={opt.variant as BirdVariant} color={palette.text} width={90} />
            )}
            {category === 'barco' && (
              <BoatShape variant={opt.variant as BoatVariant} color={palette.text} width={90} />
            )}
            <div style={{ fontSize: 'clamp(20px,2.2vw,24px)', fontWeight: 700, color: palette.text }}>
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
