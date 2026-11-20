import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, peopleOutline, trash } from 'ionicons/icons';
import { Equipo, MAX_MIEMBROS } from '../models/equipo.model';
import { EquipoService } from '../services/equipo.service';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  equipos: Equipo[] = [];
  maxMiembros = MAX_MIEMBROS;

  constructor(
    private equipoService: EquipoService,
    private idioma: IdiomaService,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ add, peopleOutline, trash });
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    this.equipos = this.equipoService
      .listar()
      .sort((a, b) => b.actualizado - a.actualizado);
    this.cdr.markForCheck();
  }

  async nuevoEquipo() {
    const alerta = await this.alertCtrl.create({
      header: this.idioma.t('equipos.nuevo'),
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: this.idioma.t('equipos.nombre'),
          attributes: { maxlength: 30 },
        },
      ],
      buttons: [
        { text: this.idioma.t('comun.cancelar'), role: 'cancel' },
        {
          text: this.idioma.t('comun.crear'),
          handler: (datos) => {
            this.equipoService.crear(datos.nombre ?? '');
            this.cargar();
          },
        },
      ],
    });
    await alerta.present();
  }

  async eliminar(equipo: Equipo, deslizable: IonItemSliding) {
    await deslizable.close();
    const alerta = await this.alertCtrl.create({
      header: this.idioma.t('equipos.confirmarBorrar'),
      message: equipo.nombre,
      buttons: [
        { text: this.idioma.t('comun.cancelar'), role: 'cancel' },
        {
          text: this.idioma.t('comun.eliminar'),
          role: 'destructive',
          handler: () => {
            this.equipoService.eliminar(equipo.id);
            this.cargar();
          },
        },
      ],
    });
    await alerta.present();
  }
}