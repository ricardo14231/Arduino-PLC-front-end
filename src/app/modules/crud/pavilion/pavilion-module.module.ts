import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

import { ListPavilionComponent } from './list-pavilion/list-pavilion.component';
import { FormUpdateCreatePavilionComponent } from './form-update-create/form-update-create-pavilion.component';
import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';
import { DialogDeleteItemModule } from '../dialog-delete-item/dialog-delete-item.module';
import { PavilionRoutingModule } from './pavilion-routing.module';
import { MainCrudModule } from '../main-crud/main.module';

const pavilionComponents = [
  ListPavilionComponent,
  FormUpdateCreatePavilionComponent,
]

@NgModule({
  declarations: [
    pavilionComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    PavilionRoutingModule,
    ReactiveFormsModule,
    FormComponentsModule,
    MaterialModule,
    DialogDeleteItemModule,
    MainCrudModule
  ]
})
export class PavilionModule { }
