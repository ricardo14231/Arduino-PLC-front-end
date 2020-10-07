import { Component, OnInit } from '@angular/core';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { RoomService } from '../services/room/room.service';
import { ScheduleService } from '../services/schedule/schedule.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private scheduleService: ScheduleService
  ) { }

  nameRoomSelected: string = "...";
  nameRoomScheduleSelected: string = "...";

  ngOnInit(): void {

    this.roomService.cardRoomEmitter.subscribe((res: CardRoom) =>{
      this.nameRoomSelected = res.name_room;
    });

    this.scheduleService.scheduleEmitter.subscribe((res: Schedule) => {
      this.nameRoomScheduleSelected = res[0].name_room;
    });
  }

}
