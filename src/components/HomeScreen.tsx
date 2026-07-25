import { useState } from 'react';
import type { Palette, PaletteName } from '../types';
import { PALETTE_LIST } from '../palettes';
import { MILESTONE_STEP } from '../achievements';
import { AchievementBadge } from './AchievementBadge';
import { RulesOverlay } from './RulesOverlay';
import { TouchButton } from './TouchButton';

interface Props {
  palette: Palette;
  paletteName: PaletteName;
  onChangePalette: (name: PaletteName) => void;
  bestLevelEver: number;
  unlockedMilestones: number[];
  onStart: () => void;
}

export function HomeScreen({
  palette,
  paletteName,
  onChangePalette,
  bestLevelEver,
  unlockedMilestones,
  onStart,
}: Props) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(20px,4vh,40px)',
        padding: 'clamp(24px,5vw,48px)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 'clamp(34px,5.5vw,58px)', fontWeight: 700, lineHeight: 1.15 }}>
        Juego de Atención
      </div>
      <div style={{ fontSize: 'clamp(24px,3vw,30px)', maxWidth: 620, lineHeight: 1.5, opacity: 0.9 }}>
        Mira con calma lo que aparece en la pantalla. Luego contestá unas preguntas sencillas.
      </div>

      {bestLevelEver > 1 && (
        <div style={{ fontSize: 24, fontWeight: 700, color: palette.primary }}>
          Tu mejor nivel: {bestLevelEver}
        </div>
      )}

      <TouchButton
        onClick={onStart}
        palette={palette}
        variant="primary"
        style={{
          marginTop: 'clamp(8px,2vh,16px)',
          width: 'min(560px,90vw)',
          minHeight: 100,
          height: 'clamp(100px,14vh,140px)',
          borderRadius: 28,
          fontSize: 'clamp(32px,4.5vw,46px)',
          boxShadow: '0 8px 0 rgba(0,0,0,0.18)',
        }}
      >
        Jugar
      </TouchButton>

      <TouchButton onClick={() => setShowRules(true)} palette={palette} variant="secondary">
        ¿Cómo se juega?
      </TouchButton>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 8, maxWidth: 560 }}>
        <div style={{ fontSize: 20, opacity: 0.8 }}>Tus medallas</div>
        {unlockedMilestones.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {unlockedMilestones.map((level) => (
              <AchievementBadge key={level} level={level} palette={palette} size={60} />
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 18, opacity: 0.7 }}>
            Llegá al nivel {MILESTONE_STEP} para ganar tu primera medalla.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <div style={{ fontSize: 20, opacity: 0.8 }}>Color de la pantalla</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {PALETTE_LIST.map((p) => (
            <button
              key={p.name}
              onClick={() => onChangePalette(p.name)}
              aria-label={p.label}
              aria-pressed={p.name === paletteName}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: p.primary,
                border: p.name === paletteName ? `4px solid ${palette.text}` : '4px solid transparent',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      {showRules && <RulesOverlay palette={palette} onClose={() => setShowRules(false)} />}
    </div>
  );
}
