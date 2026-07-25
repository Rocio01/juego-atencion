import type { PlacedSign, SignDef } from '../types';
import { pickRandom, randomInt, sample, shuffle } from '../utils';
import { TOTAL_SECTORS } from './sectors';

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

export function pickTargetSign(): SignDef {
  return pickRandom(SIGN_CATALOG);
}

// La señal objetivo es la única señal de tránsito real que aparece en la
// rueda (los distractores son formas geométricas, ver data/geoShapes.ts), así
// que solo necesita un sector propio, sin competir con otras señales.
export function placeTargetSign(sign: SignDef): PlacedSign {
  return { sign, sector: randomInt(TOTAL_SECTORS) };
}

// Opciones para la pregunta "¿Qué señal viste?": el objetivo + señales
// parecidas (misma familia primero, para que la opción correcta no salte a
// la vista) + el resto del catálogo hasta completar la cantidad, que la
// decide el nivel (ver questionOptionCountForLevel en staircase.ts), en
// orden aleatorio. Ninguna de estas opciones estuvo realmente en pantalla:
// solo la señal objetivo se mostró, así que no hay ambigüedad sobre cuál
// recordar.
export function buildSignQuestionOptions(target: SignDef, optionCount = 4): SignDef[] {
  const rest = SIGN_CATALOG.filter((s) => s.id !== target.id);
  const sameFamily = rest.filter((s) => s.shape === target.shape);
  const otherFamily = rest.filter((s) => s.shape !== target.shape);

  const chosenSameFamily = sample(sameFamily, optionCount - 1);
  const remaining = optionCount - 1 - chosenSameFamily.length;
  const chosenOtherFamily = remaining > 0 ? sample(otherFamily, remaining) : [];

  return shuffle([target, ...chosenSameFamily, ...chosenOtherFamily]);
}
