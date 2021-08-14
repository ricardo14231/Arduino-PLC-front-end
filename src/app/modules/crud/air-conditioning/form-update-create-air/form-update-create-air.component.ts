import { Component, OnChanges, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AirService } from 'src/app/core/services/air/air.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Air } from 'src/app/shared/models/air/listAir.model';

@Component({
  selector: 'app-form-update-create-air',
  templateUrl: './form-update-create-air.component.html',
  styleUrls: ['./form-update-create-air.component.css']
})
export class FormUpdateCreateAirComponent implements OnInit, OnChanges {

  constructor(
    private airService: AirService,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  public edit: boolean = false;
  private subscription: Subscription[] = [];

  public air: Air;

  ngOnInit(): void {
    this.initObjRoom();
    this.editAir();
  }

  ngOnChanges(): void {

  }

  public onSubmit(): void {

    if (!this.edit && this.air.id_air == null) {
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
  }

  public editAir(): void {
    this.subscription.push(
      this.airService.airEmitter.subscribe({
        next: responseAir => {
          this.air.id_air = responseAir.id_air;
          this.air.name_air = responseAir.name_air;
          this.air.temperature_min_air = responseAir.temperature_min_air;
          this.air.temperature_max_air = responseAir.temperature_max_air;
          this.air.url_device_air = responseAir.url_device_air;
          this.air.active_air = responseAir.active_air;

          this.edit = true;
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  private initObjRoom(): void {
    this.air = {
      id_air: null,
      name_air: null,
      current_temperature_air: null,
      state_cool_air: false,
      state_fan_air: false,
      turn_on_air: false,
      allocated_air: false,
      temperature_min_air: null,
      temperature_max_air: null,
      url_device_air: null,
      active_air: false
    };
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
