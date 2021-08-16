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
    private pavilionService: PavilionService,
    private router: Router,
    private messageService: MessageService,
    private formBuider: FormBuilder,
    public validationTextField: ValidationTextFieldsService
  ) { }

  edit: boolean = false;
  pavilionForm: FormGroup;

  private pavilion: Pavilion;
  private _idPavilionEdit: number = null;
  private subscription: Subscription[] = [];

  ngOnInit(): void {
    this.initObjPavilion();
    this.editPavilion();
    this.createFormControl(this.pavilion);
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

  onSave(): void {

    if (!this.edit && this._idPavilionEdit == null) {
      this.subscription.push(
        this.pavilionService.createPavilion(this.pavilionForm.value).subscribe({
          next: () => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homePavilion/list']);
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    } else {
      this.pavilion = this.pavilionForm.getRawValue() as Pavilion;
      this.pavilion.idPavilion = this._idPavilionEdit;

      this.subscription.push(this.pavilionService.updatePavlion(this.pavilion).subscribe((() => {
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
        this.router.navigate(['/homePavilion/list']);

      }), error => this.messageService.openSnackBar(error.error, 'dangerMessage')));
    }
  }

  resetForm(): void {
    this.pavilionForm.reset();
  }

  editPavilion(): void {

    this.subscription.push(this.pavilionService.editPavilionEmitter.subscribe((responsePavilion: Pavilion) => {
      this._idPavilionEdit = responsePavilion.idPavilion;

      this.createFormControl(responsePavilion);
      this.edit = true;
    }));
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
    this.subscription.map(sub => sub.unsubscribe())
  }
}
