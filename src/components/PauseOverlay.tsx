import type { Palette } from '../types';
import { TouchButton } from './TouchButton';

interface Props {
  palette: Palette;
  onResume: () => void;
  onExit: () => void;
}

export function PauseOverlay({ palette, onResume, onExit }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'oklch(20% 0 0 / 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 20,
      }}
    >
      <div
        style={{
          background: palette.bg,
          borderRadius: 32,
          padding: 'clamp(32px,5vw,56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(24px,3.5vh,36px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: '90vw',
        }}
      >
        <div style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: palette.text }}>
          Juego en pausa
        </div>
        <div style={{ display: 'flex', gap: 'clamp(20px,3vw,32px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TouchButton onClick={onResume} palette={palette} variant="primary">
            Continuar
          </TouchButton>
          <TouchButton onClick={onExit} palette={palette} variant="secondary">
            Salir al inicio
          </TouchButton>
        </div>
      </div>
    </div>
  );
}
