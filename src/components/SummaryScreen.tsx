import type { Palette, SessionSummary } from '../types';
import { TouchButton } from './TouchButton';

interface Props {
  summary: SessionSummary;
  palette: Palette;
  onPlayAgain: () => void;
  onExit: () => void;
}

function summaryMessage(accuracyPct: number): string {
  if (accuracyPct >= 70) return 'Lo hiciste muy bien. Tu atención está en gran forma.';
  if (accuracyPct >= 40) return 'Buen trabajo. Cada práctica ayuda a tu mente.';
  return 'Buen intento. Seguí practicando, vas a mejorar.';
}

export function SummaryScreen({ summary, palette, onPlayAgain, onExit }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(20px,4vh,36px)',
        padding: 'clamp(24px,5vw,48px)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 'clamp(32px,5vw,50px)', fontWeight: 700 }}>¡Sesión terminada!</div>
      <div style={{ fontSize: 'clamp(24px,3vw,30px)', maxWidth: 600, opacity: 0.9 }}>
        {summary.roundsPlayed > 0
          ? summaryMessage(summary.accuracyPct)
          : 'Terminaste antes de completar una ronda. ¡Volvé cuando quieras!'}
      </div>

      {summary.roundsPlayed > 0 && (
        <div style={{ display: 'flex', gap: 'clamp(24px,5vw,64px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <div style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 700, color: palette.primary }}>
              {summary.maxLevelThisSession}
            </div>
            <div style={{ fontSize: 20, opacity: 0.8 }}>Nivel máximo</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 700, color: palette.primary }}>
              {summary.accuracyPct}%
            </div>
            <div style={{ fontSize: 20, opacity: 0.8 }}>Aciertos</div>
          </div>
        </div>
      )}

      {summary.isNewRecord && (
        <div style={{ fontSize: 22, fontWeight: 700, color: palette.good }}>¡Nuevo récord personal!</div>
      )}

      <div style={{ display: 'flex', gap: 'clamp(20px,3vw,32px)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'clamp(12px,2vh,20px)' }}>
        <TouchButton onClick={onPlayAgain} palette={palette} variant="primary">
          Jugar de nuevo
        </TouchButton>
        <TouchButton onClick={onExit} palette={palette} variant="secondary">
          Volver al inicio
        </TouchButton>
      </div>
    </div>
  );
}
