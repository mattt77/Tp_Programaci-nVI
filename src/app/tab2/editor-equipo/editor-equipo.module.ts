import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { EditorEquipoPage } from './editor-equipo.page';
import { EditorEquipoPageRoutingModule } from './editor-equipo-routing.module';
import { SelectorPokemonComponent } from '../../components/selector-pokemon/selector-pokemon.component';
import { TraducirPipe } from '../../pipes/traducir.pipe';

@NgModule({
  imports: [
    CommonModule,
    EditorEquipoPageRoutingModule,
    TraducirPipe,
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonNote,
    IonSearchbar,
    IonSpinner,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
  ],
  declarations: [EditorEquipoPage, SelectorPokemonComponent],
})
export class EditorEquipoPageModule {}