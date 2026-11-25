import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FichasService {
  private readonly clave = 'pokedex-fichas-shiny';

  constructor() {}

  cantidad(): number {
    try {
      return Number(localStorage.getItem(this.clave)) || 0;
    } catch {
      return 0;
    }
  }

  sumar(cantidad: number) {
    this.guardar(this.cantidad() + cantidad);
  }

  // Devuelve false si no había fichas para gastar
  gastar(): boolean {
    const actual = this.cantidad();
    if (actual <= 0) {
      return false;
    }
    this.guardar(actual - 1);
    return true;
  }

  devolver() {
    this.sumar(1);
  }

  private guardar(valor: number) {
    try {
      localStorage.setItem(this.clave, String(valor));
    } catch {}
  }
}