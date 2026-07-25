import type { GeoShapeKind, PlacedGeoShape } from '../types';
import { sample } from '../utils';
import { TOTAL_SECTORS } from './sectors';

export const GEO_SHAPE_CATALOG: GeoShapeKind[] = ['cuadrado', 'estrella', 'cruz', 'hexagono', 'pentagono'];

// Ruido visual, no señales: sin rojo/amarillo, sin íconos ni texto, para que
// nunca se puedan confundir con la señal objetivo. Compiten por atención,
// no por identidad.
export function pickDistractorShapes(count: number): GeoShapeKind[] {
  if (count <= 0) return [];
  return sample(GEO_SHAPE_CATALOG, count);
}

export function placeGeoShapes(shapes: GeoShapeKind[], excludeSector: number): PlacedGeoShape[] {
  const availableSectors = Array.from({ length: TOTAL_SECTORS }, (_, i) => i).filter((i) => i !== excludeSector);
  const sectors = sample(availableSectors, shapes.length);
  return shapes.map((shape, i) => ({ shape, sector: sectors[i] }));
}
