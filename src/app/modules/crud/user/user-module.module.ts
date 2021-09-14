import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserComponent } from './list-user/list-user.component';
import { FormUpdateCreateUserComponent } from './form-update-create-user/form-update-create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { FormComponentsModule } from 'src/app/shared/formComponents/form-components.module';
import { DialogDeleteItemModule } from '../dialog-delete-item/dialog-delete-item.module';
import { UserRoutingModule } from './user-routing.module';
import { MainCrudModule } from '../main-crud/main.module';

const userComponents = [
  ListUserComponent,
  FormUpdateCreateUserComponent
]

@NgModule({
  declarations: [
    userComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormComponentsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule,
    DialogDeleteItemModule,
    MainCrudModule
  ]
})
export class UserModule { }
