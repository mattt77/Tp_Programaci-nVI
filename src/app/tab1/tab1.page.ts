import { Component, OnInit } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  SearchbarCustomEvent,
  SegmentCustomEvent,
} from '@ionic/angular';
import { PokemonItem } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  generaciones = [
    { id: 1, etiqueta: 'Gen I' },
    { id: 2, etiqueta: 'Gen II' },
    { id: 3, etiqueta: 'Gen III' },
    { id: 4, etiqueta: 'Gen IV' },
    { id: 5, etiqueta: 'Gen V' },
    { id: 6, etiqueta: 'Gen VI' },
    { id: 7, etiqueta: 'Gen VII' },
    { id: 8, etiqueta: 'Gen VIII' },
    { id: 9, etiqueta: 'Gen IX' },
  ];
  generacionActual = 1;

  pokemons: PokemonItem[] = [];
  filtrados: PokemonItem[] = [];
  mostrados = 30;
  texto = '';

  cargando = true;
  error = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.cargarGeneracion(this.generacionActual);
  }

  get visibles(): PokemonItem[] {
    return this.filtrados.slice(0, this.mostrados);
  }

  get hayMas(): boolean {
    return this.mostrados < this.filtrados.length;
  }

  cargarGeneracion(numero: number) {
    this.generacionActual = numero;
    this.cargando = true;
    this.error = false;

    this.pokemonService.getGeneracion(numero).subscribe({
      next: (lista) => {
        if (numero !== this.generacionActual) return;
        this.pokemons = lista;
        this.aplicarFiltro();
        this.cargando = false;
      },
      error: () => {
        if (numero !== this.generacionActual) return;
        this.cargando = false;
        this.error = true;
      },
    });
  }

  cambiarGeneracion(ev: SegmentCustomEvent) {
    this.cargarGeneracion(Number(ev.detail.value));
  }

  buscar(ev: SearchbarCustomEvent) {
    this.texto = (ev.detail.value ?? '').toLowerCase().trim();
    this.aplicarFiltro();
  }

  cargarMas(ev: InfiniteScrollCustomEvent) {
    this.mostrados += 30;
    ev.target.complete();
  }

  private aplicarFiltro() {
    this.mostrados = 30;
    this.filtrados = this.pokemons.filter(
      (p) => p.name.includes(this.texto) || String(p.id) === this.texto
    );
  }
}