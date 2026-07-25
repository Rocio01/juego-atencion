import type { Palette, RoundResult } from '../types';
import { AchievementBadge } from './AchievementBadge';

interface Props {
  result: RoundResult;
  palette: Palette;
  justUnlockedMilestone: number | null;
}

function feedbackMessage(result: RoundResult): string {
  if (result.fullyCorrect) return '¡Muy bien!';
  const correctCount = [result.objectCorrect, result.signCorrect, result.sectorCorrect].filter(Boolean).length;
  if (correctCount > 0) return '¡Casi! Te faltó poco.';
  return 'Esta vez no salió. ¡Seguí así!';
}

function AnswerChip({ label, correct, palette }: { label: string; correct: boolean; palette: Palette }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: correct ? palette.good : palette.warn,
        color: palette.primaryText,
        borderRadius: 16,
        padding: '10px 18px',
        fontSize: 'clamp(18px,2vw,22px)',
        fontWeight: 700,
      }}
    >
      <span aria-hidden="true">{correct ? '✓' : '✗'}</span>
      {label}
    </div>
  );
}

export function Feedback({ result, palette, justUnlockedMilestone }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        className="anim-pop"
        style={{
          background: result.fullyCorrect ? palette.good : palette.warn,
          color: palette.primaryText,
          padding: 'clamp(36px,5vw,56px) clamp(48px,7vw,80px)',
          borderRadius: 32,
          fontSize: 'clamp(32px,4.5vw,48px)',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {feedbackMessage(result)}
      </div>

      {!result.fullyCorrect && (
        <div
          className="anim-fade-up"
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <AnswerChip label="Objeto" correct={result.objectCorrect} palette={palette} />
          <AnswerChip label="Señal" correct={result.signCorrect} palette={palette} />
          <AnswerChip label="Sector" correct={result.sectorCorrect} palette={palette} />
        </div>
      )}

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
