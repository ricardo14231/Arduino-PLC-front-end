import { Component, Input, OnInit } from '@angular/core';
import { cardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor() { }

  @Input()
  room: cardRoom;

  ngOnInit(): void {
  }

}
