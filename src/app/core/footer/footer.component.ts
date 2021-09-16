import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message/message.service';
import { RoomService } from '../services/room/room.service';
import { ScheduleService } from '../services/schedule/schedule.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  nameRoomSelected: string = "...";
  nameRoomScheduleSelected: string = "...";

  private subscription: Subscription[] = [];
  
  constructor(
    private roomService: RoomService,
    private scheduleService: ScheduleService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.subscription.push(
      this.roomService.cardRoomEmitter.subscribe({
        next: room => this.nameRoomSelected = room.nameRoom,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );

    this.subscription.push(
      this.scheduleService.scheduleEmitter.subscribe({
        next: shedule => this.nameRoomScheduleSelected = shedule[0].nameRoom,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }
}
