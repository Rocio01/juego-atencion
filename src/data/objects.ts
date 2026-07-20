import type {
  BirdVariant,
  BoatVariant,
  CentralObject,
  ObjectCategory,
  ObjectDef,
  VehicleVariant,
} from '../types';
import { pickRandom, randomInt } from '../utils';

export const VEHICLE_DEFS: ObjectDef[] = [
  { category: 'vehiculo', variant: 'sedan', label: 'Sedán' },
  { category: 'vehiculo', variant: 'pickup', label: 'Pickup' },
  { category: 'vehiculo', variant: 'deportivo', label: 'Deportivo' },
  { category: 'vehiculo', variant: 'camioneta', label: 'Camioneta' },
  { category: 'vehiculo', variant: 'camion', label: 'Camión' },
  { category: 'vehiculo', variant: 'furgoneta', label: 'Furgoneta' },
];

export const BIRD_DEFS: ObjectDef[] = [
  { category: 'pajaro', variant: 'paloma', label: 'Paloma' },
  { category: 'pajaro', variant: 'aguila', label: 'Águila' },
  { category: 'pajaro', variant: 'colibri', label: 'Colibrí' },
];

export const BOAT_DEFS: ObjectDef[] = [
  { category: 'barco', variant: 'velero', label: 'Velero' },
  { category: 'barco', variant: 'lancha', label: 'Lancha' },
  { category: 'barco', variant: 'carga', label: 'Barco de carga' },
];

export const CATEGORY_DEFS: Record<ObjectCategory, ObjectDef[]> = {
  vehiculo: VEHICLE_DEFS,
  pajaro: BIRD_DEFS,
  barco: BOAT_DEFS,
};

export const CATEGORY_QUESTION: Record<ObjectCategory, string> = {
  vehiculo: '¿Qué vehículo viste?',
  pajaro: '¿Qué pájaro viste?',
  barco: '¿Qué barco viste?',
};

const CATEGORIES: ObjectCategory[] = ['vehiculo', 'pajaro', 'barco'];

export function pickCentralObject(): CentralObject {
  const category = pickRandom(CATEGORIES);
  const def = pickRandom(CATEGORY_DEFS[category]);
  const accentIndex = randomInt(3) as 0 | 1 | 2;
  return { def, accentIndex };
}

export function defsForVariant(variant: VehicleVariant | BirdVariant | BoatVariant): ObjectDef {
  const all = [...VEHICLE_DEFS, ...BIRD_DEFS, ...BOAT_DEFS];
  const found = all.find((d) => d.variant === variant);
  if (!found) throw new Error(`Variante desconocida: ${variant}`);
  return found;
}
