import type { GameState, ObjectVariant, Palette } from '../types';
import { LevelIndicator } from './LevelIndicator';
import { StimulusWheel } from './StimulusWheel';
import { ObjectQuestion } from './ObjectQuestion';
import { SignQuestion } from './SignQuestion';
import { SectorQuestion } from './SectorQuestion';
import { Feedback } from './Feedback';
import { PauseOverlay } from './PauseOverlay';

interface Props {
  state: GameState;
  palette: Palette;
  onAnswerObject: (variant: ObjectVariant) => void;
  onAnswerSign: (signId: string) => void;
  onAnswerSector: (sector: number) => void;
  onPause: () => void;
  onResume: () => void;
  onEndSession: () => void;
  onExitToHome: () => void;
}

export function GameScreen({
  state,
  palette,
  onAnswerObject,
  onAnswerSign,
  onAnswerSector,
  onPause,
  onResume,
  onEndSession,
  onExitToHome,
}: Props) {
  const { round, phase } = state;

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          minHeight: 64,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 12px',
          padding: 'clamp(10px,1.5vh,16px) clamp(16px,3vw,32px)',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: palette.bg,
        }}
      >
        <LevelIndicator level={state.level} streak={state.streak} palette={palette} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={onPause}
            style={{
              minHeight: 60,
              height: 'clamp(60px,8vh,72px)',
              minWidth: 100,
              padding: '0 clamp(16px,2.2vw,24px)',
              borderRadius: 18,
              background: palette.bg2,
              border: `3px solid ${palette.line}`,
              color: palette.text,
              fontSize: 'clamp(18px,2vw,22px)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Pausa
          </button>
          <button
            onClick={onEndSession}
            style={{
              minHeight: 60,
              height: 'clamp(60px,8vh,72px)',
              minWidth: 160,
              padding: '0 clamp(16px,2.2vw,24px)',
              borderRadius: 18,
              background: 'transparent',
              border: `3px solid ${palette.line}`,
              color: palette.text,
              fontSize: 'clamp(18px,2vw,22px)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Terminar sesión
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(12px,2vw,24px)' }}>
        {round && (phase === 'estimulo' || phase === 'blanco') && (
          <StimulusWheel phase={phase} round={round} palette={palette} />
        )}
        {round && phase === 'pregunta-objeto' && (
          <ObjectQuestion round={round} palette={palette} onAnswer={onAnswerObject} />
        )}
        {round && phase === 'pregunta-senal' && (
          <SignQuestion round={round} palette={palette} onAnswer={onAnswerSign} />
        )}
        {phase === 'pregunta-sector' && <SectorQuestion palette={palette} onAnswer={onAnswerSector} />}
        {phase === 'feedback' && state.lastRoundResult !== null && (
          <Feedback
            result={state.lastRoundResult}
            palette={palette}
            justUnlockedMilestone={state.justUnlockedMilestone}
          />
        )}
      </div>

      {phase === 'pausa' && <PauseOverlay palette={palette} onResume={onResume} onExit={onExitToHome} />}
    </div>
  );
}
