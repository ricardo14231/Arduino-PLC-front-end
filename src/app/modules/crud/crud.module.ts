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
import { FormUpdateCreateAirComponent } from './air-conditioning/form-update-create-air/form-update-create-air.component';
import { ListAirComponent } from './air-conditioning/list-air/list-air.component';
import { FormUpdateCreateScheduleComponent } from './schedule/form-update-create-schedule/form-update-create-schedule.component';
import { ListScheduleComponent } from './schedule/list-schedule/list-schedule.component';
import { TableScheduleComponent } from './schedule/table-schedule/table-schedule.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { FormUpdateCreateUserComponent } from './user/form-update-create-user/form-update-create-user.component';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';

const crudComponent = [ 
    MainComponent,
    FormUpdateCreatePavilionComponent,
    ListPavilionComponent,
    ListRoomComponent,
    FormUpdateCreateRoomComponent,
    DialogDeleteItemComponent,
    FormUpdateCreateAirComponent, 
    ListAirComponent,
    FormUpdateCreateScheduleComponent,
    ListScheduleComponent,
    TableScheduleComponent,
    ListUserComponent,
    FormUpdateCreateUserComponent
]

@NgModule({
  declarations: [ 
    crudComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    FormComponentsModule
  ],
  providers: [],
  exports: [
    crudComponent
  ]
})
export class CrudModule { }
