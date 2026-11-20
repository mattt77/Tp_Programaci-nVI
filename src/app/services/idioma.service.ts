import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClaveTexto, Idioma, TEXTOS } from '../i18n/textos';

@Injectable({ providedIn: 'root' })
export class IdiomaService {
  private readonly clave = 'pokedex-idioma';
  private elegido = false;
  idioma: Idioma = 'es';

  constructor(private alertCtrl: AlertController) {
    const guardado = this.leer();
    if (guardado === 'es' || guardado === 'en') {
      this.idioma = guardado;
      this.elegido = true;
    }
    document.documentElement.lang = this.idioma;
  }
  async elegir(obligatorio: boolean) {
    const botones: any[] = [
      {
        text: 'OK',
        handler: (valor: Idioma) => this.cambiar(valor ?? this.idioma),
      },
    ];
    if (!obligatorio) {
      botones.unshift({ text: this.t('comun.cancelar'), role: 'cancel' });
    }

    const alerta = await this.alertCtrl.create({
      header: 'Idioma / Language',
      backdropDismiss: !obligatorio,
      inputs: [
        { type: 'radio', label: 'Español', value: 'es', checked: this.idioma === 'es' },
        { type: 'radio', label: 'English', value: 'en', checked: this.idioma === 'en' },
      ],
      buttons: botones,
    });
    await alerta.present();
  }
  yaEligio(): boolean {
    return this.elegido;
  }

  cambiar(idioma: Idioma) {
    this.idioma = idioma;
    this.elegido = true;
    document.documentElement.lang = idioma;
    try {
      localStorage.setItem(this.clave, idioma);
    } catch {}
  }

  t(clave: string): string {
    return TEXTOS[this.idioma][clave as ClaveTexto] ?? clave;
  }

  private leer(): string | null {
    try {
      return localStorage.getItem(this.clave);
    } catch {
      return null;
    }
  }
}