import type { RoundConfig } from './types';
import { buildObjectQuestionOptions, pickCentralObject } from './data/objects';
import { buildSignQuestionOptions, pickTargetSign, placeTargetSign } from './data/signs';
import { pickDistractorShapes, placeGeoShapes } from './data/geoShapes';

// --- Algoritmo de staircase ------------------------------------------------
//
// Un solo entero `nivel` (sin techo) controla dos ejes de dificultad:
//
//   exposición (ms): baja de 2400 a 800 en pasos de 80ms, tocando el piso
//   en el nivel 21.
//
//   distractores: 0 hasta el nivel 7, 1 entre 8 y 14, 2 desde el nivel 15.
//   Son formas geométricas neutras (no señales de tránsito reales), así que
//   agregan ruido visual sin generar ambigüedad sobre cuál señal recordar:
//   la única señal real en la rueda es siempre la que hay que responder.
//
// Pasado el nivel 21 la dificultad real ya está al máximo, pero el nivel
// sigue subiendo con las rachas de acierto: funciona como puntaje sin techo
// que nunca vuelve el juego imposible.
//
// Ajuste por ronda (3-arriba / 1-abajo, estándar en psicofísica adaptativa,
// converge a ~79% de aciertos), con un colchón para errores parciales:
//   - 3 rondas totalmente correctas (3/3) seguidas -> sube 1 nivel, racha se reinicia
//   - ronda parcial (1 o 2 de 3 respuestas bien) -> corta la racha, pero el
//     nivel NO baja: un solo desliz (ej. errar el sector por uno) no debería
//     pesar igual que no reconocer nada de la ronda.
//   - ronda totalmente errada (0 de 3) -> baja 1 nivel (mínimo 1), racha se reinicia

export const MAX_EXPOSURE_MS = 2400;
export const MIN_EXPOSURE_MS = 800;
export const EXPOSURE_STEP_MS = 80;
export const DISTRACTOR_LEVEL_1 = 8;
export const DISTRACTOR_LEVEL_2 = 15;
export const STREAK_THRESHOLD = 3;
export const BLANK_MS = 400;
export const FEEDBACK_MS = 1700;
export const FEEDBACK_WITH_ERRORS_MS = 2800;

// Cuando la ronda no salió perfecta, el feedback muestra qué pregunta falló;
// se le da más tiempo en pantalla para que se pueda leer con calma.
export function feedbackDurationMs(fullyCorrect: boolean): number {
  return fullyCorrect ? FEEDBACK_MS : FEEDBACK_WITH_ERRORS_MS;
}

export function exposureForLevel(level: number): number {
  const raw = MAX_EXPOSURE_MS - (level - 1) * EXPOSURE_STEP_MS;
  return Math.max(MIN_EXPOSURE_MS, Math.min(MAX_EXPOSURE_MS, raw));
}

export function distractorCountForLevel(level: number): number {
  if (level >= DISTRACTOR_LEVEL_2) return 2;
  if (level >= DISTRACTOR_LEVEL_1) return 1;
  return 0;
}

// Opciones de las preguntas "¿Qué objeto viste?" y "¿Qué señal viste?":
// también escalan con el nivel, usando los mismos umbrales que los
// distractores. Toda categoría de objeto tiene 6 variantes y el catálogo de
// señales tiene 9, así que el tope de 5 opciones aplica parejo.
export function questionOptionCountForLevel(level: number): number {
  if (level >= DISTRACTOR_LEVEL_2) return 5;
  if (level >= DISTRACTOR_LEVEL_1) return 4;
  return 3;
}

export interface StaircaseState {
  level: number;
  streak: number;
}

// Decide el próximo nivel/racha a partir del resultado de una ronda.
// `correctCount` es cuántas de las 3 preguntas (objeto, señal, sector) se
// respondieron bien. Es una función pura para poder testear el criterio
// 3-arriba/1-abajo sin tener que simular el hook de React ni jugar una
// sesión completa.
export function nextStaircaseState(correctCount: number, current: StaircaseState): StaircaseState {
  if (correctCount >= 3) {
    const streak = current.streak + 1;
    if (streak >= STREAK_THRESHOLD) {
      return { level: current.level + 1, streak: 0 };
    }
    return { level: current.level, streak };
  }
  if (correctCount === 0) {
    return { level: Math.max(1, current.level - 1), streak: 0 };
  }
  return { level: current.level, streak: 0 };
}

export function generateRound(level: number): RoundConfig {
  const central = pickCentralObject();
  const targetSign = pickTargetSign();
  const target = placeTargetSign(targetSign);
  const distractorShapes = pickDistractorShapes(distractorCountForLevel(level));
  const distractors = placeGeoShapes(distractorShapes, target.sector);

  return {
    level,
    central,
    target,
    distractors,
    exposureMs: exposureForLevel(level),
    signOptions: buildSignQuestionOptions(targetSign, questionOptionCountForLevel(level)),
    objectOptions: buildObjectQuestionOptions(central.def, questionOptionCountForLevel(level)),
  };
}
