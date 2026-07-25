import { describe, expect, it } from 'vitest';
import { getSessionSummary } from './useGame';
import type { GameState, RoundResult } from './types';

function makeResult(overrides: Partial<RoundResult>): RoundResult {
  return {
    level: 1,
    objectCorrect: false,
    signCorrect: false,
    sectorCorrect: false,
    fullyCorrect: false,
    ...overrides,
  };
}

function makeState(results: RoundResult[], maxLevelThisSession = 1, bestLevelEver = 1): GameState {
  return {
    phase: 'resumen',
    phaseBeforePausa: null,
    level: 1,
    streak: 0,
    maxLevelThisSession,
    round: null,
    objectAnswer: null,
    signAnswer: null,
    sectorAnswer: null,
    results,
    lastRoundResult: null,
    bestLevelEver,
    unlockedMilestones: [],
    justUnlockedMilestone: null,
  };
}

const full = makeResult({ objectCorrect: true, signCorrect: true, sectorCorrect: true, fullyCorrect: true });
const partial = makeResult({ objectCorrect: true, signCorrect: true, sectorCorrect: false });
const miss = makeResult({});

describe('getSessionSummary: % de aciertos con puntaje parcial', () => {
  it('0 rondas jugadas da 0%, sin dividir por cero', () => {
    expect(getSessionSummary(makeState([])).accuracyPct).toBe(0);
  });

  it('todas las rondas perfectas dan 100%', () => {
    expect(getSessionSummary(makeState([full, full, full])).accuracyPct).toBe(100);
  });

  it('todas las rondas totalmente erradas dan 0%', () => {
    expect(getSessionSummary(makeState([miss, miss])).accuracyPct).toBe(0);
  });

  it('una ronda parcial (1 o 2 de 3) vale medio punto, no cero', () => {
    // 1 parcial de 1 ronda jugada -> 0.5/1 = 50%
    expect(getSessionSummary(makeState([partial])).accuracyPct).toBe(50);
  });

  it('jugar siempre parcial da 50%, no 0%', () => {
    expect(getSessionSummary(makeState([partial, partial, partial, partial])).accuracyPct).toBe(50);
  });

  it('mezcla de perfectas, parciales y erradas pondera cada una distinto', () => {
    // (1 + 0.5 + 0) / 3 rondas = 50%
    expect(getSessionSummary(makeState([full, partial, miss])).accuracyPct).toBe(50);
  });
});
