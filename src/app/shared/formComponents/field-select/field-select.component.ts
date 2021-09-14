import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationFieldsService } from 'src/app/core/services/validationFields/validation-fields.service';
import { FieldsSelect } from '../../models/fieldSelect/fieldsSelect.model';

@Component({
  selector: 'app-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.css']
})
export class FieldSelectComponent {

  @Input() formGroup: FormGroup

  @Input() fieldIdentify: string

  @Input() fieldName: string

  @Input() elementsValue: FieldsSelect[] = []

  constructor(
    public validationSelectField: ValidationFieldsService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }

}
