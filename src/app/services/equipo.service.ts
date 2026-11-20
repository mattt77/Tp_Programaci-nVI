import { Injectable } from '@angular/core';
import { PokemonDetalle } from '../models/pokemon.model';
import { CLAVES_STATS, Equipo, MiembroEquipo, Stats } from '../models/equipo.model';

@Injectable({ providedIn: 'root' })
export class EquipoService {
  private readonly clave = 'pokedex-equipos';

  constructor() {}

  listar(): Equipo[] {
    try {
      const texto = localStorage.getItem(this.clave);
      return texto ? JSON.parse(texto) : [];
    } catch {
      return [];
    }
  }

  obtener(id: string): Equipo | undefined {
    return this.listar().find((e) => e.id === id);
  }

  crear(nombre: string): Equipo {
    const equipo: Equipo = {
      id: Date.now().toString(36),
      nombre: nombre.trim() || 'Equipo',
      miembros: [],
      actualizado: Date.now(),
    };
    this.guardarTodos([...this.listar(), equipo]);
    return equipo;
  }

  guardar(equipo: Equipo) {
    equipo.actualizado = Date.now();
    const lista = this.listar();
    const i = lista.findIndex((e) => e.id === equipo.id);
    if (i >= 0) {
      lista[i] = equipo;
    } else {
      lista.push(equipo);
    }
    this.guardarTodos(lista);
  }

  eliminar(id: string) {
    this.guardarTodos(this.listar().filter((e) => e.id !== id));
  }

  crearMiembro(detalle: PokemonDetalle): MiembroEquipo {
    return {
      pokemonId: detalle.id,
      name: detalle.name,
      imagen: detalle.imagen,
      tipos: detalle.tipos,
      nivel: 100,
      naturaleza: 'hardy',
      ataques: [],
      evs: this.statsEn(0),
      ivs: this.statsEn(31),
      shiny: false,
    };
  }

  private statsEn(valor: number): Stats {
    return CLAVES_STATS.reduce((acc, c) => ({ ...acc, [c]: valor }), {} as Stats);
  }

  private guardarTodos(lista: Equipo[]) {
    localStorage.setItem(this.clave, JSON.stringify(lista));
  }
}