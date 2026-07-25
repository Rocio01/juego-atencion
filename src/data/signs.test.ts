import { describe, expect, it } from 'vitest';
import { SIGN_CATALOG, buildSignQuestionOptions, placeTargetSign } from './signs';

const curvaDerecha = SIGN_CATALOG.find((s) => s.id === 'curva-derecha')!;
const velocidad60 = SIGN_CATALOG.find((s) => s.id === 'velocidad-60')!;

describe('catálogo de señales', () => {
  it('tiene 4 familias de forma cubriendo 9 señales', () => {
    expect(SIGN_CATALOG.length).toBe(9);
    const byShape = SIGN_CATALOG.reduce<Record<string, number>>((acc, s) => {
      acc[s.shape] = (acc[s.shape] ?? 0) + 1;
      return acc;
    }, {});
    expect(byShape).toEqual({ octagono: 1, triangulo: 2, circulo: 3, rombo: 3 });
  });
});

describe('placeTargetSign', () => {
  it('asigna un sector dentro de 0-5', () => {
    for (let i = 0; i < 20; i++) {
      const placed = placeTargetSign(curvaDerecha);
      expect(placed.sign).toBe(curvaDerecha);
      expect(placed.sector).toBeGreaterThanOrEqual(0);
      expect(placed.sector).toBeLessThanOrEqual(5);
    }
  });
});

describe('buildSignQuestionOptions', () => {
  it('siempre incluye la señal objetivo', () => {
    for (let i = 0; i < 20; i++) {
      const options = buildSignQuestionOptions(curvaDerecha);
      expect(options.map((o) => o.id)).toContain(curvaDerecha.id);
    }
  });

  it('no repite señales y respeta el máximo de opciones', () => {
    const options = buildSignQuestionOptions(curvaDerecha, 4);
    expect(options.length).toBeLessThanOrEqual(4);
    const ids = options.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prioriza señales de la misma familia como distractoras', () => {
    // velocidad-60 (círculo) tiene 2 hermanos círculo: velocidad-80 y velocidad-100
    for (let i = 0; i < 20; i++) {
      const options = buildSignQuestionOptions(velocidad60, 3);
      expect(options).toHaveLength(3);
      options.forEach((o) => expect(o.shape).toBe('circulo'));
    }
  });
});
