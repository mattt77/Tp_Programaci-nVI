import { Injectable } from '@angular/core';
import { ClaveTexto, Idioma, TEXTOS } from '../i18n/textos';

@Injectable({ providedIn: 'root' })
export class IdiomaService {
  private readonly clave = 'pokedex-idioma';
  private elegido = false;
  idioma: Idioma = 'es';

  constructor() {
    const guardado = this.leer();
    if (guardado === 'es' || guardado === 'en') {
      this.idioma = guardado;
      this.elegido = true;
    }
    document.documentElement.lang = this.idioma;
  }

  yaEligio(): boolean {
    return this.elegido;
  }

  cambiar(idioma: Idioma) {
    this.idioma = idioma;
    this.elegido = true;
    document.documentElement.lang = idioma;
    try {
      localStorage.setItem(this.clave, idioma);
    } catch {}
  }

  t(clave: ClaveTexto): string {
    return TEXTOS[this.idioma][clave];
  }

  private leer(): string | null {
    try {
      return localStorage.getItem(this.clave);
    } catch {
      return null;
    }
  }
}