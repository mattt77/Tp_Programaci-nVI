import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  ModalController,
  SearchbarCustomEvent,
} from '@ionic/angular';
import { PokemonItem } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-selector-pokemon',
  templateUrl: './selector-pokemon.component.html',
  styleUrls: ['./selector-pokemon.component.scss'],
  standalone: false,
})
export class SelectorPokemonComponent implements OnInit {
  todos: PokemonItem[] = [];
  filtrados: PokemonItem[] = [];
  mostrados = 40;
  texto = '';

  cargando = true;
  error = false;

  constructor(
    private modalCtrl: ModalController,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargar();
  }

  get visibles(): PokemonItem[] {
    return this.filtrados.slice(0, this.mostrados);
  }

  get hayMas(): boolean {
    return this.mostrados < this.filtrados.length;
  }

  cargar() {
    this.cargando = true;
    this.error = false;

    this.pokemonService.getTodos().subscribe({
      next: (lista) => {
        this.todos = lista;
        this.aplicarFiltro();
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.cargando = false;
        this.error = true;
        this.cdr.markForCheck();
      },
    });
  }

  buscar(ev: SearchbarCustomEvent) {
    this.texto = (ev.detail.value ?? '').toLowerCase().trim();
    this.aplicarFiltro();
  }

  cargarMas(ev: InfiniteScrollCustomEvent) {
    this.mostrados += 40;
    ev.target.complete();
  }

  elegir(pokemon: PokemonItem) {
    this.modalCtrl.dismiss(pokemon, 'elegido');
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  private aplicarFiltro() {
    this.mostrados = 40;
    this.filtrados = this.todos.filter(
      (p) => p.name.includes(this.texto) || String(p.id) === this.texto
    );
  }
}