import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AirService } from 'src/app/core/services/air/air.service';

import { ArduinoService } from 'src/app/core/services/arduino/arduino.service';
import { ControlerService } from 'src/app/core/services/controler/controler.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ModalLoadingService } from 'src/app/core/services/modal-loading/modal-loading.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-control-air-room',
  templateUrl: './control-air-room.component.html',
  styleUrls: ['./control-air-room.component.css']
})
export class ControlAirRoomComponent implements OnInit {

  dataRoom: CardRoom;
  current_temperature: number = 0;
  current_state_cool: boolean = false;
  current_state_fan: boolean = false;
  temperature_min: number;
  temperature_max: number;

  private subscription: Subscription[] = [];

  constructor(
    private controlerService: ControlerService,
    private airService: AirService,
    private roomService: RoomService,
    private arduinoService: ArduinoService,
    private messageService: MessageService,
    private modalLoading: ModalLoadingService
  ) { }


  ngOnInit(): void {
    this.airService.roomSelectedAir()
    this.selectedRoom();
  }

  public selectedRoom(): void {
    this.subscription.push(
      this.roomService.cardRoomEmitter.subscribe(res => {
        this.dataRoom = res;
        this.current_temperature = this.dataRoom.current_temperature_air;
        this.temperature_min = this.dataRoom.temperature_min_air;
        this.temperature_max = this.dataRoom.temperature_max_air;
        this.current_state_cool = Boolean(this.dataRoom.state_cool_air);
        this.current_state_fan = Boolean(this.dataRoom.state_fan_air);
      })
    )
  }

  public turnUpAir(): void {
    if (this.current_temperature < this.temperature_max) {
      this.current_temperature++;
    } else {
      this.messageService.openSnackBar("Temperatura máxima atingida!", "dangerMessage");
    }
  }

  public turnDownAir(): void {
    if (this.current_temperature > this.temperature_min) {
      this.current_temperature--;
    } else {
      this.messageService.openSnackBar("Temperatura minima atingida!", "dangerMessage");
    }
  }

  public sendCommand(): void {

    //Abre modal loading
    // this.modalLoading.openDialogLoading();

    this.arduinoService.sendTemprature(
      this.dataRoom.url_device_air,
      this.current_temperature,
      this.current_state_cool,
      this.current_state_fan).subscribe((res) => {
        this.modalLoading.dialog.closeAll()
      }, error => this.modalLoading.dialog.closeAll());

  }

  public turnOn(): void {
    //Abre modal loading
    // this.modalLoading.openDialogLoading();

    this.subscription.push(
      this.airService.currentAirData(this.dataRoom.fk_id_air).subscribe(res => {
        /*  this.current_temperature = res.current_temperature_air
          this.current_state_cool = res.state_cool_air
          this.current_state_fan = true//res.state_fan_air
          console.log(res)
        */
      })
    )
    this.subscription.push(
      this.arduinoService.sendTurnOnShutdown(this.dataRoom.url_device_air, 'liga').subscribe(res => {

        // this.modalLoading.dialog.closeAll()
      }, error => {
        //  this.modalLoading.dialog.closeAll()
      })
    )
  }


  public shutdown(): void {
    //Abre modal loading
    //  this.modalLoading.openDialogLoading();

    this.subscription.push(
      this.arduinoService.sendTurnOnShutdown(this.dataRoom.url_device_air, 'desliga').subscribe(res => {
        //   this.modalLoading.dialog.closeAll()
      }, error => {
        //  this.modalLoading.dialog.closeAll()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
