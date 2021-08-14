import { Component, OnInit } from '@angular/core';

import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { PavilionService } from '../../../core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-room',
  templateUrl: './filter-room.component.html',
  styleUrls: ['./filter-room.component.css']
})
export class FilterRoomComponent implements OnInit {

  private subscription: Subscription;

  constructor(
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private scheduleService: ScheduleService,
  ) { }

  pavilions: Pavilion[];

  ngOnInit(): void {
    this.subscription = this.pavilionService.listActivePavilion().subscribe(responsePavilion => {
      this.pavilions = responsePavilion;
    });
  }

  public selectedPavilion(event): void {
    this.roomService.selectedPavilion(event.value);
    this.scheduleService.cleanSchedule();
  }


  public selectedShiftSchedule(event): void {
    this.scheduleService.selectedShift(event.value);
    this.scheduleService.cleanSchedule();
  }

  ngOnDestroy(): void {
    this.scheduleService.selectedShift('notSelected');
    this.scheduleService.cleanSchedule();
    this.subscription.unsubscribe();
  }

}
