import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { CommonModule } from '@angular/common'; 

import { MaterialModule } from '../../shared/materialModule/material.module';
import { MainComponent } from '../../modules/crud/main-crud/main-crud.component';
import { FormUpdateCreatePavilionComponent } from './pavilion/form-update-create/form-update-create-pavilion.component';
import { ListPavilionComponent } from '../../modules/crud/pavilion/list-pavilion/list-pavilion.component';
import { ListRoomComponent } from '../../modules/crud/room/list-room/list-room.component';
import { FormUpdateCreateRoomComponent } from '../../modules/crud/room/form-update-create/form-update-create-room.component';
import { DialogDeleteItemComponent } from './dialog-delete-item/dialog-delete-item.component';

const crudComponent = [ 
    MainComponent,
    FormUpdateCreatePavilionComponent,
    ListPavilionComponent,
    ListRoomComponent,
    FormUpdateCreateRoomComponent,
    DialogDeleteItemComponent
]

@NgModule({
  declarations: [ 
    crudComponent, 
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  exports: [
    crudComponent
  ]
})
export class CrudModule { }
