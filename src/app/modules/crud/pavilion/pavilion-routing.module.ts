import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main-crud/main-crud.component';
import { FormUpdateCreatePavilionComponent } from './form-update-create/form-update-create-pavilion.component';
import { ListPavilionComponent } from './list-pavilion/list-pavilion.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
      children: [
        { path: 'list', component: ListPavilionComponent },
        { path: 'new', component: FormUpdateCreatePavilionComponent },
        { path: 'edit', component: FormUpdateCreatePavilionComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PavilionRoutingModule {}
