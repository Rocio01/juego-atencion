import { describe, expect, it } from 'vitest';
import {
  DISTRACTOR_LEVEL_1,
  DISTRACTOR_LEVEL_2,
  MAX_EXPOSURE_MS,
  MIN_EXPOSURE_MS,
  distractorCountForLevel,
  exposureForLevel,
  generateRound,
  nextStaircaseState,
  preferSameFamilyForLevel,
} from './staircase';

describe('exposureForLevel', () => {
  it('empieza en el máximo en el nivel 1', () => {
    expect(exposureForLevel(1)).toBe(MAX_EXPOSURE_MS);
  });

  it('baja 80ms por nivel', () => {
    expect(exposureForLevel(2)).toBe(2320);
    expect(exposureForLevel(5)).toBe(2080);
  });

  it('toca el piso exactamente en el nivel 21 y no baja de ahí', () => {
    expect(exposureForLevel(21)).toBe(MIN_EXPOSURE_MS);
    expect(exposureForLevel(22)).toBe(MIN_EXPOSURE_MS);
    expect(exposureForLevel(500)).toBe(MIN_EXPOSURE_MS);
  });

  it('nunca devuelve un valor fuera de [MIN_EXPOSURE_MS, MAX_EXPOSURE_MS]', () => {
    for (let level = 1; level <= 60; level++) {
      const ms = exposureForLevel(level);
      expect(ms).toBeGreaterThanOrEqual(MIN_EXPOSURE_MS);
      expect(ms).toBeLessThanOrEqual(MAX_EXPOSURE_MS);
    }
  });
});

describe('distractorCountForLevel', () => {
  it('es 0 antes del primer umbral', () => {
    for (let level = 1; level < DISTRACTOR_LEVEL_1; level++) {
      expect(distractorCountForLevel(level)).toBe(0);
    }
  });

  it('es 1 entre el primer y el segundo umbral', () => {
    for (let level = DISTRACTOR_LEVEL_1; level < DISTRACTOR_LEVEL_2; level++) {
      expect(distractorCountForLevel(level)).toBe(1);
    }
  });

  it('es 2 desde el segundo umbral en adelante, sin techo', () => {
    expect(distractorCountForLevel(DISTRACTOR_LEVEL_2)).toBe(2);
    expect(distractorCountForLevel(1000)).toBe(2);
  });
});

describe('preferSameFamilyForLevel', () => {
  it('es falso justo antes del umbral de 2 distractores', () => {
    expect(preferSameFamilyForLevel(DISTRACTOR_LEVEL_2 - 1)).toBe(false);
  });

  it('es verdadero desde el umbral de 2 distractores', () => {
    expect(preferSameFamilyForLevel(DISTRACTOR_LEVEL_2)).toBe(true);
    expect(preferSameFamilyForLevel(DISTRACTOR_LEVEL_2 + 10)).toBe(true);
  });
});

describe('nextStaircaseState (regla 3-arriba / 1-abajo)', () => {
  it('un acierto aislado no sube de nivel, solo acumula racha', () => {
    const result = nextStaircaseState(true, { level: 1, streak: 0 });
    expect(result).toEqual({ level: 1, streak: 1 });
  });

  it('dos aciertos seguidos tampoco alcanzan para subir', () => {
    let s = { level: 1, streak: 0 };
    s = nextStaircaseState(true, s);
    s = nextStaircaseState(true, s);
    expect(s).toEqual({ level: 1, streak: 2 });
  });

  it('el tercer acierto seguido sube un nivel y reinicia la racha', () => {
    let s = { level: 1, streak: 0 };
    s = nextStaircaseState(true, s);
    s = nextStaircaseState(true, s);
    s = nextStaircaseState(true, s);
    expect(s).toEqual({ level: 2, streak: 0 });
  });

  it('un fallo baja un nivel y reinicia la racha', () => {
    const result = nextStaircaseState(false, { level: 5, streak: 2 });
    expect(result).toEqual({ level: 4, streak: 0 });
  });

  it('un fallo en el nivel 1 no baja del piso', () => {
    const result = nextStaircaseState(false, { level: 1, streak: 0 });
    expect(result).toEqual({ level: 1, streak: 0 });
  });

  it('una racha larga sube un nivel cada 3 aciertos consecutivos', () => {
    let s = { level: 1, streak: 0 };
    for (let i = 0; i < 9; i++) {
      s = nextStaircaseState(true, s);
    }
    expect(s).toEqual({ level: 4, streak: 0 });
  });

  it('un fallo interrumpe la racha antes de completar 3 aciertos', () => {
    let s = { level: 3, streak: 0 };
    s = nextStaircaseState(true, s); // streak 1
    s = nextStaircaseState(true, s); // streak 2
    s = nextStaircaseState(false, s); // corta la racha, baja de nivel
    expect(s).toEqual({ level: 2, streak: 0 });
  });
});

describe('generateRound', () => {
  it('genera la cantidad de distractores correspondiente al nivel', () => {
    expect(generateRound(1).distractors.length).toBe(0);
    expect(generateRound(DISTRACTOR_LEVEL_1).distractors.length).toBe(1);
    expect(generateRound(DISTRACTOR_LEVEL_2).distractors.length).toBe(2);
  });

  it('el objetivo y los distractores quedan en sectores distintos', () => {
    const round = generateRound(DISTRACTOR_LEVEL_2);
    const sectors = [round.target.sector, ...round.distractors.map((d) => d.sector)];
    expect(new Set(sectors).size).toBe(sectors.length);
    sectors.forEach((s) => {
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(5);
    });
  });

  it('las opciones de la pregunta de señal siempre incluyen la señal objetivo', () => {
    for (let i = 0; i < 20; i++) {
      const round = generateRound(DISTRACTOR_LEVEL_2);
      const ids = round.signOptions.map((s) => s.id);
      expect(ids).toContain(round.target.sign.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('la exposición del round coincide con exposureForLevel', () => {
    expect(generateRound(10).exposureMs).toBe(exposureForLevel(10));
  });
});
