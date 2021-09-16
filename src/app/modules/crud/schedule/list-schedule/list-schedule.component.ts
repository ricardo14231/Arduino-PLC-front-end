import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTable } from '@angular/material/table';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';

import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Schedule } from 'src/app/shared/models/schedule/schedule.model';
import { ScheduleCrud } from 'src/app/shared/models/schedule/scheduleCrud.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: any//ScheduleRoomDataSource;

  public rooms: CardRoom[];
  public idRoomSelected: number = -1;
  public shiftSelected: string = "notSelected";
  public pavilions: Pavilion[];
  public idPavilionSelected: number = -1;
  private scheduleEdit: ScheduleCrud;

  private subscription: Subscription[] = [];

  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  constructor(
    private scheduleService: ScheduleService,
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cleanSchedule();
    this.viewSchedule();
    this.initSelectPavilion();
    this.initObjScheduleEdit();
  }

  public initRoomsPavilionSelected() {
    this.subscription.push(
      this.roomService.readRoomByIdPavilion(this.idPavilionSelected).subscribe({
        next: responseRoom => this.rooms = responseRoom,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  private initSelectPavilion(): void {
    this.subscription.push(
      this.pavilionService.listActivePavilion().subscribe((res: Pavilion[]) => {
        this.pavilions = res;
      })
    )
  }

  private initObjScheduleEdit(): void {
    this.scheduleEdit = {
      idSchedule: null,
      idRoom: null,
      nameRoom: null,
      shift: null,
      shiftTime: [{
        "hour": null,
        "mon": null,
        "tue": null,
        "wed": null,
        "thu": null,
        "fri": null,
        "sat": null
      }],
      activeSchedule: null
    }
  }

  public changedRoom(): void {
    this.scheduleService.cleanSchedule();
  }

  public changedPavilion(): void {
    this.scheduleService.cleanSchedule();
  }

  public changedShiftSchedule(): void {
    this.scheduleService.cleanSchedule();
  }

  public showDataFilter(): void {

    if (this.verifyDataFilter()) {
      this.scheduleService.selectedShift(this.shiftSelected);
      this.scheduleService.showSchedule(this.idRoomSelected);
    }
  }

  private viewSchedule(): void {
    this.subscription.push(
      this.scheduleService.scheduleEmitter.subscribe(res => {

        if (res[0].schedule_room != null) {
          this.dataSource = JSON.parse(res[0].scheduleRoom);

          this.scheduleEdit = {
            idSchedule: res[0].idSchedule,
            idRoom: res[0].idRoom,
            nameRoom: res[0].nameRoom,
            shift: res[0].shift,
            shiftTime: JSON.parse(res[0].scheduleRoom),
            activeSchedule: null
          }

          this.messageService.openSnackBar("Sucesso ao exibir horário!", "successMessage");
        } else {
          this.scheduleService.cleanSchedule();
          this.messageService.openSnackBar("Não existe horário cadastrado para o filtro selecionado!", "alertMessage");
        }
      }, error => this.messageService.openSnackBar(error.error, 'dangerMessage'))
    )
  }

  private cleanSchedule(): void {
    this.subscription.push(
      this.scheduleService.cleanScheduleEmitter.subscribe(res => {
        this.dataSource = res;
        this.scheduleEdit.idSchedule = null;
      })
    )
  }

  private verifyDataFilter(): boolean {
    if (this.idRoomSelected == undefined || this.shiftSelected == "notSelected") {
      this.messageService.openSnackBar("Dados do filtro não informado!", "alertMessage");
      return false;
    }
    return true;
  }

  public editSchedule(): void {
    // Mudar o modo de varificar. Não atribuir null ao obj. 
    if (this.scheduleEdit.idSchedule != null) {
      this.scheduleEdit.idRoom = this.idRoomSelected;
      this.scheduleEdit.shift = this.shiftSelected;
      this.scheduleService.editSchedule(this.scheduleEdit);
      this.router.navigate(['homeSchedule/edit']);
    } else {
      this.messageService.openSnackBar("Horário não selecionado!", "dangerMessage");
    }

  }

  public openDialogDelete(): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        //this.deleteRoom(element.idRoom);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteRoom(idRoom: number): void {
    /* 
        this.roomService.deleteRoom(idRoom).subscribe( res => {   
          this.rooms = this.removeElementArrayRooms(idRoom);
          this.dataSource = new MatTableDataSource<CrudRoom>(this.rooms);
        
        });  */
  }

  ngOnDestroy(): void {
    /*  this.scheduleService.selectedShift('notSelected');
     this.scheduleService.cleanSchedule(); */
    this.subscription.forEach(sub => sub.unsubscribe())
  }
}
