import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main-crud/main-crud.component';
import { FormUpdateCreateUserComponent } from './form-update-create-user/form-update-create-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
      children: [
        { path: 'list', component: ListUserComponent },
        { path: 'new', component: FormUpdateCreateUserComponent },
        { path: 'edit', component: FormUpdateCreateUserComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {}