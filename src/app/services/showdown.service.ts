import { Injectable } from '@angular/core';
import { CLAVES_STATS, ClaveStat, Equipo, MAX_IV, MiembroEquipo } from '../models/equipo.model';
import { NombresService } from './nombres.service';

const ABREV_EN: Record<ClaveStat, string> = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'Spe',
};

const ABREV_ES: Record<ClaveStat, string> = {
  hp: 'PS',
  attack: 'At',
  defense: 'Def',
  'special-attack': 'AtEsp',
  'special-defense': 'DefEsp',
  speed: 'Vel',
};

@Injectable({ providedIn: 'root' })
export class ShowdownService {
  constructor(private nombres: NombresService) {}

  // traducido = false → formato de Showdown en inglés (el que se puede importar)
  // traducido = true  → la misma información en español, solo para leer
  exportar(equipo: Equipo, traducido = false): string {
    return equipo.miembros
      .map((m) => this.exportarMiembro(m, traducido))
      .join('\n\n');
  }

  private exportarMiembro(m: MiembroEquipo, traducido: boolean): string {
    const abrev = traducido ? ABREV_ES : ABREV_EN;
    const lineas: string[] = [this.nombres.formatear(m.name)];

    if (m.nivel !== 100) {
      lineas.push(`${traducido ? 'Nivel' : 'Level'}: ${m.nivel}`);
    }

    if (m.shiny) {
      lineas.push(traducido ? 'Shiny: Sí' : 'Shiny: Yes');
    }

    if (traducido) {
      lineas.push(`Naturaleza: ${this.nombres.buscar('naturalezas', m.naturaleza, 'es')}`);
    } else {
      lineas.push(`${this.nombres.naturalezaShowdown(m.naturaleza)} Nature`);
    }

    const evs = CLAVES_STATS.filter((c) => m.evs[c] > 0).map((c) => `${m.evs[c]} ${abrev[c]}`);
    if (evs.length > 0) {
      lineas.push(`EVs: ${evs.join(' / ')}`);
    }

    const ivs = CLAVES_STATS.filter((c) => m.ivs[c] !== MAX_IV).map((c) => `${m.ivs[c]} ${abrev[c]}`);
    if (ivs.length > 0) {
      lineas.push(`IVs: ${ivs.join(' / ')}`);
    }

    m.ataques.forEach((a) => {
      const nombre = traducido
        ? this.nombres.buscar('ataques', a, 'es')
        : this.nombres.ataqueShowdown(a);
      lineas.push(`- ${nombre}`);
    });

    return lineas.join('\n');
  }
}