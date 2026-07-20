import { describe, expect, it } from 'vitest';
import { BIRD_DEFS, BOAT_DEFS, CATEGORY_DEFS, VEHICLE_DEFS, pickCentralObject } from './objects';

describe('catálogos de objeto central', () => {
  it('tiene 6 variantes de vehículo, 3 de pájaro y 3 de barco', () => {
    expect(VEHICLE_DEFS).toHaveLength(6);
    expect(BIRD_DEFS).toHaveLength(3);
    expect(BOAT_DEFS).toHaveLength(3);
  });

  it('todas las variantes dentro de una categoría tienen id único', () => {
    for (const defs of Object.values(CATEGORY_DEFS)) {
      const variants = defs.map((d) => d.variant);
      expect(new Set(variants).size).toBe(variants.length);
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
