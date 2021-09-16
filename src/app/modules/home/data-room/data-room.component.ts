import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArduinoService } from 'src/app/core/services/arduino/arduino.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Sensors } from 'src/app/shared/models/arduino/sensors.model';

@Component({
  selector: 'app-data-room',
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.css']
})
export class DataRoomComponent implements OnInit {

  sensors: Sensors;
  turnOnAir: boolean;

  private subscription: Subscription[] = [];

  constructor(
    private arduinoService: ArduinoService,
    private roomService: RoomService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initObjSensors();
    this.dataRoom();
    this.roomInfo();
  }

  public dataRoom(): void {
    this.subscription.push(
      this.arduinoService.dataRoomEmitter.subscribe(res => {
        this.sensors = res.sensores;
      },
        error => this.messageService.openSnackBar(error.error, 'dangerMessage'))
    )
  }

  private roomInfo(): void {
    this.subscription.push(
      this.roomService.cardRoomEmitter.subscribe(res => {
        this.turnOnAir = Boolean(res.turnOnAir);
      },
        error => this.messageService.openSnackBar(error.error, 'dangerMessage'))
    )
  }

  private initObjSensors(): void {
    this.sensors = {
      'sTemperatura': 0.0,
      'sPresenca': 0
    }
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
