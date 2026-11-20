import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Tab3PageRoutingModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}