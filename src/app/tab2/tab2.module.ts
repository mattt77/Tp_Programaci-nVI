import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { TraducirPipe } from '../pipes/traducir.pipe';

@NgModule({
  imports: [
    CommonModule,
    Tab2PageRoutingModule,
    TraducirPipe,
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}