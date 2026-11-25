import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  CATEGORIAS,
  Categoria,
  ConfigDificultad,
  DIFICULTADES,
  Dificultad,
  FIN_GENERACION,
  PREGUNTAS_POR_RONDA,
  Pregunta,
  ROMANOS,
} from '../models/trivia.model';
import { IdiomaService } from './idioma.service';
import { NombresService } from './nombres.service';
import { PokemonService } from './pokemon.service';
import { TIPOS, TiposService } from './tipos.service';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  constructor(
    private pokemonService: PokemonService,
    private tiposService: TiposService,
    private nombres: NombresService,
    private idioma: IdiomaService
  ) {}

  // Carga lo necesario antes de empezar: lista de Pokémon, tabla de tipos y nombres
  preparar(): Observable<void> {
    return forkJoin([
      this.pokemonService.getTodos(),
      this.tiposService.cargar(),
      this.nombres.cargar(),
    ]).pipe(map(() => undefined));
  }

  categoriaAlAzar(): Categoria {
    return this.alAzar(CATEGORIAS);
  }

  generar(categoria: Categoria, dificultad: Dificultad): Observable<Pregunta> {
    const config = DIFICULTADES[dificultad];
    if (categoria === 'silueta') {
      return this.preguntaSilueta(config);
    }
    if (categoria === 'generacion') {
      return this.preguntaGeneracion(config);
    }
    // Tipos: mitad de las veces "tipo de un Pokémon", mitad "qué es súper eficaz"
    return Math.random() < 0.5 ? this.preguntaTipoPokemon(config) : this.preguntaEficacia(config);
  }

  // Fichas que se ganan al terminar la ronda: solo con todas correctas
  recompensa(dificultad: Dificultad, aciertos: number): number {
    return aciertos === PREGUNTAS_POR_RONDA ? DIFICULTADES[dificultad].recompensa : 0;
  }

  generacionDe(id: number): number {
    const indice = FIN_GENERACION.findIndex((fin) => id <= fin);
    return indice === -1 ? FIN_GENERACION.length : indice + 1;
  }

  // ---------- Categorías ----------

  private preguntaSilueta(config: ConfigDificultad): Observable<Pregunta> {
    return this.pokemonService.getTodos().pipe(
      map((todos) => {
        const pool = todos.filter((p) => p.id <= config.maxId);
        const elegidos = this.variosAlAzar(pool, config.opciones);
        const correcto = elegidos[0];
        const opciones = this.mezclar(elegidos);
        return {
          categoria: 'silueta',
          enunciado: this.idioma.t('trivia.preguntaSilueta'),
          imagen: this.artwork(correcto.id),
          silueta: true,
          opciones: opciones.map((p) => this.nombres.formatear(p.name)),
          correcta: opciones.indexOf(correcto),
        };
      })
    );
  }

  private preguntaTipoPokemon(config: ConfigDificultad): Observable<Pregunta> {
    return this.pokemonService.getTodos().pipe(
      switchMap((todos) => {
        const pokemon = this.alAzar(todos.filter((p) => p.id <= config.maxId));
        return this.pokemonService.getDetalle(pokemon.id);
      }),
      map((detalle) => {
        const correcto = this.alAzar(detalle.tipos);
        const otros = this.variosAlAzar(
          TIPOS.filter((t) => !detalle.tipos.includes(t)),
          config.opciones - 1
        );
        const opciones = this.mezclar([correcto, ...otros]);
        return {
          categoria: 'tipos',
          enunciado: this.idioma
            .t('trivia.preguntaTipoPokemon')
            .replace('{nombre}', this.nombres.formatear(detalle.name)),
          imagen: detalle.imagen,
          silueta: false,
          opciones: opciones.map((t) => this.nombres.tipo(t)),
          correcta: opciones.indexOf(correcto),
        };
      })
    );
  }

  private preguntaEficacia(config: ConfigDificultad): Observable<Pregunta> {
    const defensor = this.alAzar(TIPOS);
    const fuertes = TIPOS.filter((t) => this.tiposService.multiplicador(t, [defensor]) > 1);
    const resto = TIPOS.filter((t) => this.tiposService.multiplicador(t, [defensor]) <= 1);
    const correcto = this.alAzar(fuertes);
    const opciones = this.mezclar([correcto, ...this.variosAlAzar(resto, config.opciones - 1)]);

    return of({
      categoria: 'tipos',
      enunciado: this.idioma
        .t('trivia.preguntaEficacia')
        .replace('{tipo}', this.nombres.tipo(defensor)),
      silueta: false,
      opciones: opciones.map((t) => this.nombres.tipo(t)),
      correcta: opciones.indexOf(correcto),
    });
  }

  private preguntaGeneracion(config: ConfigDificultad): Observable<Pregunta> {
    return this.pokemonService.getTodos().pipe(
      map((todos) => {
        // Siempre con todas las generaciones, si no en Fácil la respuesta sería siempre Gen I
        const pokemon = this.alAzar(todos);
        const generacion = this.generacionDe(pokemon.id);
        const otras = this.variosAlAzar(
          ROMANOS.map((_, i) => i + 1).filter((g) => g !== generacion),
          config.opciones - 1
        );
        const opciones = this.mezclar([generacion, ...otras]);
        return {
          categoria: 'generacion',
          enunciado: this.idioma
            .t('trivia.preguntaGeneracion')
            .replace('{nombre}', this.nombres.formatear(pokemon.name)),
          imagen: this.artwork(pokemon.id),
          silueta: false,
          opciones: opciones.map((g) => `${this.idioma.t('trivia.generacion')} ${ROMANOS[g - 1]}`),
          correcta: opciones.indexOf(generacion),
        };
      })
    );
  }

  // ---------- Ayudantes ----------

  private artwork(id: number): string {
    return `${environment.spritesUrl}/other/official-artwork/${id}.png`;
  }

  private alAzar<T>(lista: T[]): T {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // Algoritmo de Fisher-Yates: desordena una copia de la lista
  private mezclar<T>(lista: T[]): T[] {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  private variosAlAzar<T>(lista: T[], cantidad: number): T[] {
    return this.mezclar(lista).slice(0, cantidad);
  }
}