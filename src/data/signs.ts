import type { PlacedSign, SignDef } from '../types';
import { pickRandom, sample, shuffle } from '../utils';

export const SIGN_CATALOG: SignDef[] = [
  { id: 'alto', shape: 'octagono', label: 'Alto' },
  { id: 'ceda-paso', shape: 'triangulo', label: 'Ceda el paso' },
  { id: 'cruce-peatonal', shape: 'triangulo', label: 'Cruce peatonal', icon: 'peatonal' },
  { id: 'velocidad-60', shape: 'circulo', label: 'Velocidad máxima 60', speed: 60 },
  { id: 'velocidad-80', shape: 'circulo', label: 'Velocidad máxima 80', speed: 80 },
  { id: 'velocidad-100', shape: 'circulo', label: 'Velocidad máxima 100', speed: 100 },
  { id: 'curva-derecha', shape: 'rombo', label: 'Curva peligrosa a la derecha', icon: 'curva-derecha' },
  { id: 'curva-izquierda', shape: 'rombo', label: 'Curva peligrosa a la izquierda', icon: 'curva-izquierda' },
  { id: 'cruce-ferrocarril', shape: 'rombo', label: 'Cruce de ferrocarril', icon: 'ferrocarril' },
];

const TOTAL_SECTORS = 6;

export function pickTargetSign(): SignDef {
  return pickRandom(SIGN_CATALOG);
}

// Distractores: en dificultad baja se prefiere una forma distinta a la del
// objetivo (fácil de distinguir); en dificultad alta se prefiere la misma
// familia de forma (ej. dos triángulos), lo que las hace genuinamente
// confusables. Si la familia no tiene suficientes miembros, se completa con
// el resto del catálogo.
export function pickDistractorSigns(
  target: SignDef,
  count: number,
  preferSameFamily: boolean,
): SignDef[] {
  if (count <= 0) return [];

  const rest = SIGN_CATALOG.filter((s) => s.id !== target.id);
  const sameFamily = rest.filter((s) => s.shape === target.shape);
  const otherFamily = rest.filter((s) => s.shape !== target.shape);

  const preferred = preferSameFamily ? sameFamily : otherFamily;
  const fallback = preferSameFamily ? otherFamily : sameFamily;

  const chosenPreferred = sample(preferred, count);
  const remaining = count - chosenPreferred.length;
  const chosenFallback = remaining > 0 ? sample(fallback, remaining) : [];

  return [...chosenPreferred, ...chosenFallback];
}

export function placeSignsInSectors(signs: SignDef[]): PlacedSign[] {
  const sectors = sample(
    Array.from({ length: TOTAL_SECTORS }, (_, i) => i),
    signs.length,
  );
  return signs.map((sign, i) => ({ sign, sector: sectors[i] }));
}

// Opciones para la pregunta "¿Qué señal viste?": el objetivo + señales
// parecidas (misma familia primero) + las que realmente aparecieron como
// distractores en esta ronda, hasta un máximo de 4, en orden aleatorio.
export function buildSignQuestionOptions(
  target: SignDef,
  distractorsShown: SignDef[],
  optionCount = 4,
): SignDef[] {
  const rest = SIGN_CATALOG.filter((s) => s.id !== target.id);
  const sameFamily = rest.filter((s) => s.shape === target.shape);
  const shownIds = new Set(distractorsShown.map((s) => s.id));

  const priority = [
    ...distractorsShown,
    ...sameFamily.filter((s) => !shownIds.has(s.id)),
    ...rest.filter((s) => s.shape !== target.shape),
  ];

  const seen = new Set<string>();
  const uniquePriority = priority.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });

  const extras = uniquePriority.slice(0, Math.max(0, optionCount - 1));
  return shuffle([target, ...extras]);
}
