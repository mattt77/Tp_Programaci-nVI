export type ClaveStat =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export type Stats = Record<ClaveStat, number>;

export const CLAVES_STATS: ClaveStat[] = [
  'hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed',
];

export const MAX_MIEMBROS = 6;
export const MAX_ATAQUES = 4;
export const MAX_EV = 252;
export const MAX_EVS_TOTAL = 510;
export const MAX_IV = 31;

export interface MiembroEquipo {
  pokemonId: number;
  name: string;
  imagen: string;
  tipos: string[];
  nivel: number;
  naturaleza: string;   // clave en inglés (ej. 'adamant'); se muestra traducida
  ataques: string[];    // claves en inglés, máximo 4
  evs: Stats;
  ivs: Stats;
  shiny: boolean;       // se usará cuando la trivia desbloquee shinys
}

export interface Equipo {
  id: string;
  nombre: string;
  miembros: MiembroEquipo[];
  actualizado: number;
}