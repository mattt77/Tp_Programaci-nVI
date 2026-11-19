import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface NombresEs {
  tipos: Record<string, string>;
  naturalezas: Record<string, string>;
  ataques: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class NombresService {
  private datos: NombresEs = { tipos: {}, naturalezas: {}, ataques: {} };
  private carga$?: Observable<NombresEs>;

  constructor(private http: HttpClient) {}

  cargar(): Observable<NombresEs> {
    if (!this.carga$) {
      this.carga$ = this.http.get<NombresEs>(environment.nombresUrl).pipe(
        tap({
          next: (d) => (this.datos = d),
          error: () => (this.carga$ = undefined),
        }),
        shareReplay(1)
      );
    }
    return this.carga$;
  }

  tipo(clave: string): string {
    return this.datos.tipos[clave] ?? this.formatear(clave);
  }

  naturaleza(clave: string): string {
    return this.datos.naturalezas[clave] ?? this.formatear(clave);
  }

  ataque(clave: string): string {
    return this.datos.ataques[clave] ?? this.formatear(clave);
  }

  private formatear(clave: string): string {
    const texto = clave.replace(/-/g, ' ');
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}