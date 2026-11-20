import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PokemonDetalle, PokemonItem } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private cacheGeneraciones = new Map<number, PokemonItem[]>();
  private cacheDetalles = new Map<number, PokemonDetalle>();
  private cacheTodos?: PokemonItem[];

  constructor(private http: HttpClient) {}

  getGeneracion(numero: number): Observable<PokemonItem[]> {
    const guardado = this.cacheGeneraciones.get(numero);
    if (guardado) {
      return of(guardado);
    }

    return this.http
      .get<any>(`${environment.pokeApiUrl}/generation/${numero}`)
      .pipe(
        map((res) => this.aItems(res.pokemon_species)),
        tap((lista) => this.cacheGeneraciones.set(numero, lista))
      );
  }

  getTodos(): Observable<PokemonItem[]> {
    if (this.cacheTodos) {
      return of(this.cacheTodos);
    }

    return this.http
      .get<any>(`${environment.pokeApiUrl}/pokemon-species?limit=2000`)
      .pipe(
        map((res) => this.aItems(res.results)),
        tap((lista) => (this.cacheTodos = lista))
      );
  }

  getDetalle(id: number): Observable<PokemonDetalle> {
    const guardado = this.cacheDetalles.get(id);
    if (guardado) {
      return of(guardado);
    }

    return this.http.get<any>(`${environment.pokeApiUrl}/pokemon/${id}`).pipe(
      map(
        (p): PokemonDetalle => ({
          id: p.id,
          name: p.name,
          imagen: `${environment.spritesUrl}/other/official-artwork/${p.id}.png`,
          tipos: p.types.map((t: any) => t.type.name),
          altura: p.height / 10,
          peso: p.weight / 10,
          stats: p.stats.map((s: any) => ({
            clave: s.stat.name,
            valor: s.base_stat,
          })),
          ataques: p.moves.map((m: any) => m.move.name),
        })
      ),
      tap((detalle) => this.cacheDetalles.set(id, detalle))
    );
  }

  // Convierte la lista de especies de la API en PokemonItem ordenados por número
  private aItems(especies: any[]): PokemonItem[] {
    return especies
      .map((especie: any) => {
        const id = Number(especie.url.split('/').filter(Boolean).pop());
        return {
          id,
          name: especie.name,
          imagen: `${environment.spritesUrl}/${id}.png`,
        };
      })
      .sort((a, b) => a.id - b.id);
  }
}