import { Component, OnInit } from '@angular/core';
import { ArduinoService } from 'src/app/core/services/arduino/arduino.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Sensors } from 'src/app/shared/models/arduino/sensors.model';

@Component({
  selector: 'app-data-room',
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.css']
})
export class DataRoomComponent implements OnInit {

  constructor(
    private arduinoService: ArduinoService,
    private roomService: RoomService
  ) { }

  sensors: Sensors;
  turn_on_air: boolean;

  ngOnInit(): void {
    this.initObjSensors();
    this.dataRoom();
    this.roomInfo();
  }

  public dataRoom(): void{
    this.arduinoService.dataRoomEmitter.subscribe((res) => {
      this.sensors = res.sensores;
    });
  }

  private roomInfo(): void{
    this.roomService.cardRoomEmitter.subscribe((res) => {
      this.turn_on_air = Boolean(res.turn_on_air);
    });
  }

  private initObjSensors(): void{
    this.sensors = {
      'sHumidade': 0.0,
      'sPresenca': 0,
      'sTemperatura': 0.0
    }
  }

}
