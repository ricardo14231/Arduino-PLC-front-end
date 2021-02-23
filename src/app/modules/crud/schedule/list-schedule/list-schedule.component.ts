import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';

import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';


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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    this.cleanSchedule();
    this.viewSchedule();
    this.initSelectPavilion();
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
    });
  }

  private verifyDataFilter(): boolean{
    if(this.id_room_selected == undefined || this.shift_selected == "notSelected"){
      this.messageService.openSnackBar("Dados do filtro não informado!", "alertMessage");
      return false;
    }
    return true;
  }

  public editAir(): void{
    /* this.roomService.editRoom(element);
    this.router.navigate(['homeRoom/edit']); */
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
