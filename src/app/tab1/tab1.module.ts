import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DetallePokemonComponent } from '../components/detalle-pokemon/detalle-pokemon.component';
import { TraducirPipe } from '../pipes/traducir.pipe';

@NgModule({
  imports: [
    CommonModule,
    Tab1PageRoutingModule,
    TraducirPipe,
    IonBadge,
    IonButton,
    IonButtons,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonLabel,
    IonProgressBar,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSkeletonText,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
  ],
  declarations: [Tab1Page, DetallePokemonComponent],
})
export class Tab1PageModule {}