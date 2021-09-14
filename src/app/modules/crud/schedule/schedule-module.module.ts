import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { FormUpdateCreateScheduleComponent } from './form-update-create-schedule/form-update-create-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';
import { DialogDeleteItemModule } from '../dialog-delete-item/dialog-delete-item.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MainCrudModule } from '../main-crud/main.module';

const scheduleComponents = [
  ListScheduleComponent,
  FormUpdateCreateScheduleComponent
]

@NgModule({
  declarations: [
    scheduleComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormComponentsModule,
    ScheduleRoutingModule,
    MaterialModule,
    DialogDeleteItemModule,
    MainCrudModule
  ]
})
export class ScheduleModule { }
