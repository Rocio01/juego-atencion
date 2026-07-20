import { describe, expect, it } from 'vitest';
import { MILESTONE_STEP, isMilestoneLevel, unlockNewMilestones } from './achievements';

describe('isMilestoneLevel', () => {
  it('es verdadero en múltiplos de 5', () => {
    expect(isMilestoneLevel(5)).toBe(true);
    expect(isMilestoneLevel(10)).toBe(true);
    expect(isMilestoneLevel(100)).toBe(true);
  });

  it('es falso fuera de los múltiplos de 5, y en 0', () => {
    expect(isMilestoneLevel(1)).toBe(false);
    expect(isMilestoneLevel(4)).toBe(false);
    expect(isMilestoneLevel(6)).toBe(false);
    expect(isMilestoneLevel(0)).toBe(false);
  });
});

describe('unlockNewMilestones', () => {
  it('desbloquea una medalla nueva al llegar a un múltiplo de 5', () => {
    const result = unlockNewMilestones([], 5);
    expect(result).toEqual({ milestones: [5], newlyUnlocked: 5 });
  });

  it('no hace nada si el nivel no es un hito', () => {
    const result = unlockNewMilestones([5], 7);
    expect(result).toEqual({ milestones: [5], newlyUnlocked: null });
  });

  it('no duplica una medalla ya desbloqueada', () => {
    const result = unlockNewMilestones([5, 10], 10);
    expect(result).toEqual({ milestones: [5, 10], newlyUnlocked: null });
  });

  it('mantiene la lista ordenada aunque los hitos lleguen fuera de orden', () => {
    const result = unlockNewMilestones([10], 5);
    expect(result).toEqual({ milestones: [5, 10], newlyUnlocked: 5 });
  });

  it('sigue desbloqueando medallas sin techo', () => {
    let milestones: number[] = [];
    for (let level = 1; level <= MILESTONE_STEP * 6; level++) {
      const result = unlockNewMilestones(milestones, level);
      milestones = result.milestones;
    }
    expect(milestones).toEqual([5, 10, 15, 20, 25, 30]);
  });
});
