import type { Palette } from '../types';
import { TouchButton } from './TouchButton';

interface Props {
  palette: Palette;
  onClose: () => void;
}

export function RulesOverlay({ palette, onClose }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
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
          gap: 'clamp(20px,3vh,28px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: 'min(560px,90vw)',
        }}
      >
        <div style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, color: palette.text, textAlign: 'center' }}>
          ¿Cómo se juega?
        </div>
        <ol
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            fontSize: 'clamp(18px,2.2vw,22px)',
            color: palette.text,
            lineHeight: 1.5,
            paddingLeft: 24,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <li>Mirá con calma el objeto del centro (auto, pájaro o barco) y la señal de tránsito que aparece alrededor.</li>
          <li>Después te preguntamos tres cosas: qué objeto viste, qué señal viste, y en qué sector apareció la señal.</li>
          <li>Pueden aparecer formas geométricas junto a la señal: no son señales de tránsito, no hace falta recordarlas.</li>
          <li>Si acertás seguido, el juego se pone más rápido y difícil. Si te cuesta, se hace más fácil solo.</li>
        </ol>
        <TouchButton onClick={onClose} palette={palette} variant="primary">
          Entendido
        </TouchButton>
      </div>
    </div>
  );
}
