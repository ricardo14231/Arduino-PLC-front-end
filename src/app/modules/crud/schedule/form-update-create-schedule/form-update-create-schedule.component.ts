import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { Schedule } from 'src/app/shared/models/schedule.model';

@Component({
  selector: 'app-form-update-create-schedule',
  templateUrl: './form-update-create-schedule.component.html',
  styleUrls: ['./form-update-create-schedule.component.css']
})
export class FormUpdateCreateScheduleComponent implements OnInit {

  constructor() { }

  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: any//ScheduleRoomDataSource;
  public schedule: Schedule;
  public rooms: CardRoom[];

  public shift_morning: string[];
  public shift_afternoon: string[];
  public shift_night: string[];

  public panelOpenState = false;
  public schedule_null: boolean = false;
  public schedule_moning_null: boolean = false;
  closed: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    this.initObjSchedule();
  }

  private initObjSchedule(): void{
    this.schedule = {
      fk_id_room: null,
      id_schedule: null,
      shift_morning: {
        hour: null, 
        mon: null, 
        tue: null, 
        wed: null, 
        thu: null, 
        fri: null, 
        sat: null 
      },
      shift_afternoon: {
        hour: null, 
        mon: null, 
        tue: null, 
        wed: null, 
        thu: null, 
        fri: null, 
        sat: null
      },
      shift_night: {
        hour: null, 
        mon: null, 
        tue: null, 
        wed: null, 
        thu: null, 
        fri: null, 
        sat: null 
      }, 
      active_schedule: false,
    }

  
    this.shift_morning = ["07:30", "08:10", "09:00", "10:00", "10:50", "11:40" ];
    this.shift_afternoon = ["13:10", "14:00", "14:50", "15:50", "16:40"];
     // console.log(this.schedule.schedule_room[0].mon)
  }

  public editAir(): void{
    /* this.subscription.push( 
      this.roomService.roomEmitter.subscribe((res: CrudRoom) => {
        this.room.id_room = res.id_room;
        this.room.name_room = res.name_room;
        this.room.name_air = res.name_air;
        this.room.fk_id_pavilion = res.fk_id_pavilion;
        this.room.fk_id_air = res.fk_id_air;
        this.room.active_room = res.active_room;

        this.edit = true;
      })
    ); */
  }

  public onSubmit(form): void{
     console.log(form) 
  }

  ngOnDestroy(): void{
   /*  this.subscription.map( sub => {
      sub.unsubscribe();
    }); */
  }

  set(b){
    this.panelOpenState = b
    console.log("Teste")
  }

}
