import type { Palette } from '../types';
import { AchievementBadge } from './AchievementBadge';

interface Props {
  correct: boolean;
  palette: Palette;
  justUnlockedMilestone: number | null;
}

export function Feedback({ correct, palette, justUnlockedMilestone }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        className="anim-pop"
        style={{
          background: correct ? palette.good : palette.warn,
          color: palette.primaryText,
          padding: 'clamp(36px,5vw,56px) clamp(48px,7vw,80px)',
          borderRadius: 32,
          fontSize: 'clamp(32px,4.5vw,48px)',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {correct ? '¡Muy bien!' : 'Casi, ¡seguí así!'}
      </div>

      {justUnlockedMilestone !== null && (
        <div
          className="anim-fade-up anim-delay"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: palette.bg2,
            borderRadius: 24,
            padding: '14px 24px',
          }}
        >
          <AchievementBadge level={justUnlockedMilestone} palette={palette} size={52} />
          <div style={{ fontSize: 22, fontWeight: 700, color: palette.text, textAlign: 'left' }}>
            ¡Nueva medalla!
            <br />
            Llegaste al nivel {justUnlockedMilestone}
          </div>
        </div>
      )}
    </div>
  );
}
