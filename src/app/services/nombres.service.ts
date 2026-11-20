import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Idioma } from '../i18n/textos';
import { IdiomaService } from './idioma.service';

export interface NombresDatos {
  tipos: Record<string, string>;
  naturalezas: Record<string, string>;
  ataques: Record<string, string>;
}

const VACIO: NombresDatos = { tipos: {}, naturalezas: {}, ataques: {} };

@Injectable({ providedIn: 'root' })
export class NombresService {
  private datos: Record<Idioma, NombresDatos> = { es: VACIO, en: VACIO };
  private carga$?: Observable<void>;

  constructor(private http: HttpClient, private idioma: IdiomaService) {}

  cargar(): Observable<void> {
    if (!this.carga$) {
      this.carga$ = forkJoin({
        es: this.http.get<NombresDatos>(environment.nombresEsUrl),
        en: this.http.get<NombresDatos>(environment.nombresEnUrl),
      }).pipe(
        tap({
          next: (d) => (this.datos = d),
          error: () => (this.carga$ = undefined),
        }),
        map(() => undefined),
        shareReplay(1)
      );
    }
    return this.carga$;
  }

  // En el idioma elegido por el usuario
  tipo(clave: string): string {
    return this.buscar('tipos', clave, this.idioma.idioma);
  }

  naturaleza(clave: string): string {
    return this.buscar('naturalezas', clave, this.idioma.idioma);
  }

  ataque(clave: string): string {
    return this.buscar('ataques', clave, this.idioma.idioma);
  }

  // Siempre en inglés, para exportar a Showdown
  naturalezaShowdown(clave: string): string {
    return this.buscar('naturalezas', clave, 'en');
  }

  ataqueShowdown(clave: string): string {
    return this.buscar('ataques', clave, 'en');
  }
  // Las 25 naturalezas (claves en inglés), tomadas del archivo de nombres
  clavesNaturalezas(): string[] {
    return Object.keys(this.datos.en.naturalezas);
  }
  formatear(clave: string): string {
    return clave
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }

  private buscar(grupo: keyof NombresDatos, clave: string, idioma: Idioma): string {
    return this.datos[idioma][grupo][clave] ?? this.formatear(clave);
  }
}