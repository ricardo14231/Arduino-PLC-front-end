import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationFieldsService } from 'src/app/core/services/validationFields/validation-fields.service';

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
    public validationTextField: ValidationFieldsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }

}
