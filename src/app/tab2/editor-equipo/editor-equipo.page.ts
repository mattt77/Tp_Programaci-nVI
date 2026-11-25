import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonItemSliding,
  LoadingController,
  ModalController,
  NavController,
  SegmentCustomEvent,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, create, shareOutline, sparkles, trash } from 'ionicons/icons';
import { Equipo, MAX_MIEMBROS, MiembroEquipo } from '../../models/equipo.model';
import { PokemonItem } from '../../models/pokemon.model';
import { EquipoService } from '../../services/equipo.service';
import { FichasService } from '../../services/fichas.service';
import { IdiomaService } from '../../services/idioma.service';
import { NombresService } from '../../services/nombres.service';
import { PokemonService } from '../../services/pokemon.service';
import { ResumenTipo, TiposService } from '../../services/tipos.service';
import { SelectorPokemonComponent } from '../../components/selector-pokemon/selector-pokemon.component';
import { EditorMiembroComponent } from '../../components/editor-miembro/editor-miembro.component';
import { ExportarEquipoComponent } from '../../components/exportar-equipo/exportar-equipo.component';

@Component({
  selector: 'app-editor-equipo',
  templateUrl: './editor-equipo.page.html',
  styleUrls: ['./editor-equipo.page.scss'],
  standalone: false,
})
export class EditorEquipoPage implements OnInit {
  equipo?: Equipo;
  libres: number[] = [];
  private id = '';

  vista: 'miembros' | 'debilidades' = 'miembros';
  resumen: ResumenTipo[] = [];
  tiposListos = false;
  tiposError = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private equipoService: EquipoService,
    private pokemonService: PokemonService,
    private tiposService: TiposService,
    private fichasService: FichasService,
    public nombres: NombresService,
    private idioma: IdiomaService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ add, create, shareOutline, sparkles, trash });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    // Los nombres traducidos de los tipos y ataques se usan en la lista
    this.nombres.cargar().subscribe(() => this.cdr.markForCheck());
    this.cargarTipos();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    const equipo = this.equipoService.obtener(this.id);
    if (!equipo) {
      this.navCtrl.navigateBack('/tabs/tab2');
      return;
    }
    this.equipo = equipo;
    this.refrescar();
  }

  // Carga la tabla de tipos para calcular las debilidades
  cargarTipos() {
    this.tiposError = false;
    this.tiposService.cargar().subscribe({
      next: () => {
        this.tiposListos = true;
        this.refrescar();
      },
      error: () => {
        this.tiposError = true;
        this.cdr.markForCheck();
      },
    });
  }

  cambiarVista(ev: SegmentCustomEvent) {
    this.vista = ev.detail.value === 'debilidades' ? 'debilidades' : 'miembros';
  }

  async exportar() {
    if (!this.equipo) return;
    const modal = await this.modalCtrl.create({
      component: ExportarEquipoComponent,
      componentProps: { equipo: this.equipo },
    });
    await modal.present();
  }

  async renombrar() {
    const equipo = this.equipo;
    if (!equipo) return;

    const alerta = await this.alertCtrl.create({
      header: this.idioma.t('editor.renombrar'),
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: equipo.nombre,
          attributes: { maxlength: 30 },
        },
      ],
      buttons: [
        { text: this.idioma.t('comun.cancelar'), role: 'cancel' },
        {
          text: this.idioma.t('comun.guardar'),
          handler: (datos) => {
            const nombre = (datos.nombre ?? '').trim();
            if (nombre) {
              equipo.nombre = nombre;
              this.equipoService.guardar(equipo);
              this.refrescar();
            }
          },
        },
      ],
    });
    await alerta.present();
  }

  async agregar() {
    const equipo = this.equipo;
    if (!equipo || equipo.miembros.length >= MAX_MIEMBROS) return;

    const modal = await this.modalCtrl.create({ component: SelectorPokemonComponent });
    await modal.present();
    const { data, role } = await modal.onWillDismiss<PokemonItem>();
    if (role !== 'elegido' || !data) return;

    const cargando = await this.loadingCtrl.create({
      message: this.idioma.t('editor.agregando'),
    });
    await cargando.present();

    this.pokemonService.getDetalle(data.id).subscribe({
      next: (detalle) => {
        equipo.miembros.push(this.equipoService.crearMiembro(detalle));
        this.equipoService.guardar(equipo);
        cargando.dismiss();
        this.refrescar();
      },
      error: async () => {
        cargando.dismiss();
        const toast = await this.toastCtrl.create({
          message: this.idioma.t('editor.errorAgregar'),
          duration: 2500,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
    });
  }

  async editar(indice: number) {
    const equipo = this.equipo;
    if (!equipo) return;

    const original = equipo.miembros[indice];
    const modal = await this.modalCtrl.create({
      component: EditorMiembroComponent,
      // Se pasa una copia: si se cancela, el original no cambia
      componentProps: { miembro: structuredClone(original) },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss<MiembroEquipo>();
    if (role !== 'guardado' || !data) return;

    // Fichas shiny: se gasta al activar y se devuelve al desactivar
    let aviso = '';
    if (data.shiny && !original.shiny) {
      if (this.fichasService.gastar()) {
        aviso = 'editor.fichaUsada';
      } else {
        data.shiny = false; // por seguridad: sin fichas no se puede activar
      }
    } else if (!data.shiny && original.shiny) {
      this.fichasService.devolver();
      aviso = 'editor.fichaDevuelta';
    }

    equipo.miembros[indice] = data;
    this.equipoService.guardar(equipo);
    this.refrescar();
    if (aviso) {
      this.mostrarToast(aviso);
    }
  }

  resumenAtaques(miembro: MiembroEquipo): string {
    return miembro.ataques.map((a) => this.nombres.ataque(a)).join(' · ');
  }

  imagen(miembro: MiembroEquipo): string {
    return this.equipoService.imagenDe(miembro);
  }

  async quitar(indice: number, deslizable: IonItemSliding) {
    const equipo = this.equipo;
    if (!equipo) return;

    await deslizable.close();
    const quitado = equipo.miembros.splice(indice, 1)[0];
    if (quitado.shiny) {
      this.fichasService.devolver();
      this.mostrarToast('editor.fichaDevuelta');
    }
    this.equipoService.guardar(equipo);
    this.refrescar();
  }

  private async mostrarToast(clave: string) {
    const toast = await this.toastCtrl.create({
      message: this.idioma.t(clave),
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    await toast.present();
  }

  // Recalcula los lugares libres y las debilidades, y avisa a Angular que redibuje
  private refrescar() {
    const ocupados = this.equipo?.miembros.length ?? 0;
    this.libres = Array.from({ length: MAX_MIEMBROS - ocupados }, (_, i) => i);
    if (this.tiposListos && this.equipo) {
      this.resumen = this.tiposService.resumenEquipo(
        this.equipo.miembros.map((m) => m.tipos)
      );
    }
    this.cdr.markForCheck();
  }
}