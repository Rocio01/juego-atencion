import type { RoundConfig } from './types';
import { pickCentralObject } from './data/objects';
import {
  buildSignQuestionOptions,
  pickDistractorSigns,
  pickTargetSign,
  placeSignsInSectors,
} from './data/signs';

// --- Algoritmo de staircase ------------------------------------------------
//
// Un solo entero `nivel` (sin techo) controla dos ejes de dificultad:
//
//   exposición (ms): baja de 2400 a 800 en pasos de 80ms, tocando el piso
//   en el nivel 21.
//
//   distractores: 0 hasta el nivel 7, 1 entre 8 y 14, 2 desde el nivel 15.
//   Desde el nivel 15 además se prefiere que los distractores sean de la
//   misma familia de forma que la señal objetivo (ej. dos triángulos), lo
//   que los hace genuinamente confusables en vez de solo "más cantidad".
//
// Pasado el nivel 21 la dificultad real ya está al máximo, pero el nivel
// sigue subiendo con las rachas de acierto: funciona como puntaje sin techo
// que nunca vuelve el juego imposible.
//
// Ajuste por ronda (3-arriba / 1-abajo, estándar en psicofísica adaptativa,
// converge a ~79% de aciertos):
//   - 3 rondas totalmente correctas seguidas -> sube 1 nivel, racha se reinicia
//   - cualquier fallo -> baja 1 nivel (mínimo 1), racha se reinicia

export const MAX_EXPOSURE_MS = 2400;
export const MIN_EXPOSURE_MS = 800;
export const EXPOSURE_STEP_MS = 80;
export const DISTRACTOR_LEVEL_1 = 8;
export const DISTRACTOR_LEVEL_2 = 15;
export const STREAK_THRESHOLD = 3;
export const BLANK_MS = 400;
export const FEEDBACK_MS = 1700;

export function exposureForLevel(level: number): number {
  const raw = MAX_EXPOSURE_MS - (level - 1) * EXPOSURE_STEP_MS;
  return Math.max(MIN_EXPOSURE_MS, Math.min(MAX_EXPOSURE_MS, raw));
}

export function distractorCountForLevel(level: number): number {
  if (level >= DISTRACTOR_LEVEL_2) return 2;
  if (level >= DISTRACTOR_LEVEL_1) return 1;
  return 0;
}

export function preferSameFamilyForLevel(level: number): boolean {
  return level >= DISTRACTOR_LEVEL_2;
}

export interface StaircaseState {
  level: number;
  streak: number;
}

// Decide el próximo nivel/racha a partir del resultado de una ronda.
// Es una función pura para poder testear el criterio 3-arriba/1-abajo
// sin tener que simular el hook de React ni jugar una sesión completa.
export function nextStaircaseState(fullyCorrect: boolean, current: StaircaseState): StaircaseState {
  if (fullyCorrect) {
    const streak = current.streak + 1;
    if (streak >= STREAK_THRESHOLD) {
      return { level: current.level + 1, streak: 0 };
    }
    return { level: current.level, streak };
  }
  return { level: Math.max(1, current.level - 1), streak: 0 };
}

export function generateRound(level: number): RoundConfig {
  const central = pickCentralObject();
  const targetSign = pickTargetSign();
  const distractorSigns = pickDistractorSigns(
    targetSign,
    distractorCountForLevel(level),
    preferSameFamilyForLevel(level),
  );
  const placed = placeSignsInSectors([targetSign, ...distractorSigns]);
  const [target, ...distractors] = placed;

  return {
    level,
    central,
    target,
    distractors,
    exposureMs: exposureForLevel(level),
    signOptions: buildSignQuestionOptions(targetSign, distractorSigns),
  };
}
