import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const TIPOS = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

export interface Efectividad {
  tipo: string;
  multiplicador: number;
}

interface RelacionesTipo {
  doble: string[];
  mitad: string[];
  inmune: string[];
}

@Injectable({ providedIn: 'root' })
export class TiposService {
  private relaciones: Record<string, RelacionesTipo> = {};
  private carga$?: Observable<void>;

  constructor(private http: HttpClient) {}

  cargar(): Observable<void> {
    if (!this.carga$) {
      this.carga$ = forkJoin(
        TIPOS.map((t) => this.http.get<any>(`${environment.pokeApiUrl}/type/${t}`))
      ).pipe(
        tap({
          next: (resultados) => {
            resultados.forEach((r) => {
              this.relaciones[r.name] = {
                doble: r.damage_relations.double_damage_from.map((x: any) => x.name),
                mitad: r.damage_relations.half_damage_from.map((x: any) => x.name),
                inmune: r.damage_relations.no_damage_from.map((x: any) => x.name),
              };
            });
          },
          error: () => (this.carga$ = undefined),
        }),
        map(() => undefined),
        shareReplay(1)
      );
    }
    return this.carga$;
  }

  multiplicador(atacante: string, defensores: string[]): number {
    return defensores.reduce((total, defensor) => {
      const rel = this.relaciones[defensor];
      if (!rel) return total;
      if (rel.inmune.includes(atacante)) return 0;
      if (rel.doble.includes(atacante)) return total * 2;
      if (rel.mitad.includes(atacante)) return total * 0.5;
      return total;
    }, 1);
  }

  efectividades(defensores: string[]): Efectividad[] {
    return TIPOS.map((t) => ({
      tipo: t,
      multiplicador: this.multiplicador(t, defensores),
    }));
  }
}