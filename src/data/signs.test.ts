import { describe, expect, it } from 'vitest';
import {
  SIGN_CATALOG,
  buildSignQuestionOptions,
  pickDistractorSigns,
  placeSignsInSectors,
} from './signs';

const alto = SIGN_CATALOG.find((s) => s.id === 'alto')!;
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

describe('pickDistractorSigns', () => {
  it('devuelve un arreglo vacío si count es 0', () => {
    expect(pickDistractorSigns(alto, 0, true)).toEqual([]);
  });

  it('nunca incluye al objetivo ni se repite a sí mismo', () => {
    for (let i = 0; i < 30; i++) {
      const distractors = pickDistractorSigns(curvaDerecha, 2, true);
      const ids = distractors.map((d) => d.id);
      expect(ids).not.toContain(curvaDerecha.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('con preferSameFamily y suficientes hermanos, elige la misma familia (rombo)', () => {
    // curva-derecha (rombo) tiene 2 hermanos rombo: curva-izquierda y cruce-ferrocarril
    for (let i = 0; i < 20; i++) {
      const distractors = pickDistractorSigns(curvaDerecha, 2, true);
      expect(distractors).toHaveLength(2);
      distractors.forEach((d) => expect(d.shape).toBe('rombo'));
    }
  });

  it('con preferSameFamily=false, evita la familia del objetivo', () => {
    for (let i = 0; i < 20; i++) {
      const distractors = pickDistractorSigns(velocidad60, 1, false);
      expect(distractors).toHaveLength(1);
      expect(distractors[0].shape).not.toBe('circulo');
    }
  });

  it('si la familia del objetivo no tiene hermanos (octágono), cae a otra familia', () => {
    // "alto" es la única señal octágono: no hay con quién ser "parecida"
    for (let i = 0; i < 20; i++) {
      const distractors = pickDistractorSigns(alto, 1, true);
      expect(distractors).toHaveLength(1);
      expect(distractors[0].shape).not.toBe('octagono');
    }
  });
});

describe('placeSignsInSectors', () => {
  it('asigna sectores distintos dentro de 0-5', () => {
    const signs = [alto, curvaDerecha, velocidad60];
    const placed = placeSignsInSectors(signs);
    expect(placed).toHaveLength(3);
    const sectors = placed.map((p) => p.sector);
    expect(new Set(sectors).size).toBe(3);
    sectors.forEach((s) => {
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(5);
    });
  });
});

describe('buildSignQuestionOptions', () => {
  it('siempre incluye la señal objetivo', () => {
    for (let i = 0; i < 20; i++) {
      const options = buildSignQuestionOptions(curvaDerecha, []);
      expect(options.map((o) => o.id)).toContain(curvaDerecha.id);
    }
  });

  it('no repite señales y respeta el máximo de opciones', () => {
    const options = buildSignQuestionOptions(curvaDerecha, [alto], 4);
    expect(options.length).toBeLessThanOrEqual(4);
    const ids = options.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('incluye las señales que realmente aparecieron como distractoras', () => {
    const options = buildSignQuestionOptions(velocidad60, [alto]);
    expect(options.map((o) => o.id)).toContain('alto');
  });
});
