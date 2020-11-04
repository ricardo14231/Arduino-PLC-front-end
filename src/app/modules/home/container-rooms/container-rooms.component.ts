import { Component, OnInit } from '@angular/core';
import { ArduinoService } from 'src/app/core/services/arduino/arduino.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-container-rooms',
  templateUrl: './container-rooms.component.html',
  styleUrls: ['./container-rooms.component.css']
})
export class ContainerRoomsComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private arduinoService: ArduinoService,
    private messageService: MessageService
  ) { }

  rooms: CardRoom[];

  ngOnInit(): void {
    this.listRoom();
  }

  public listRoom(): void{
    this.roomService.roomsEmitter.subscribe(res => {
      this.rooms = res;
    }), error => this.messageService.openSnackBar(error.error, 'messageDanger');
  }

  public selectedRoom(room): void{
    this.roomService.selectedRoom(room);
    this.arduinoService.selectedRoom(room.url_device_air);
  }

}
