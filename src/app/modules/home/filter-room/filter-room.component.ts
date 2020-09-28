import { Component, OnInit } from '@angular/core';

import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { PavilionService } from '../../../core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';

@Component({
  selector: 'app-filter-room',
  templateUrl: './filter-room.component.html',
  styleUrls: ['./filter-room.component.css']
})
export class FilterRoomComponent implements OnInit {

  constructor(
    private pavilionService: PavilionService,
    private roomService: RoomService
  ) { }

  pavilions: Pavilion[];

  ngOnInit(): void {
    this.pavilionService.listPavilion().subscribe(res => {
      this.pavilions = res;
    });
  }

  public selectedPavilion(event): void{
    this.roomService.selectedPavilion(event.target.value);
  }

}
