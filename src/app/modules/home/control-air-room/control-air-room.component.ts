import { Component, OnInit } from '@angular/core';
import { ControlerService } from 'src/app/core/services/controler/controler.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-control-air-room',
  templateUrl: './control-air-room.component.html',
  styleUrls: ['./control-air-room.component.css']
})
export class ControlAirRoomComponent implements OnInit {

  constructor(
    private controlerService: ControlerService,
    private roomService: RoomService,
    private messageService: MessageService
  ) { }

  dataRoom: CardRoom;
  current_temperature: number = 0;
  current_state_cool: boolean = false;
  current_state_fan: boolean = false;
  temperature_min: number;
  temperature_max: number;


  ngOnInit(): void {
    this.selectedRoom();
  }

  public selectedRoom(): void {
    this.roomService.cardRoomEmitter.subscribe( res => {
      this.dataRoom = res;
      this.current_temperature = 25//this.dataRoom.current_temperature_air;
      this.temperature_min = this.dataRoom.temperature_min_air;
      this.temperature_max = this.dataRoom.temperature_max_air;
      this.current_state_cool = !!+this.dataRoom.state_cool_air;
      this.current_state_fan = !!+this.dataRoom.state_fan_air;
      
    });
  }

  public turnUpAir(): void {
    if(this.current_temperature < this.temperature_max){
      this.current_temperature++;
    }else{
      this.messageService.openSnackBar("Temperatura máxima atingida!", "dangerMessage")
    }
  }

  public turnDownAir(): void {
    if(this.current_temperature > this.temperature_min){
      this.current_temperature--;
    }else{
      this.messageService.openSnackBar("Temperatura minima atingida!", "dangerMessage")
    }
  }

  public sendCommand(): void {
    console.log(this.dataRoom)
    console.log(this.current_temperature)
    console.log(this.current_state_cool)
    console.log(this.current_state_fan)

  }

}
