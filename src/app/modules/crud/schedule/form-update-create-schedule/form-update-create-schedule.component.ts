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
import { Pavilion } from 'src/app/shared/models/pavilion.model';
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
  private shift_hour_morning: string[];
  private shift_hour_afternoon: string[];
  private shift_hour_night: string[];

  unenabled_hour_morning: boolean = false
  unenabled_hour_afternoon: boolean = false
  unenabled_hour_night: boolean = false
  unenabled_hour_edit: boolean = false
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
    this.shift_hour_morning = ["07:30", "08:10", "09:00", "10:00", "10:50", "11:40"];
    this.shift_hour_afternoon = ["13:10", "14:00", "14:50", "15:50", "16:40"];
    this.shift_hour_night = ["18:20", "19:10", "20:00", "20:50", "21:40"];

    this.schedule = {
      fk_id_room: null,
      id_schedule: null,
      shift_morning: this.insertHourTable(this.shift_hour_morning),
      shift_afternoon: this.insertHourTable(this.shift_hour_afternoon),
      shift_night: this.insertHourTable(this.shift_hour_night),
      active_schedule: false,
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
        this.unenabled_hour_morning = true
      })
    )
  }

  public getShiftSchedule(): string {
    let label: string;
    switch (this.scheduleEdit.shift) {
      case 'shift_morning': {
        label = 'Matutino';
        break
      }
      case 'shift_afternoon': {
        label = 'Vespertino';
        break
      }
      case 'shift_night': {
        label = 'Noturno';
        break
      }
    }

    return label
  }

  private setFlagShiftStatusNull(): void {
    if (this.schedule.shift_morning === null)
      this.unenabled_hour_morning = true

    if (this.schedule.shift_afternoon === null)
      this.unenabled_hour_afternoon = true

    if (this.schedule.shift_night === null)
      this.unenabled_hour_night = true
  }

  private setShiftStatus(): void {
    if (this.unenabled_hour_morning) {
      this.schedule.shift_morning = null
    }
    if (this.unenabled_hour_afternoon) {
      this.schedule.shift_afternoon = null
    }
    if (this.unenabled_hour_night) {
      this.schedule.shift_night = null
    }
  }

  public onSubmit(form): void {

    if (this.edit) {
      this.scheduleEdit.active_schedule = form.value.active_schedule;

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

      this.schedule.fk_id_room = form.value.fk_id_room
      this.schedule.active_schedule = form.value.active_schedule

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
      return 'shift_morning'

    if (this.indexTabGroup == 1)
      return 'shift_afternoon'

    if (this.indexTabGroup == 2)
      return 'shift_night'
  }

  public getIdScheduleRoom(idRoom): void {
    //TODO: FAZER CONSULTA; CASO RETORNO O id_schedule, FAZER UM UPDATE; CASO RETORNE null, CRIAR O HORÁRIO

    if (this.schedule.fk_id_room === null) {
      this.messageService.openSnackBar('Selecione o pavilhão e sala!', 'alertMessage');
    } else {
      this.scheduleService.getIdScheduleRoom(this.schedule.fk_id_room, this.getShiftTabGroup()).subscribe({
        next: responseSchedule => {

          if (responseSchedule[0].shift_schedule != null) {
            this.messageService.openSnackBar('A sala já possui um horário! O horário informado será atualizado', 'alertMessage');
            this.editAllSchedule = true
            this.schedule.id_schedule = responseSchedule[0].id_schedule
            this.schedule.active_schedule = true

            this.setShiftObjSchedule(responseSchedule[0].shift_schedule);

          } else {
            //cadastrar horário
            this.editAllSchedule = false

            /* this.edit = true; */
            this.scheduleEdit.name_room = 'teste'
            this.scheduleEdit.shift_time = this.schedule.shift_night

            this.scheduleEdit.id_schedule = 1
            this.scheduleEdit.shift = 'shift_night'

            this.setFlagShiftStatusNull();
          }
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    }
  }

  private setShiftObjSchedule(shift_schedule): void {
    let shift = this.getShiftTabGroup();

    if (shift === 'shift_morning') {
      this.schedule.shift_morning = JSON.parse(shift_schedule)
    }
    else
      if (shift === 'shift_afternoon') {
        this.schedule.shift_afternoon = JSON.parse(shift_schedule)
      }
      else {
        this.schedule.shift_night = JSON.parse(shift_schedule)
      }
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }

}
