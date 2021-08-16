import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationTextFieldsService } from 'src/app/core/services/validationTextFields/validation-text-fields.service';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent {

  @Input() formGroup: FormGroup

  @Input() fieldIdentify: string

  constructor(
    public validationTextField: ValidationTextFieldsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }

}
