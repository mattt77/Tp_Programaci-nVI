import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PokemonItem } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private cacheGeneraciones = new Map<number, PokemonItem[]>();

  constructor(private http: HttpClient) {}

  getGeneracion(numero: number): Observable<PokemonItem[]> {
    const guardado = this.cacheGeneraciones.get(numero);
    if (guardado) {
      return of(guardado);
    }

    return this.http
      .get<any>(`${environment.pokeApiUrl}/generation/${numero}`)
      .pipe(
        map((res): PokemonItem[] =>
          res.pokemon_species
            .map((especie: any) => {
              const id = Number(especie.url.split('/').filter(Boolean).pop());
              return {
                id,
                name: especie.name,
                imagen: `${environment.spritesUrl}/${id}.png`,
              };
            })
            .sort((a: PokemonItem, b: PokemonItem) => a.id - b.id)
        ),
        tap((lista) => this.cacheGeneraciones.set(numero, lista))
      );
  }
}