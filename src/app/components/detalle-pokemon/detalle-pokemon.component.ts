import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import {
  ETIQUETAS_STATS,
  PokemonDetalle,
  PokemonItem,
} from '../../models/pokemon.model';
import { NombresService } from '../../services/nombres.service';
import { PokemonService } from '../../services/pokemon.service';
import { Efectividad, TiposService } from '../../services/tipos.service';

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss'],
  standalone: false,
})
export class DetallePokemonComponent implements OnInit {
  @Input() pokemon!: PokemonItem;

  detalle?: PokemonDetalle;
  debilidades: Efectividad[] = [];
  resistencias: Efectividad[] = [];
  inmunidades: Efectividad[] = [];
  etiquetas = ETIQUETAS_STATS;

  cargando = true;
  error = false;

  constructor(
    private modalCtrl: ModalController,
    private pokemonService: PokemonService,
    private tiposService: TiposService,
    public nombres: NombresService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.error = false;

    forkJoin([
      this.pokemonService.getDetalle(this.pokemon.id),
      this.tiposService.cargar(),
      this.nombres.cargar(),
    ]).subscribe({
      next: ([detalle]) => {
        this.detalle = detalle;
        const todas = this.tiposService.efectividades(detalle.tipos);
        this.debilidades = todas.filter((e) => e.multiplicador > 1);
        this.resistencias = todas.filter(
          (e) => e.multiplicador > 0 && e.multiplicador < 1
        );
        this.inmunidades = todas.filter((e) => e.multiplicador === 0);
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.error = true;
      },
    });
  }

  porcentaje(valor: number): number {
    return Math.min(valor / 255, 1);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}