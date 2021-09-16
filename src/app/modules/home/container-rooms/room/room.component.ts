import { Component, Input } from '@angular/core';

import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  constructor(
    private scheduleService: ScheduleService,
  ) { }

  @Input() room: CardRoom;

  public clickedSchedule(idRoom): void{
    this.scheduleService.showSchedule(idRoom);
  }
}
