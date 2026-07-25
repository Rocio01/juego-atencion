import { useEffect, useRef, useState } from 'react';
import type { GamePhase, GameState, ObjectVariant, PaletteName, RoundConfig, RoundResult, SessionSummary } from './types';
import { BLANK_MS, feedbackDurationMs, generateRound, nextStaircaseState } from './staircase';
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
    lastRoundResult: null,
    bestLevelEver,
    unlockedMilestones,
    justUnlockedMilestone: null,
  };
}

// Puntaje por ronda para el % de aciertos del resumen: una ronda perfecta
// (3/3) vale 1 punto entero; una ronda parcial (1 o 2 de 3, la que ya no
// baja de nivel) vale medio punto en vez de cero, para que el resumen no
// contradiga lo que el staircase ya consideró "casi bien". Solo una ronda
// totalmente errada (0/3) vale cero.
function roundScore(result: RoundResult): number {
  if (result.fullyCorrect) return 1;
  const correctCount = [result.objectCorrect, result.signCorrect, result.sectorCorrect].filter(Boolean).length;
  return correctCount > 0 ? 0.5 : 0;
}

export function getSessionSummary(state: GameState): SessionSummary {
  const roundsPlayed = state.results.length;
  const totalScore = state.results.reduce((sum, r) => sum + roundScore(r), 0);
  const accuracyPct = roundsPlayed > 0 ? Math.round((totalScore / roundsPlayed) * 100) : 0;
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
    const correctCount = [objectCorrect, signCorrect, sectorCorrect].filter(Boolean).length;

    const { level, streak } = nextStaircaseState(correctCount, { level: s.level, streak: s.streak });
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

    // El récord se persiste apenas se supera, igual que las medallas: si se
    // cierra la pestaña a mitad de sesión, no se pierde. El estado en memoria
    // (bestLevelEver) se actualiza recién al terminar la sesión, para que el
    // cartel de "nuevo récord" del resumen siga funcionando.
    if (maxLevelThisSession > s.bestLevelEver) {
      saveBestLevel(maxLevelThisSession);
    }

    setState({
      ...s,
      sectorAnswer: sector,
      results,
      streak,
      level,
      maxLevelThisSession,
      unlockedMilestones,
      justUnlockedMilestone: newlyUnlocked,
      lastRoundResult: result,
      phase: 'feedback',
    });

    scheduleTimeout(() => runRound(level), feedbackDurationMs(fullyCorrect));
  };

  const pauseGame = () => {
    if (state.phase === 'pausa' || state.phase === 'inicio' || state.phase === 'resumen') return;
    clearTimers();
    setState((s) => ({ ...s, phaseBeforePausa: s.phase, phase: 'pausa' }));
  };

  const resumeGame = () => {
    const prev = state.phaseBeforePausa;
    if (!prev) return;
    if (prev === 'estimulo' || prev === 'blanco') {
      // La ronda pausada ya mostró (parte de) su estímulo: repetir la
      // exposición completa regalaría una segunda mirada y anularía el
      // desafío de memoria. Se descarta y se genera una ronda nueva del
      // mismo nivel, sin registrar resultado.
      runRound(state.level);
    } else if (prev === 'feedback') {
      setState((s) => ({ ...s, phase: 'feedback', phaseBeforePausa: null }));
      scheduleTimeout(
        () => runRound(state.level),
        feedbackDurationMs(state.lastRoundResult?.fullyCorrect ?? true),
      );
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
    // Al salir sin pasar por "Terminar sesión" (ej. desde la pausa), el récord
    // ya se persistió ronda a ronda; el estado en memoria también tiene que
    // reflejarlo para que la pantalla de inicio no muestre un valor viejo.
    setState((s) => makeInitialState(Math.max(s.bestLevelEver, s.maxLevelThisSession), s.unlockedMilestones));
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
