import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../materialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { FieldSelectComponent } from './field-select/field-select.component';

const moduleComponents = [
  InputTextComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputCheckboxComponent,
] 

@NgModule({
  declarations: [
    moduleComponents,
    FieldSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    moduleComponents
  ]
})
export class FormComponentsModule { }
