import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationFieldsService } from 'src/app/core/services/validationFields/validation-fields.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'] 
})
export class InputNumberComponent {

  @Input() formGroup: FormGroup

  @Input() fieldIdentify: string

  @Input() fieldName: string
  
  constructor(
    public validationFields: ValidationFieldsService
  ) {  }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }
}
