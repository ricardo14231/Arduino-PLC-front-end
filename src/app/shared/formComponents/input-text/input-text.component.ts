import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationTextFieldsService } from 'src/app/core/services/validationTextFields/validation-text-fields.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {

  @Input() formGroup: FormGroup

  @Input() fieldIdentify: string

  @Input() fieldName: string
  

  constructor(
    public validationTextField: ValidationTextFieldsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }

}
