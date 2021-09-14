import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css']
})
export class InputCheckboxComponent {

  @Input() formGroup: FormGroup

  @Input() fieldIdentify: string

  constructor() { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.fieldIdentify];
  }

}
