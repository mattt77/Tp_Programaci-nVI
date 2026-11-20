export type Idioma = 'es' | 'en';

const es = {
  'tabs.pokedex': 'Pokédex',
  'tabs.equipo': 'Equipo',
  'tabs.trivia': 'Trivia',
  'comun.reintentar': 'Reintentar',
  'comun.cerrar': 'Cerrar',
  'pokedex.buscar': 'Buscar por nombre o número',
  'pokedex.error': 'No se pudieron cargar los Pokémon. Revisa tu conexión.',
  'pokedex.vacio': 'No se encontraron Pokémon.',
  'detalle.error': 'No se pudo cargar el detalle del Pokémon.',
  'detalle.altura': 'Altura',
  'detalle.peso': 'Peso',
  'detalle.stats': 'Stats base',
  'detalle.debilidades': 'Debilidades',
  'detalle.sinDebilidades': 'Sin debilidades.',
  'detalle.resistencias': 'Resistencias',
  'detalle.sinResistencias': 'Sin resistencias.',
  'detalle.inmunidades': 'Inmunidades',
  'stat.hp': 'PS',
  'stat.attack': 'Ataque',
  'stat.defense': 'Defensa',
  'stat.special-attack': 'At. Esp.',
  'stat.special-defense': 'Def. Esp.',
  'stat.speed': 'Velocidad',
  'comun.cancelar': 'Cancelar',
};

export type ClaveTexto = keyof typeof es;

const en: Record<ClaveTexto, string> = {
  'tabs.pokedex': 'Pokédex',
  'tabs.equipo': 'Team',
  'tabs.trivia': 'Trivia',
  'comun.reintentar': 'Retry',
  'comun.cerrar': 'Close',
  'pokedex.buscar': 'Search by name or number',
  'pokedex.error': 'Could not load Pokémon. Check your connection.',
  'pokedex.vacio': 'No Pokémon found.',
  'detalle.error': 'Could not load Pokémon details.',
  'detalle.altura': 'Height',
  'detalle.peso': 'Weight',
  'detalle.stats': 'Base stats',
  'detalle.debilidades': 'Weaknesses',
  'detalle.sinDebilidades': 'No weaknesses.',
  'detalle.resistencias': 'Resistances',
  'detalle.sinResistencias': 'No resistances.',
  'detalle.inmunidades': 'Immunities',
  'stat.hp': 'HP',
  'stat.attack': 'Attack',
  'stat.defense': 'Defense',
  'stat.special-attack': 'Sp. Atk',
  'stat.special-defense': 'Sp. Def',
  'stat.speed': 'Speed',
  'comun.cancelar': 'Cancel',
};

export const TEXTOS: Record<Idioma, Record<ClaveTexto, string>> = { es, en };