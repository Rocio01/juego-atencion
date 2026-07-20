import { useEffect, useRef, useState } from 'react';
import type { GamePhase, GameState, ObjectVariant, PaletteName, RoundConfig, RoundResult, SessionSummary } from './types';
import { BLANK_MS, FEEDBACK_MS, generateRound, nextStaircaseState } from './staircase';
import { loadUnlockedMilestones, saveUnlockedMilestones, unlockNewMilestones } from './achievements';

// --- Persistencia ------------------------------------------------------

const BEST_LEVEL_KEY = 'atencion:bestLevel';
const PALETTE_KEY = 'atencion:palette';

function loadBestLevel(): number {
  try {
    const raw = localStorage.getItem(BEST_LEVEL_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 1;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  } catch {
    return 1;
  }
}

function saveBestLevel(level: number): void {
  try {
    localStorage.setItem(BEST_LEVEL_KEY, String(level));
  } catch {
    // localStorage no disponible (ej. navegación privada); se ignora.
  }
}

function loadPalette(): PaletteName {
  try {
    const raw = localStorage.getItem(PALETTE_KEY);
    if (raw === 'terracota' || raw === 'marino' || raw === 'bosque') return raw;
    return 'terracota';
  } catch {
    return 'terracota';
  }
}

function savePalette(name: PaletteName): void {
  try {
    localStorage.setItem(PALETTE_KEY, name);
  } catch {
    // localStorage no disponible; se ignora.
  }
}

// --- Estado inicial ------------------------------------------------------

function makeInitialState(bestLevelEver: number, unlockedMilestones: number[]): GameState {
  return {
    phase: 'inicio',
    phaseBeforePausa: null,
    level: 1,
    streak: 0,
    maxLevelThisSession: 1,
    round: null,
    objectAnswer: null,
    signAnswer: null,
    sectorAnswer: null,
    results: [],
    lastRoundCorrect: null,
    bestLevelEver,
    unlockedMilestones,
    justUnlockedMilestone: null,
  };
}

export function getSessionSummary(state: GameState): SessionSummary {
  const roundsPlayed = state.results.length;
  const fullyCorrectCount = state.results.filter((r) => r.fullyCorrect).length;
  const accuracyPct = roundsPlayed > 0 ? Math.round((fullyCorrectCount / roundsPlayed) * 100) : 0;
  const isNewRecord = state.maxLevelThisSession > state.bestLevelEver;

  return {
    roundsPlayed,
    maxLevelThisSession: state.maxLevelThisSession,
    bestLevelEver: Math.max(state.bestLevelEver, state.maxLevelThisSession),
    isNewRecord,
    accuracyPct,
  };
}

// --- Hook ------------------------------------------------------------

export function useGame() {
  const [state, setState] = useState<GameState>(() => makeInitialState(loadBestLevel(), loadUnlockedMilestones()));
  const [palette, setPaletteState] = useState<PaletteName>(loadPalette);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const scheduleTimeout = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const beginStimulusPhase = (round: RoundConfig) => {
    setState((s) => ({
      ...s,
      phase: 'estimulo' as GamePhase,
      phaseBeforePausa: null,
      round,
      objectAnswer: null,
      signAnswer: null,
      sectorAnswer: null,
      justUnlockedMilestone: null,
    }));
    scheduleTimeout(() => {
      setState((s) => ({ ...s, phase: 'blanco' }));
      scheduleTimeout(() => {
        setState((s) => ({ ...s, phase: 'pregunta-objeto' }));
      }, BLANK_MS);
    }, round.exposureMs);
  };

  const runRound = (level: number) => {
    beginStimulusPhase(generateRound(level));
  };

  const startGame = () => {
    clearTimers();
    setState((s) => makeInitialState(s.bestLevelEver, s.unlockedMilestones));
    runRound(1);
  };

  const answerObject = (variant: ObjectVariant) => {
    setState((s) => ({ ...s, objectAnswer: variant, phase: 'pregunta-senal' }));
  };

  const answerSign = (signId: string) => {
    setState((s) => ({ ...s, signAnswer: signId, phase: 'pregunta-sector' }));
  };

  const answerSector = (sector: number) => {
    const s = state;
    if (!s.round) return;

    const objectCorrect = s.objectAnswer === s.round.central.def.variant;
    const signCorrect = s.signAnswer === s.round.target.sign.id;
    const sectorCorrect = sector === s.round.target.sector;
    const fullyCorrect = objectCorrect && signCorrect && sectorCorrect;

    const { level, streak } = nextStaircaseState(fullyCorrect, { level: s.level, streak: s.streak });
    const { milestones: unlockedMilestones, newlyUnlocked } = unlockNewMilestones(s.unlockedMilestones, level);
    if (newlyUnlocked !== null) {
      saveUnlockedMilestones(unlockedMilestones);
    }

    const result: RoundResult = {
      level: s.level,
      objectCorrect,
      signCorrect,
      sectorCorrect,
      fullyCorrect,
    };
    const results = [...s.results, result];
    const maxLevelThisSession = Math.max(s.maxLevelThisSession, level);

    setState({
      ...s,
      sectorAnswer: sector,
      results,
      streak,
      level,
      maxLevelThisSession,
      unlockedMilestones,
      justUnlockedMilestone: newlyUnlocked,
      lastRoundCorrect: fullyCorrect,
      phase: 'feedback',
    });

    scheduleTimeout(() => runRound(level), FEEDBACK_MS);
  };

  const pauseGame = () => {
    if (state.phase === 'pausa' || state.phase === 'inicio' || state.phase === 'resumen') return;
    clearTimers();
    setState((s) => ({ ...s, phaseBeforePausa: s.phase, phase: 'pausa' }));
  };

  const resumeGame = () => {
    const prev = state.phaseBeforePausa;
    if (!prev) return;
    const round = state.round;
    if ((prev === 'estimulo' || prev === 'blanco') && round) {
      beginStimulusPhase(round);
    } else if (prev === 'feedback') {
      setState((s) => ({ ...s, phase: 'feedback', phaseBeforePausa: null }));
      scheduleTimeout(() => runRound(state.level), FEEDBACK_MS);
    } else {
      setState((s) => ({ ...s, phase: prev, phaseBeforePausa: null }));
    }
  };

  const endSession = () => {
    clearTimers();
    const bestLevelEver = Math.max(state.bestLevelEver, state.maxLevelThisSession);
    saveBestLevel(bestLevelEver);
    setState((s) => ({ ...s, phase: 'resumen', bestLevelEver }));
  };

  const playAgain = () => {
    startGame();
  };

  const exitToHome = () => {
    clearTimers();
    setState((s) => makeInitialState(s.bestLevelEver, s.unlockedMilestones));
  };

  const setPalette = (name: PaletteName) => {
    setPaletteState(name);
    savePalette(name);
  };

  return {
    state,
    palette,
    setPalette,
    startGame,
    answerObject,
    answerSign,
    answerSector,
    pauseGame,
    resumeGame,
    endSession,
    playAgain,
    exitToHome,
  };
}
