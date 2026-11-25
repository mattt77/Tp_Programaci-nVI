export type Dificultad = 'facil' | 'normal' | 'dificil';
export type Categoria = 'silueta' | 'tipos' | 'generacion';

export const CATEGORIAS: Categoria[] = ['silueta', 'tipos', 'generacion'];
export const DIFICULTADES_LISTA: Dificultad[] = ['facil', 'normal', 'dificil'];
export const PREGUNTAS_POR_RONDA = 10;

export interface ConfigDificultad {
  maxId: number;      // hasta qué número de Pokédex pueden aparecer
  opciones: number;   // cuántas respuestas para elegir
  recompensa: number; // fichas shiny si se responden las 10 bien
}

export const DIFICULTADES: Record<Dificultad, ConfigDificultad> = {
  facil: { maxId: 151, opciones: 3, recompensa: 1 },
  normal: { maxId: 493, opciones: 4, recompensa: 1 },
  dificil: { maxId: 1025, opciones: 4, recompensa: 2 },
};

// Último número de Pokédex de cada generación (Gen I termina en 151, etc.)
export const FIN_GENERACION = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
export const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

export interface Pregunta {
  categoria: Categoria;
  enunciado: string;
  imagen?: string;
  silueta: boolean;   // true = la imagen se muestra en negro hasta responder
  opciones: string[];
  correcta: number;   // posición de la respuesta correcta en opciones
}