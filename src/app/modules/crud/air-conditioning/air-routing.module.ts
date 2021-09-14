import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main-crud/main-crud.component';
import { FormUpdateCreateAirComponent } from './form-update-create-air/form-update-create-air.component';
import { ListAirComponent } from './list-air/list-air.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
      children: [
        { path: 'list', component: ListAirComponent },
        { path: 'new', component: FormUpdateCreateAirComponent },
        { path: 'edit', component: FormUpdateCreateAirComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AirRoutingModule {}