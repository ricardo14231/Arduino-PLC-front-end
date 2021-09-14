import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main-crud/main-crud.component';
import { FormUpdateCreateRoomComponent } from './form-update-create/form-update-create-room.component';
import { ListRoomComponent } from './list-room/list-room.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
      children: [
        { path: 'list', component: ListRoomComponent },
        { path: 'new', component: FormUpdateCreateRoomComponent },
        { path: 'edit', component: FormUpdateCreateRoomComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoomRoutingModule {}