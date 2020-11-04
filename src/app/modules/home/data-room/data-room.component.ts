import { Component, OnInit } from '@angular/core';
import { ArduinoService } from 'src/app/core/services/arduino/arduino.service';
import { Sensors } from 'src/app/shared/models/arduino/sensors.model';

@Component({
  selector: 'app-data-room',
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.css']
})
export class DataRoomComponent implements OnInit {

  constructor(
    private arduinoService: ArduinoService
  ) { }

  sensors: Sensors;

  ngOnInit(): void {
    this.initObjSensors();
    this.dataRoom();
  }

  public dataRoom(): void{
    this.arduinoService.dataRoomEmitter.subscribe( (res) => {
      this.sensors = res.sensores;
      console.log( this.sensors)

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
