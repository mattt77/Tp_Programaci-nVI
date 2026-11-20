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

@NgModule({
  imports: [
    CommonModule,
    Tab1PageRoutingModule,
    IonBadge,
    IonButton,
    IonButtons,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
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