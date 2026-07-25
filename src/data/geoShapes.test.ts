import { describe, expect, it } from 'vitest';
import { GEO_SHAPE_CATALOG, pickDistractorShapes, placeGeoShapes } from './geoShapes';

describe('pickDistractorShapes', () => {
  it('devuelve un arreglo vacío si count es 0', () => {
    expect(pickDistractorShapes(0)).toEqual([]);
  });

  it('devuelve la cantidad pedida sin repetir formas', () => {
    for (let i = 0; i < 20; i++) {
      const shapes = pickDistractorShapes(2);
      expect(shapes).toHaveLength(2);
      expect(new Set(shapes).size).toBe(2);
      shapes.forEach((s) => expect(GEO_SHAPE_CATALOG).toContain(s));
    }
  });
});

describe('placeGeoShapes', () => {
  it('nunca usa el sector excluido (el de la señal objetivo)', () => {
    for (let i = 0; i < 20; i++) {
      const placed = placeGeoShapes(['cuadrado', 'estrella'], 2);
      expect(placed).toHaveLength(2);
      placed.forEach((p) => expect(p.sector).not.toBe(2));
    }
  });

  it('asigna sectores distintos entre sí y dentro de 0-5', () => {
    const placed = placeGeoShapes(['cuadrado', 'estrella'], 0);
    const sectors = placed.map((p) => p.sector);
    expect(new Set(sectors).size).toBe(sectors.length);
    sectors.forEach((s) => {
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(5);
    });
  });
});
