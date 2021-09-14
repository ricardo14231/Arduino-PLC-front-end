import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogDeleteItemComponent } from "./dialog-delete-item.component";
import { MaterialModule } from 'src/app/shared/materialModule/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DialogDeleteItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
//    FormsModule,
//    AppRoutingModule,
//    MaterialModule
  ]
})
export class DialogDeleteItemModule { }