import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorEquipoPage } from './editor-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EditorEquipoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorEquipoPageRoutingModule {}