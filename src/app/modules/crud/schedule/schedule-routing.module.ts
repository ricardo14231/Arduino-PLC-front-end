import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main-crud/main-crud.component';
import { FormUpdateCreateScheduleComponent } from './form-update-create-schedule/form-update-create-schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
      children: [
        { path: 'list', component: ListScheduleComponent },
        { path: 'new', component: FormUpdateCreateScheduleComponent },
        { path: 'edit', component: FormUpdateCreateScheduleComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScheduleRoutingModule {}