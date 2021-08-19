import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { ValidationTextFieldsService } from 'src/app/core/services/validationTextFields/validation-text-fields.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';

@Component({
  selector: 'app-form-update-create-pavilion',
  templateUrl: './form-update-create-pavilion.component.html',
  styleUrls: ['./form-update-create-pavilion.component.css']
})
export class FormUpdateCreatePavilionComponent implements OnInit {

  constructor(
    public pavilionService: PavilionService,
    private router: Router,
    private messageService: MessageService,
    private formBuider: FormBuilder,
    public validationTextField: ValidationTextFieldsService
  ) { }

  pavilionForm: FormGroup;

  private pavilion: Pavilion;
  private _idPavilionEdit: number = null;
  private subscription: Subscription[] = [];

  ngOnInit(): void {

    this.initObjPavilion();
    this.createFormControl(this.pavilion);

    if (this.pavilionService.edit) {
      this.pavilion = this.pavilionService.pavilion;
      this._idPavilionEdit = this.pavilion.idPavilion
      this.pavilionForm.patchValue({
        namePavilion: this.pavilion.namePavilion,
        amountRoomPavilion: this.pavilion.amountRoomPavilion,
        activePavilion: this.pavilion.activePavilion
      })
    }

  }

  get controlsForm() {
    return this.pavilionForm.controls;
  }

  createFormControl(pavilion: Pavilion) {
    this.pavilionForm = this.formBuider.group({
      namePavilion: [pavilion.namePavilion, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      amountRoomPavilion: [pavilion.amountRoomPavilion, [Validators.required, Validators.min(0), Validators.max(10000)]],
      activePavilion: [pavilion.activePavilion]
    });
  }

  onSave() {

    this.pavilion = this.pavilionForm.getRawValue() as Pavilion;

    if (this._idPavilionEdit !== null)
      this.pavilion.idPavilion = this._idPavilionEdit;

    this.pavilionService.onSave(this.pavilion);

    this.subscription.push(this.pavilionService.responseOnSave.subscribe(() => {
      this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      this.router.navigate(['/homePavilion/list']);

    }, () => this.messageService.openSnackBar('Erro ao salvar o pavilhão!', 'dangerMessage')
    ))
  }

  resetForm(): void {
    this.pavilionForm.reset();
  }

  cancelForm(): void {
    this.pavilionService.edit = false;
    this.router.navigate(['/homePavilion/list']);
  }

  private initObjPavilion(): void {
    this.pavilion = {
      idPavilion: null,
      namePavilion: "",
      amountRoomPavilion: 0,
      activePavilion: true
    };
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }
}
