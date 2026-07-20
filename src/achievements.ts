// Medallas: un logro permanente cada 5 niveles (5, 10, 15, 20...), sin techo.
// Se desbloquean apenas se alcanza el nivel, no hace falta terminar la
// sesión ni llegar a la pantalla de resumen.

export const MILESTONE_STEP = 5;

export function isMilestoneLevel(level: number): boolean {
  return level > 0 && level % MILESTONE_STEP === 0;
}

export interface MilestoneUnlockResult {
  milestones: number[];
  newlyUnlocked: number | null;
}

// Función pura: dado el set de medallas ya desbloqueadas y el nivel actual,
// decide si hay una medalla nueva para sumar.
export function unlockNewMilestones(current: number[], level: number): MilestoneUnlockResult {
  if (!isMilestoneLevel(level) || current.includes(level)) {
    return { milestones: current, newlyUnlocked: null };
  }
  const milestones = [...current, level].sort((a, b) => a - b);
  return { milestones, newlyUnlocked: level };
}

// --- Persistencia ------------------------------------------------------

const MILESTONES_KEY = 'atencion:unlockedMilestones';

export function loadUnlockedMilestones(): number[] {
  try {
    const raw = localStorage.getItem(MILESTONES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((n): n is number => typeof n === 'number' && isMilestoneLevel(n));
  } catch {
    return [];
  }
}

export function saveUnlockedMilestones(milestones: number[]): void {
  try {
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(milestones));
  } catch {
    // localStorage no disponible (ej. navegación privada); se ignora.
  }
}
