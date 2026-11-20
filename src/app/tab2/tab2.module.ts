import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Tab2PageRoutingModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}