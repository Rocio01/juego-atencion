import { describe, expect, it } from 'vitest';
import {
  BIRD_DEFS,
  BOAT_DEFS,
  CATEGORY_DEFS,
  VEHICLE_DEFS,
  buildObjectQuestionOptions,
  pickCentralObject,
} from './objects';

describe('catálogos de objeto central', () => {
  it('tiene 6 variantes de cada categoría', () => {
    expect(VEHICLE_DEFS).toHaveLength(6);
    expect(BIRD_DEFS).toHaveLength(6);
    expect(BOAT_DEFS).toHaveLength(6);
  });

  it('todas las variantes dentro de una categoría tienen id único', () => {
    for (const defs of Object.values(CATEGORY_DEFS)) {
      const variants = defs.map((d) => d.variant);
      expect(new Set(variants).size).toBe(variants.length);
    }
  });
});

describe('buildObjectQuestionOptions', () => {
  it('devuelve la cantidad pedida para toda categoría en el caso base (3)', () => {
    for (let i = 0; i < 20; i++) {
      expect(buildObjectQuestionOptions(VEHICLE_DEFS[0], 3)).toHaveLength(3);
      expect(buildObjectQuestionOptions(BIRD_DEFS[0], 3)).toHaveLength(3);
      expect(buildObjectQuestionOptions(BOAT_DEFS[0], 3)).toHaveLength(3);
    }
  });

  it('todas las categorías pueden crecer hasta 5 opciones en niveles altos', () => {
    for (let i = 0; i < 20; i++) {
      expect(buildObjectQuestionOptions(VEHICLE_DEFS[0], 5)).toHaveLength(5);
      expect(buildObjectQuestionOptions(BIRD_DEFS[0], 5)).toHaveLength(5);
      expect(buildObjectQuestionOptions(BOAT_DEFS[0], 5)).toHaveLength(5);
    }
  });

  it('si se pidieran más opciones que variantes, recorta al catálogo disponible', () => {
    expect(buildObjectQuestionOptions(BIRD_DEFS[0], 10)).toHaveLength(6);
  });

  it('siempre incluye la variante correcta y no repite opciones', () => {
    for (let i = 0; i < 20; i++) {
      const correct = VEHICLE_DEFS[2];
      const options = buildObjectQuestionOptions(correct);
      const variants = options.map((o) => o.variant);
      expect(variants).toContain(correct.variant);
      expect(new Set(variants).size).toBe(variants.length);
    }
  });

  it('todas las opciones pertenecen a la categoría del objeto correcto', () => {
    for (let i = 0; i < 20; i++) {
      const options = buildObjectQuestionOptions(BIRD_DEFS[1]);
      options.forEach((o) => expect(o.category).toBe('pajaro'));
    }
  });
});

describe('pickCentralObject', () => {
  it('devuelve un objeto cuya variante pertenece a su propia categoría', () => {
    for (let i = 0; i < 30; i++) {
      const obj = pickCentralObject();
      const variantsInCategory = CATEGORY_DEFS[obj.def.category].map((d) => d.variant);
      expect(variantsInCategory).toContain(obj.def.variant);
    }
  });

  it('el índice de acento siempre es 0, 1 o 2', () => {
    for (let i = 0; i < 30; i++) {
      const obj = pickCentralObject();
      expect([0, 1, 2]).toContain(obj.accentIndex);
    }
  });
});
