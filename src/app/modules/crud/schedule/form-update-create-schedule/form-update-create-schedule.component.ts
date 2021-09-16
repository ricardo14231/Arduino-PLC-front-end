import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTable } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';
import { ClassTime } from 'src/app/shared/models/classTime/ClassTime.model';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { Schedule } from 'src/app/shared/models/schedule/schedule.model';
import { ScheduleCrud } from 'src/app/shared/models/schedule/scheduleCrud.model';

@Component({
  selector: 'app-form-update-create-schedule',
  templateUrl: './form-update-create-schedule.component.html',
  styleUrls: ['./form-update-create-schedule.component.css']
})

export class FormUpdateCreateScheduleComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  indexTabGroup: number = 0;

  pavilions: Pavilion[]
  rooms: CardRoom[]
  private subscription: Subscription[] = []

  schedule: Schedule;
  private shiftHourMorning: string[];
  private shiftHourAfternoon: string[];
  private shiftHourNight: string[];

  unenabledHourMorning: boolean = false
  unenabledHourAfternoon: boolean = false
  unenabledHourNight: boolean = false
  unenabledHourEdit: boolean = false
  edit: boolean = false;
  editAllSchedule: boolean = false;
  scheduleEdit: ScheduleCrud;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  constructor(
    private scheduleService: ScheduleService,
    private pavilionService: PavilionService,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initObjSchedule();
    this.initItemsPavilionSelect();
    this.editSchedule();
    this.edit = false;
  }

  private initObjSchedule(): void {
    this.shiftHourMorning = ["07:30", "08:10", "09:00", "10:00", "10:50", "11:40"];
    this.shiftHourAfternoon = ["13:10", "14:00", "14:50", "15:50", "16:40"];
    this.shiftHourNight = ["18:20", "19:10", "20:00", "20:50", "21:40"];

    this.schedule = {
      fkIdRoom: null,
      idSchedule: null,
      shiftMorning: this.insertHourTable(this.shiftHourMorning),
      shiftAfternoon: this.insertHourTable(this.shiftHourAfternoon),
      shiftNight: this.insertHourTable(this.shiftHourNight),
      activeSchedule: false,
    }
  }

  private initItemsPavilionSelect(): void {
    this.subscription.push(
      this.pavilionService.listActivePavilion().subscribe({
        next: responsePavilion => this.pavilions = responsePavilion,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  public initItemsRoomsPavilionSelected(element) {
    this.subscription.push(
      this.roomService.readRoomByIdPavilion(element.value).subscribe({
        next: responsePavilion => this.rooms = responsePavilion,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  private insertHourTable(shift_hour: string[]): ClassTime[] {
    const hours: ClassTime[] = []
    shift_hour.forEach((elem, index) => {
      hours[index] = ({
        "hour": elem,
        "mon": null,
        "tue": null,
        "wed": null,
        "thu": null,
        "fri": null,
        "sat": null
      })
    })
    return hours
  }

  public editSchedule(): void {
    this.subscription.push(
      this.scheduleService.editScheduleEmitter.subscribe((res: ScheduleCrud) => {
        this.edit = true;
        this.scheduleEdit = res;
        this.getShiftSchedule();
        this.unenabledHourMorning = true
      })
    )
  }

  public getShiftSchedule(): string {
    let label: string;
    switch (this.scheduleEdit.shift) {
      case 'shiftMorning': {
        label = 'Matutino';
        break
      }
      case 'shiftAfternoon': {
        label = 'Vespertino';
        break
      }
      case 'shiftNight': {
        label = 'Noturno';
        break
      }
    }

    return label
  }

  private setFlagShiftStatusNull(): void {
    if (this.schedule.shiftMorning === null)
      this.unenabledHourMorning = true

    if (this.schedule.shiftAfternoon === null)
      this.unenabledHourAfternoon = true

    if (this.schedule.shiftNight === null)
      this.unenabledHourNight = true
  }

  private setShiftStatus(): void {
    if (this.unenabledHourMorning) {
      this.schedule.shiftMorning = null
    }
    if (this.unenabledHourAfternoon) {
      this.schedule.shiftAfternoon = null
    }
    if (this.unenabledHourNight) {
      this.schedule.shiftNight = null
    }
  }

  public onSubmit(form): void {

    if (this.edit) {
      this.scheduleEdit.activeSchedule = form.value.activeSchedule;

      this.subscription.push(
        this.scheduleService.updateSchedule(this.scheduleEdit).subscribe({
          next: response => {
            this.messageService.openSnackBar('Sucesso ao atualizar horário!', 'successMessage')
            this.router.navigate(['homeSchedule/list'])
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    }
    else {
      this.setShiftStatus()

      this.schedule.fkIdRoom = form.value.fkIdRoom
      this.schedule.activeSchedule = form.value.activeSchedule

      if (this.editAllSchedule) {
        this.subscription.push(
          this.scheduleService.updateAllSchedule(this.schedule).subscribe({
            next: response => this.router.navigate(['homeSchedule/list']),
            error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
          })
        )
      }
      else {
        this.subscription.push(
          this.scheduleService.createSchedule(this.schedule).subscribe({
            next: response => this.router.navigate(['homeSchedule/list']),
            error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
          })
        )
      }
    }
  }

  private getShiftTabGroup(): string {
    if (this.indexTabGroup == 0)
      return 'shiftMorning'

    if (this.indexTabGroup == 1)
      return 'shiftAfternoon'

    if (this.indexTabGroup == 2)
      return 'shiftNight'
  }

  public getIdScheduleRoom(idRoom): void {
    //TODO: FAZER CONSULTA; CASO RETORNO O idSchedule, FAZER UM UPDATE; CASO RETORNE null, CRIAR O HORÁRIO

    if (this.schedule.fkIdRoom === null) {
      this.messageService.openSnackBar('Selecione o pavilhão e sala!', 'alertMessage');
    } else {
      this.scheduleService.getIdScheduleRoom(this.schedule.fkIdRoom, this.getShiftTabGroup()).subscribe({
        next: responseSchedule => {

          if (responseSchedule[0].shift_schedule != null) {
            this.messageService.openSnackBar('A sala já possui um horário! O horário informado será atualizado', 'alertMessage');
            this.editAllSchedule = true
            this.schedule.idSchedule = responseSchedule[0].idSchedule
            this.schedule.activeSchedule = true

            this.setShiftObjSchedule(responseSchedule[0].shift_schedule);

          } else {
            //cadastrar horário
            this.editAllSchedule = false

            /* this.edit = true; */
            this.scheduleEdit.nameRoom = 'teste'
            this.scheduleEdit.shiftTime = this.schedule.shiftNight

            this.scheduleEdit.idSchedule = 1
            this.scheduleEdit.shift = 'shiftNight'

            this.setFlagShiftStatusNull();
          }
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    }
  }

  private setShiftObjSchedule(shift_schedule): void {
    let shift = this.getShiftTabGroup();

    if (shift === 'shiftMorning') {
      this.schedule.shiftMorning = JSON.parse(shift_schedule)
    }
    else
      if (shift === 'shiftAfternoon') {
        this.schedule.shiftAfternoon = JSON.parse(shift_schedule)
      }
      else {
        this.schedule.shiftNight = JSON.parse(shift_schedule)
      }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }

}
