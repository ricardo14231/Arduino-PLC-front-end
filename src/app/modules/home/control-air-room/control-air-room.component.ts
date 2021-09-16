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
  currentTemperature: number = 0;
  currentStateCool: boolean = false;
  currentStateFan: boolean = false;
  temperatureMin: number;
  temperatureMax: number;

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
        this.currentTemperature = this.dataRoom.currentTemperatureAir;
        this.temperatureMin = this.dataRoom.temperatureMinAir;
        this.temperatureMax = this.dataRoom.temperatureMaxAir;
        this.currentStateCool = Boolean(this.dataRoom.stateCoolAir);
        this.currentStateFan = Boolean(this.dataRoom.stateFanAir);
      })
    )
  }

  public turnUpAir(): void {
    if (this.currentTemperature < this.temperatureMax) {
      this.currentTemperature++;
    } else {
      this.messageService.openSnackBar("Temperatura máxima atingida!", "dangerMessage");
    }
  }

  public turnDownAir(): void {
    if (this.currentTemperature > this.temperatureMin) {
      this.currentTemperature--;
    } else {
      this.messageService.openSnackBar("Temperatura minima atingida!", "dangerMessage");
    }
  }

  public sendCommand(): void {

    //Abre modal loading
    // this.modalLoading.openDialogLoading();

    this.arduinoService.sendTemprature(
      this.dataRoom.urlDeviceAir,
      this.currentTemperature,
      this.currentStateCool,
      this.currentStateFan).subscribe((res) => {
        this.modalLoading.dialog.closeAll()
      }, error => this.modalLoading.dialog.closeAll());

  }

  public turnOn(): void {
    //Abre modal loading
    // this.modalLoading.openDialogLoading();

    this.subscription.push(
      this.airService.currentAirData(this.dataRoom.fkIdAir).subscribe(res => {
        /*  this.currentTemperature = res.currentTemperature_air
          this.currentStateCool = res.state_cool_air
          this.currentStateFan = true//res.state_fan_air
          console.log(res)
        */
      })
    )
    this.subscription.push(
      this.arduinoService.sendTurnOnShutdown(this.dataRoom.urlDeviceAir, 'liga').subscribe(res => {

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
      this.arduinoService.sendTurnOnShutdown(this.dataRoom.urlDeviceAir, 'desliga').subscribe(res => {
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
