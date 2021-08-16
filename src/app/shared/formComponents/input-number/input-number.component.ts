import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationTextFieldsService } from 'src/app/core/services/validationTextFields/validation-text-fields.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'] 
})
export class InputNumberComponent {

  @Input() formGroup: FormGroup

  @Input() controlName: string

  @Input() fieldIdentify: string

  @Input() fieldName: string
  

  constructor(
    public validationTextField: ValidationTextFieldsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }


}
