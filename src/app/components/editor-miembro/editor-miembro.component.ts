import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  InputCustomEvent,
  ModalController,
  RangeCustomEvent,
  SelectCustomEvent,
} from '@ionic/angular';
import { forkJoin } from 'rxjs';
import {
  CLAVES_STATS,
  ClaveStat,
  MAX_ATAQUES,
  MAX_EV,
  MAX_EVS_TOTAL,
  MAX_IV,
  MiembroEquipo,
} from '../../models/equipo.model';
import { NombresService } from '../../services/nombres.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-editor-miembro',
  templateUrl: './editor-miembro.component.html',
  styleUrls: ['./editor-miembro.component.scss'],
  standalone: false,
})
export class EditorMiembroComponent implements OnInit {
  @Input() miembro!: MiembroEquipo;

  claves = CLAVES_STATS;
  maxEv = MAX_EV;
  posiciones = Array.from({ length: MAX_ATAQUES }, (_, i) => i);

  slots: string[] = [];        // los 4 ataques mientras se editan ('' = vacío)
  disponibles: string[] = [];  // ataques que puede aprender
  naturalezas: string[] = [];

  cargando = true;
  error = false;

  constructor(
    private modalCtrl: ModalController,
    private pokemonService: PokemonService,
    public nombres: NombresService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.slots = this.posiciones.map((i) => this.miembro.ataques[i] ?? '');
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.error = false;

    forkJoin([
      this.pokemonService.getDetalle(this.miembro.pokemonId),
      this.nombres.cargar(),
    ]).subscribe({
      next: ([detalle]) => {
        this.disponibles = [...detalle.ataques].sort((a, b) =>
          this.nombres.ataque(a).localeCompare(this.nombres.ataque(b))
        );
        this.naturalezas = this.nombres
          .clavesNaturalezas()
          .sort((a, b) =>
            this.nombres.naturaleza(a).localeCompare(this.nombres.naturaleza(b))
          );
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

  get evsRestantes(): number {
    const usados = CLAVES_STATS.reduce((suma, c) => suma + this.miembro.evs[c], 0);
    return MAX_EVS_TOTAL - usados;
  }

  // Opciones de un lugar: todos los ataques menos los elegidos en los otros lugares
  opciones(posicion: number): string[] {
    const elegidosEnOtros = this.slots.filter((a, i) => a && i !== posicion);
    return this.disponibles.filter((a) => !elegidosEnOtros.includes(a));
  }

  cambiarNivel(ev: RangeCustomEvent) {
    this.miembro.nivel = Number(ev.detail.value);
  }

  cambiarNaturaleza(ev: SelectCustomEvent) {
    this.miembro.naturaleza = ev.detail.value;
  }

  cambiarAtaque(posicion: number, ev: SelectCustomEvent) {
    this.slots[posicion] = ev.detail.value ?? '';
  }

  cambiarEv(clave: ClaveStat, ev: RangeCustomEvent) {
    const pedido = Number(ev.detail.value);
    const maximoPosible = this.evsRestantes + this.miembro.evs[clave];
    const valor = Math.min(pedido, maximoPosible);
    this.miembro.evs[clave] = valor;
    ev.target.value = valor; // si se pasó del total, la barra vuelve al máximo permitido
  }

  cambiarIv(clave: ClaveStat, ev: InputCustomEvent) {
    const numero = Math.round(Number(ev.detail.value));
    const valor = isNaN(numero) ? 0 : Math.min(Math.max(numero, 0), MAX_IV);
    this.miembro.ivs[clave] = valor;
    ev.target.value = valor; // corrige valores fuera de 0-31
  }

  guardar() {
    this.miembro.ataques = this.slots.filter((a) => a);
    this.modalCtrl.dismiss(this.miembro, 'guardado');
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}