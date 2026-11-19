export interface PokemonItem {
  id: number;
  name: string;
  imagen: string;
}
export interface StatBase {
  clave: string;
  valor: number;
}

export interface PokemonDetalle {
  id: number;
  name: string;
  imagen: string;
  tipos: string[];
  altura: number;
  peso: number;
  stats: StatBase[];
}

export const ETIQUETAS_STATS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};