import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAccordion,
  IonAccordionGroup,
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
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonRange,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { EditorEquipoPage } from './editor-equipo.page';
import { EditorEquipoPageRoutingModule } from './editor-equipo-routing.module';
import { SelectorPokemonComponent } from '../../components/selector-pokemon/selector-pokemon.component';
import { EditorMiembroComponent } from '../../components/editor-miembro/editor-miembro.component';
import { TraducirPipe } from '../../pipes/traducir.pipe';

@NgModule({
  imports: [
    CommonModule,
    EditorEquipoPageRoutingModule,
    TraducirPipe,
    IonAccordion,
    IonAccordionGroup,
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
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonNote,
    IonRange,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
  ],
  declarations: [EditorEquipoPage, SelectorPokemonComponent, EditorMiembroComponent],
})
export class EditorEquipoPageModule {}