import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { ListRoomComponent } from './list-room/list-room.component';
import { FormUpdateCreateRoomComponent } from './form-update-create/form-update-create-room.component';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';
import { DialogDeleteItemModule } from '../dialog-delete-item/dialog-delete-item.module';
import { RoomRoutingModule } from './room-routing.module';
import { MainCrudModule } from '../main-crud/main.module';

const roomComponents = [
  ListRoomComponent,
  FormUpdateCreateRoomComponent
]

@NgModule({
  declarations: [
    roomComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormComponentsModule,
    RoomRoutingModule,
    MaterialModule,
    DialogDeleteItemModule,
    MainCrudModule
  ]
})
export class RoomModule { }
