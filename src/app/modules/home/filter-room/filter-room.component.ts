import { Component, OnInit } from '@angular/core';

import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { PavilionService } from '../../../core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';

@Component({
  selector: 'app-filter-room',
  templateUrl: './filter-room.component.html',
  styleUrls: ['./filter-room.component.css']
})
export class FilterRoomComponent implements OnInit {

  constructor(
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private scheduleService: ScheduleService,
  ) { }

  pavilions: Pavilion[];

  ngOnInit(): void {
    this.pavilionService.listActivePavilion().subscribe(res => {
      this.pavilions = res;
    });
  }

  public selectedPavilion(event): void{
    this.roomService.selectedPavilion(event.value);
    this.scheduleService.cleanSchedule();
  }

  
  public selectedShiftSchedule(event): void{
    this.scheduleService.selectedShift(event.value);
    this.scheduleService.cleanSchedule();
  }

  ngOnDestroy(): void{
    this.scheduleService.selectedShift('notSelected');
    this.scheduleService.cleanSchedule();
  }

}
