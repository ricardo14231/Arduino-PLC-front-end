import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { ListAirComponent } from './list-air/list-air.component';
import { FormUpdateCreateAirComponent } from './form-update-create-air/form-update-create-air.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';
import { DialogDeleteItemModule } from '../dialog-delete-item/dialog-delete-item.module';
import { AirRoutingModule } from './air-routing.module';
import { MainCrudModule } from '../main-crud/main.module';

const airComponents = [
  ListAirComponent,
  FormUpdateCreateAirComponent
]

@NgModule({
  declarations: [
    airComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormComponentsModule,
    AirRoutingModule,
    MaterialModule,
    DialogDeleteItemModule,
    MainCrudModule
  ]
})
export class AirModule { }
