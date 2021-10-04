import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { ValidationFieldsService } from 'src/app/core/services/validationFields/validation-fields.service';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';

@Component({
  selector: 'app-form-update-create-pavilion',
  templateUrl: './form-update-create-pavilion.component.html',
  styleUrls: ['./form-update-create-pavilion.component.css']
})
export class FormUpdateCreatePavilionComponent implements OnInit {

  pavilionForm: FormGroup;

  private pavilion: Pavilion;
  private _idPavilionEdit: number = null;
  private _subscription: Subscription;

  constructor(
    public pavilionService: PavilionService,
    private router: Router,
    private messageService: MessageService,
    private formBuider: FormBuilder,
    public validationTextField: ValidationFieldsService
  ) { }

  ngOnInit(): void {

    this.initObjPavilion();
    this.createFormControl(this.pavilion);

    if (this.pavilionService.isEdit) {
      this.pavilion = this.pavilionService.pavilion;
      this._idPavilionEdit = this.pavilion.idPavilion;

      this.pavilionForm.patchValue({
        namePavilion: this.pavilion.namePavilion,
        amountRoomPavilion: this.pavilion.amountRoomPavilion,
        activePavilion: this.pavilion.activePavilion
      })
    }

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

    this._subscription = this.pavilionService.responseOnSave.subscribe(() => {
      this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      this.router.navigate(['/homePavilion/list']);

    }, () => this.messageService.openSnackBar('Erro ao salvar o pavilhão!', 'dangerMessage')
    )
  }

  resetForm(): void {
    this.pavilionForm.reset();
  }

  cancelForm(): void {
    this.pavilionService.isEdit = false;
    this.router.navigate(['/homePavilion/list']);
  }

  private initObjPavilion(): void {
    this.pavilion = {
      idPavilion: null,
      namePavilion: null,
      amountRoomPavilion: 0,
      activePavilion: true
    };
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
