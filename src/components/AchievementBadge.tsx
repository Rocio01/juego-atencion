import type { Palette } from '../types';

interface Props {
  level: number;
  palette: Palette;
  size?: number;
}

export function AchievementBadge({ level, palette, size = 64 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={`Medalla de nivel ${level}`}>
      <polygon points="30,68 20,98 38,86" fill={palette.primary} />
      <polygon points="70,68 80,98 62,86" fill={palette.primary} />
      <circle cx="50" cy="42" r="38" fill={palette.good} stroke={palette.primaryText} strokeWidth="4" />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="30"
        fontWeight="700"
        fill={palette.primaryText}
        style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif' }}
      >
        {level}
      </text>
    </svg>
  );
}
