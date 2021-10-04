import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AirService } from 'src/app/core/services/air/air.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Air } from 'src/app/shared/models/air/air.model';

@Component({
  selector: 'app-form-update-create-air',
  templateUrl: './form-update-create-air.component.html',
  styleUrls: ['./form-update-create-air.component.css']
})
export class FormUpdateCreateAirComponent implements OnInit {

  airForm: FormGroup;
  edit: boolean = false;
  private _subscription: Subscription;
  private _idAirEdit: number;
  air: Air;

  constructor(
    public airService: AirService,
    private formBuider: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initObjAir();
    this.createFormControl(this.air);

    if (this.airService.isEdit) {
      this.air = this.airService.air;
      this._idAirEdit = this.air.idAir;

      this.airForm.patchValue({
        nameAir: this.air.nameAir,
        allocatedAir: this.air.allocatedAir,
        temperatureMinAir: this.air.temperatureMinAir,
        temperatureMaxAir: this.air.temperatureMaxAir,
        urlDeviceAir: this.air.urlDeviceAir,
        activeAir: this.air.activeAir
      })
    }
  }

  createFormControl(air: Air) {
    this.airForm = this.formBuider.group({
      nameAir: [air.nameAir, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      temperatureMinAir: [air.temperatureMinAir, [Validators.required, Validators.min(14), Validators.max(30)]],
      temperatureMaxAir: [air.temperatureMaxAir, [Validators.required, Validators.min(14), Validators.max(30)]],
      urlDeviceAir: [air.urlDeviceAir, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      activeAir: [air.activeAir]
    });
  }

  onSave(): void {

    this.air = this.airForm.getRawValue() as Air;
    
    if (this._idAirEdit !== null)
      this.air.idAir = this._idAirEdit;

    this.airService.onSave(this.air);

    this._subscription = this.airService.responseOnSave.subscribe(() => {
      this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      this.router.navigate(['/homeAir/list']);

    }, () => this.messageService.openSnackBar('Erro ao salvar o Ar-condicionado!', 'dangerMessage')
    )

    /*
    if (!this.edit && this.air.idAir == null) {
      this.subscription.push(
        this.airService.createAir(this.air).subscribe({
          next: air => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeAir/list']);

          }, error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      );
    } else {
      this.subscription.push(
        this.airService.updateAir(this.air).subscribe({
          next: res => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeAir/list'])
          },

          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      );
    }
    */
  }

  private initObjAir(): void {
    this.air = {
      idAir: null,
      nameAir: null,
      currentTemperatureAir: null,
      stateCoolAir: null,
      stateFanAir: null,
      turnOnAir: null,
      temperatureMinAir: null,
      temperatureMaxAir: null,
      urlDeviceAir: null,
      activeAir: true
    };
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
