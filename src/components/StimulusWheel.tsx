import type { GamePhase, Palette, RoundConfig } from '../types';
import { SECTOR_CENTERS } from '../data/sectors';
import { TrafficSign } from './TrafficSign';
import { CentralObjectShape } from './CentralObjectShape';

interface Props {
  phase: GamePhase;
  round: RoundConfig;
  palette: Palette;
}

export function StimulusWheel({ phase, round, palette }: Props) {
  const showSigns = phase === 'estimulo';

  return (
    <div
      style={{
        position: 'relative',
        width: 'min(72vw, 66vh, 560px)',
        aspectRatio: '1',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `5px solid ${palette.line}`,
        }}
      />
      {[0, 60, 120].map((deg) => (
        <div
          key={deg}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 3,
            background: palette.line,
            opacity: 0.4,
            transform: `translateX(-50%) rotate(${deg}deg)`,
          }}
        />
      ))}

      {showSigns &&
        [round.target, ...round.distractors].map((placed) => {
          const pos = SECTOR_CENTERS[placed.sector];
          return (
            <div
              key={placed.sign.id + placed.sector}
              style={{
                position: 'absolute',
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                transform: 'translate(-50%, -50%)',
                width: 'min(64px, 19%)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div className="anim-pop" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <TrafficSign sign={placed.sign} size={64} />
              </div>
            </div>
          );
        })}

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(140px, 32%)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {phase === 'estimulo' && (
          <div className="anim-pop" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CentralObjectShape object={round.central} palette={palette} width={140} />
          </div>
        )}
      </div>
    </div>
  );
}
