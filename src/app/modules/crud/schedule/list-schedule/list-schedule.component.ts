import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTable } from '@angular/material/table';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';

import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Schedule } from 'src/app/shared/models/schedule/schedule.model';
import { ScheduleCrud } from 'src/app/shared/models/schedule/scheduleCrud.model';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: any//ScheduleRoomDataSource;

  public rooms: CardRoom[];
  public id_room_selected: number = -1;
  public shift_selected: string = "notSelected";  
  public pavilions: Pavilion [];
  public id_pavilion_selected: number = -1;
  private scheduleEdit: ScheduleCrud 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    this.cleanSchedule();
    this.viewSchedule();
    this.initSelectPavilion();
    this.initObjScheduleEdit();
  }

  public initRoomsPavilionSelected() {
    this.roomService.readRoomByIdPavilion(this.id_pavilion_selected).subscribe(res => {
      this.rooms = res;
    }), error => this.messageService.openSnackBar(error.error, 'messageDanger'); 
  }

  private initSelectPavilion(): void {
    this.pavilionService.listActivePavilion().subscribe(( res: Pavilion[]) => {
      this.pavilions = res;
    })
  }

  private initObjScheduleEdit(): void {
    this.scheduleEdit = {
      id_schedule: null,
      id_room: null,
      name_room: null,
      shift: null,
      shift_time: [{
        "hour": null,
        "mon": null,
        "tue": null,
        "wed": null,
        "thu": null,
        "fri": null,
        "sat": null
      }],
      active_schedule: null
    }
  }

  public changedRoom(): void{
    this.scheduleService.cleanSchedule(); 
  }

  public changedPavilion(): void{
    this.scheduleService.cleanSchedule(); 
  }

  public changedShiftSchedule(): void{
    this.scheduleService.cleanSchedule(); 
  }

  public showDataFilter(): void{

    if(this.verifyDataFilter()){
      this.scheduleService.selectedShift(this.shift_selected);
      this.scheduleService.showSchedule(this.id_room_selected); 
    }
  }

  private viewSchedule(): void{
    this.scheduleService.scheduleEmitter.subscribe(res => {
      
      if(res[0].schedule_room != null){
        this.dataSource = JSON.parse(res[0].schedule_room);
        
        this.scheduleEdit = {
          id_schedule: res[0].id_schedule,
          id_room: res[0].id_room,
          name_room: res[0].name_room,
          shift: res[0].shift,
          shift_time: JSON.parse(res[0].schedule_room),
          active_schedule: null
        }
      
        this.messageService.openSnackBar("Sucesso ao exibir horário!", "successMessage");
      }else{
        this.scheduleService.cleanSchedule();
        this.messageService.openSnackBar("Não existe horário cadastrado para o filtro selecionado!", "alertMessage");
      }
    }, error => console.log(error));

  }

  private cleanSchedule(): void{
    this.scheduleService.cleanScheduleEmitter.subscribe(res => {
      this.dataSource = res;
      this.scheduleEdit.id_schedule = null;
    });
  }

  private verifyDataFilter(): boolean{
    if(this.id_room_selected == undefined || this.shift_selected == "notSelected"){
      this.messageService.openSnackBar("Dados do filtro não informado!", "alertMessage");
      return false;
    }
    return true;
  }

  public editSchedule(): void{
    // Mudar o modo de varificar. Não atribuir null ao obj. 
    if (this.scheduleEdit.id_schedule != null) {
      this.scheduleEdit.id_room = this.id_room_selected;
      this.scheduleEdit.shift = this.shift_selected;
      this.scheduleService.editSchedule(this.scheduleEdit);
      this.router.navigate(['homeSchedule/edit']); 
    }else{
      this.messageService.openSnackBar("Horário não selecionado!", "dangerMessage");
    }
    
  }

  public openDialogDelete(): void{
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        //this.deleteRoom(element.id_room);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteRoom(id_room: number): void{
/* 
    this.roomService.deleteRoom(id_room).subscribe( res => {   
      this.rooms = this.removeElementArrayRooms(id_room);
      this.dataSource = new MatTableDataSource<CrudRoom>(this.rooms);
    
    });  */
  }

  ngOnDestroy(): void{
   /*  this.scheduleService.selectedShift('notSelected');
    this.scheduleService.cleanSchedule(); */
  }
 
}
