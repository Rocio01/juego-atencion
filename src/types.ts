// Paletas de color

export type PaletteName = 'terracota' | 'marino' | 'bosque';

export interface Palette {
  name: PaletteName;
  label: string;
  bg: string;
  bg2: string;
  text: string;
  primary: string;
  primaryText: string;
  line: string;
  good: string;
  warn: string;
  accents: [string, string, string];
}

// Estímulo central: vehículo, pájaro o barco

export type ObjectCategory = 'vehiculo' | 'pajaro' | 'barco';

export type VehicleVariant =
  | 'sedan'
  | 'pickup'
  | 'deportivo'
  | 'camioneta'
  | 'camion'
  | 'furgoneta';

export type BirdVariant = 'paloma' | 'aguila' | 'colibri' | 'buho' | 'pato' | 'flamenco';

export type BoatVariant = 'velero' | 'lancha' | 'carga' | 'canoa' | 'pesquero' | 'crucero';

export type ObjectVariant = VehicleVariant | BirdVariant | BoatVariant;

export interface ObjectDef {
  category: ObjectCategory;
  variant: ObjectVariant;
  label: string;
}

export interface CentralObject {
  def: ObjectDef;
  accentIndex: 0 | 1 | 2;
}

// Estímulo periférico: señales de tránsito

export type SignShape = 'octagono' | 'triangulo' | 'circulo' | 'rombo';

export type SignIcon = 'ceda' | 'peatonal' | 'curva-derecha' | 'curva-izquierda' | 'ferrocarril';

export interface SignDef {
  id: string;
  shape: SignShape;
  label: string;
  icon?: SignIcon;
  speed?: number;
}

export interface PlacedSign {
  sign: SignDef;
  sector: number; // 0-5
}

// Distractores periféricos: formas geométricas neutras (no señales reales),
// para que la única señal de tránsito visible en la rueda sea siempre la
// que hay que recordar.

export type GeoShapeKind = 'cuadrado' | 'estrella' | 'cruz' | 'hexagono' | 'pentagono';

export interface PlacedGeoShape {
  shape: GeoShapeKind;
  sector: number; // 0-5
}

// Configuración y resultado de una ronda

export interface RoundConfig {
  level: number;
  central: CentralObject;
  target: PlacedSign;
  distractors: PlacedGeoShape[];
  exposureMs: number;
  signOptions: SignDef[];
  objectOptions: ObjectDef[];
}

export interface RoundResult {
  level: number;
  objectCorrect: boolean;
  signCorrect: boolean;
  sectorCorrect: boolean;
  fullyCorrect: boolean;
}

// Máquina de estados del juego

export type GamePhase =
  | 'inicio'
  | 'estimulo'
  | 'blanco'
  | 'pregunta-objeto'
  | 'pregunta-senal'
  | 'pregunta-sector'
  | 'feedback'
  | 'pausa'
  | 'resumen';

export interface GameState {
  phase: GamePhase;
  phaseBeforePausa: GamePhase | null;
  level: number;
  streak: number;
  maxLevelThisSession: number;
  round: RoundConfig | null;
  objectAnswer: ObjectVariant | null;
  signAnswer: string | null;
  sectorAnswer: number | null;
  results: RoundResult[];
  lastRoundResult: RoundResult | null;
  bestLevelEver: number;
  unlockedMilestones: number[];
  justUnlockedMilestone: number | null;
}

export interface SessionSummary {
  roundsPlayed: number;
  maxLevelThisSession: number;
  bestLevelEver: number;
  isNewRecord: boolean;
  accuracyPct: number;
}
