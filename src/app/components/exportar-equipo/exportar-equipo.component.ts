import { Component, Input, OnInit } from '@angular/core';
import { ModalController, SegmentCustomEvent, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { copyOutline } from 'ionicons/icons';
import { Equipo } from '../../models/equipo.model';
import { IdiomaService } from '../../services/idioma.service';
import { ShowdownService } from '../../services/showdown.service';

@Component({
  selector: 'app-exportar-equipo',
  templateUrl: './exportar-equipo.component.html',
  styleUrls: ['./exportar-equipo.component.scss'],
  standalone: false,
})
export class ExportarEquipoComponent implements OnInit {
  @Input() equipo!: Equipo;

  modo: 'showdown' | 'traducido' = 'showdown';
  texto = '';

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private showdown: ShowdownService,
    public idioma: IdiomaService
  ) {
    addIcons({ copyOutline });
  }

  ngOnInit() {
    this.generar();
  }

  cambiarModo(ev: SegmentCustomEvent) {
    this.modo = ev.detail.value === 'traducido' ? 'traducido' : 'showdown';
    this.generar();
  }

  async copiar() {
    let mensaje = 'exportar.copiado';
    let color = 'success';
    try {
      await navigator.clipboard.writeText(this.texto);
    } catch {
      mensaje = 'exportar.errorCopiar';
      color = 'danger';
    }

    const toast = await this.toastCtrl.create({
      message: this.idioma.t(mensaje),
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  private generar() {
    this.texto = this.showdown.exportar(this.equipo, this.modo === 'traducido');
  }
}