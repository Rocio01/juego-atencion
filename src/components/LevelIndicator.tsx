import type { Palette } from '../types';

interface Props {
  level: number;
  streak: number;
  palette: Palette;
}

const STREAK_THRESHOLD = 3;

export function LevelIndicator({ level, streak, palette }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontSize: 20, opacity: 0.75 }}>Nivel</span>
        <span style={{ fontSize: 36, fontWeight: 700, color: palette.primary, lineHeight: 1 }}>{level}</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
        {Array.from({ length: STREAK_THRESHOLD }, (_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: i < streak ? palette.primary : 'transparent',
              border: `2px solid ${palette.line}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
