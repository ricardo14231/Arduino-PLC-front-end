import { Component, OnInit } from '@angular/core';
import { ControlerService } from 'src/app/core/services/controler/controler.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { cardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-control-air-room',
  templateUrl: './control-air-room.component.html',
  styleUrls: ['./control-air-room.component.css']
})
export class ControlAirRoomComponent implements OnInit {

  constructor(
    private controlerService: ControlerService,
    private roomService: RoomService
  ) { }

  dataRoom: cardRoom;

  ngOnInit(): void {
    this.selectedRoom();
  }

  public selectedRoom(): void{
    this.roomService.cardRoomEmitter.subscribe( res => {
      console.log(res)
      this.dataRoom = res;
    });
  }

}
