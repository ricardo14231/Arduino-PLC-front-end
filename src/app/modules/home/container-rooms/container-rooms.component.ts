import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room/room.service';
import { cardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-container-rooms',
  templateUrl: './container-rooms.component.html',
  styleUrls: ['./container-rooms.component.css']
})
export class ContainerRoomsComponent implements OnInit {

  constructor(
    private roomService: RoomService,
  ) { }

  rooms: cardRoom[];

  ngOnInit(): void {
    this.listRoom();
  }

  public listRoom(): void{
    this.roomService.roomsEmitter.subscribe(res => {
      this.rooms = res;
    });
  }

  public selectedRoom(room): void{
    this.roomService.selectedRoom(room);
  }

}
