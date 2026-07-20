import type { Palette, RoundConfig } from '../types';
import { TrafficSign } from './TrafficSign';

interface Props {
  round: RoundConfig;
  palette: Palette;
  onAnswer: (signId: string) => void;
}

export function SignQuestion({ round, palette, onAnswer }: Props) {
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
        ¿Qué señal viste?
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
          gap: 'clamp(12px,2.5vw,28px)',
          width: '100%',
          maxWidth: 640,
        }}
      >
        {round.signOptions.map((sign) => (
          <button
            key={sign.id}
            onClick={() => onAnswer(sign.id)}
            style={{
              minWidth: 0,
              minHeight: 130,
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
            <TrafficSign sign={sign} size={68} />
            <div style={{ fontSize: 'clamp(17px,1.8vw,20px)', fontWeight: 700, color: palette.text, textAlign: 'center' }}>
              {sign.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
