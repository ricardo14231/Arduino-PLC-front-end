import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { ClassTime } from 'src/app/shared/models/classTime/ClassTime.model';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { Schedule } from 'src/app/shared/models/schedule.model';

@Component({
  selector: 'app-form-update-create-schedule',
  templateUrl: './form-update-create-schedule.component.html',
  styleUrls: ['./form-update-create-schedule.component.css']
})
export class FormUpdateCreateScheduleComponent implements OnInit {

  constructor(
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private messageService: MessageService
  ) { }

  @ViewChild(MatTable) table: MatTable<any>;
 
  public pavilions: Pavilion[]
  public rooms: CardRoom[]

  public schedule: Schedule;
  private shift_hour_morning: string[];
  private shift_hour_afternoon: string[];
  private shift_hour_night: string[];
  public id_pavilion_selected: number = -1;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    this.initObjSchedule();
    this.initItemsPavilionSelect();
  }

  private initObjSchedule(): void{
    this.shift_hour_morning = ["07:30", "08:10", "09:00", "10:00", "10:50", "11:40"];
    this.shift_hour_afternoon = ["13:10", "14:00", "14:50", "15:50", "16:40"];
    this.shift_hour_night = ["18:20", "19:10", "20:00", "20:50", "21:40"];
    

    this.schedule = {
      fk_id_room: null,
      id_schedule: null,
      shift_morning: this.insertHourMorning(),
      shift_afternoon: this.insertHourAfternoon(),
      shift_night: this.insertHourNight(), 
      active_schedule: false,
    }
  }

  private initItemsPavilionSelect(): void {
    this.pavilionService.listActivePavilion().subscribe((res: Pavilion[]) => {
      this.pavilions = res
    })
  }

  public initItemsRoomsPavilionSelected() {
    this.roomService.readRoomByIdPavilion(this.id_pavilion_selected).subscribe(res => {
      this.rooms = res;
    }), error => this.messageService.openSnackBar(error.error, 'messageDanger'); 
  }

  private insertHourMorning(): ClassTime[] {
    const hours: ClassTime[] = []
    this.shift_hour_morning.forEach((elem, index) => {
      hours[index] = ({
        hour: elem,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null
      }) 
    }) 
    return hours    
  }

  private insertHourAfternoon(): ClassTime[] {
    const hours: ClassTime[] = []
    this.shift_hour_afternoon.forEach((elem, index) => {
      hours[index] = ({
        hour: elem,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null
      }) 
    }) 
    return hours    
  }

  private insertHourNight(): ClassTime[] {
    const hours: ClassTime[] = []
    this.shift_hour_night.forEach((elem, index) => {
      hours[index] = ({
        hour: elem,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null
      }) 
    }) 
    return hours    
  }

  public editAir(): void{
    
  }

  public onSubmit(form): void{
     console.log(form) 
  }

  ngOnDestroy(): void{
   /*  this.subscription.map( sub => {
      sub.unsubscribe();
    }); */
  }

}
