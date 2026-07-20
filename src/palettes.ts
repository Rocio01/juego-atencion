import type { Palette, PaletteName } from './types';

// Las señales de tránsito usan colores universales fijos (rojo/amarillo/blanco)
// independientes de la paleta, para mantener su reconocibilidad real.
// Las paletas solo definen la interfaz (fondo, texto, acentos decorativos).

export const PALETTES: Record<PaletteName, Palette> = {
  terracota: {
    name: 'terracota',
    label: 'Terracota cálida',
    bg: 'oklch(97% 0.015 75)',
    bg2: 'oklch(93% 0.03 68)',
    text: 'oklch(24% 0.03 50)',
    primary: 'oklch(46% 0.17 40)',
    primaryText: 'oklch(99% 0.005 90)',
    line: 'oklch(58% 0.04 60)',
    good: 'oklch(55% 0.12 145)',
    warn: 'oklch(58% 0.11 70)',
    accents: ['oklch(55% 0.15 25)', 'oklch(50% 0.12 250)', 'oklch(62% 0.14 95)'],
  },
  marino: {
    name: 'marino',
    label: 'Azul marino suave',
    bg: 'oklch(96% 0.015 240)',
    bg2: 'oklch(91% 0.025 240)',
    text: 'oklch(22% 0.03 250)',
    primary: 'oklch(35% 0.10 255)',
    primaryText: 'oklch(98% 0.01 90)',
    line: 'oklch(55% 0.03 250)',
    good: 'oklch(52% 0.11 155)',
    warn: 'oklch(56% 0.10 75)',
    accents: ['oklch(52% 0.15 25)', 'oklch(45% 0.12 250)', 'oklch(60% 0.13 95)'],
  },
  bosque: {
    name: 'bosque',
    label: 'Verde bosque',
    bg: 'oklch(96% 0.02 120)',
    bg2: 'oklch(91% 0.03 115)',
    text: 'oklch(23% 0.03 140)',
    primary: 'oklch(38% 0.11 150)',
    primaryText: 'oklch(98% 0.01 90)',
    line: 'oklch(52% 0.03 130)',
    good: 'oklch(45% 0.12 150)',
    warn: 'oklch(56% 0.11 75)',
    accents: ['oklch(52% 0.16 30)', 'oklch(46% 0.12 250)', 'oklch(62% 0.13 95)'],
  },
};

export const PALETTE_LIST: Palette[] = Object.values(PALETTES);

export function getPalette(name: PaletteName): Palette {
  return PALETTES[name];
}

// Colores universales de señalización vial, constantes en toda paleta.
export const SIGN_COLORS = {
  red: 'oklch(48% 0.19 25)',
  yellow: 'oklch(80% 0.16 90)',
  white: 'oklch(99% 0 0)',
  dark: 'oklch(20% 0 0)',
};
