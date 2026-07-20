// Geometría de los 6 sectores del círculo de estímulo periférico.

export const SECTOR_CLIPS: string[] = [
  'polygon(50% 50%, 50% 0%, 93.3% 25%)',
  'polygon(50% 50%, 93.3% 25%, 93.3% 75%)',
  'polygon(50% 50%, 93.3% 75%, 50% 100%)',
  'polygon(50% 50%, 50% 100%, 6.7% 75%)',
  'polygon(50% 50%, 6.7% 75%, 6.7% 25%)',
  'polygon(50% 50%, 6.7% 25%, 50% 0%)',
];

export const SECTOR_CENTERS: { left: number; top: number }[] = [
  { left: 68.75, top: 17.5 },
  { left: 87.5, top: 50 },
  { left: 68.75, top: 82.5 },
  { left: 31.25, top: 82.5 },
  { left: 12.5, top: 50 },
  { left: 31.25, top: 17.5 },
];
