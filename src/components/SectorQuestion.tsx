import type { Palette } from '../types';
import { SECTOR_CLIPS } from '../data/sectors';

interface Props {
  palette: Palette;
  onAnswer: (sector: number) => void;
}

export function SectorQuestion({ palette, onAnswer }: Props) {
  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px,4vh,40px)' }}>
      <div style={{ fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 700, textAlign: 'center' }}>
        ¿En qué sector apareció la señal?
      </div>
      <div style={{ position: 'relative', width: 'min(70vw,60vh,480px)', aspectRatio: '1' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `5px solid ${palette.line}`,
            background: palette.bg2,
          }}
        />
        {SECTOR_CLIPS.map((clip, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            aria-label={`Sector ${i + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              clipPath: clip,
            }}
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
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
              transform: `translateX(-50%) rotate(${deg}deg)`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
