import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';


@Component({
  selector: 'app-schedule-room',
  templateUrl: './schedule-room.component.html',
  styleUrls: ['./schedule-room.component.css']
})

export class ScheduleRoomComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: any//ScheduleRoomDataSource;

  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  private subscription: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService,
  ) { }



  ngOnInit() {
    this.cleanSchedule();

    this.showSchedule();
  }

  private showSchedule(): void {

    this.subscription.push(
      this.scheduleService.scheduleEmitter.subscribe(responseSchedule => {

        if (responseSchedule[0].schedule_room != null && responseSchedule[0].schedule_room != 'null') {
          this.dataSource = JSON.parse(responseSchedule[0].schedule_room);
          this.messageService.openSnackBar("Sucesso ao exibir horário!", "successMessage");
        } else {
          this.scheduleService.cleanSchedule();
          this.messageService.openSnackBar("Não existe horário cadastrado para o filtro selecionado!", "alertMessage");
        }
      }, error => this.messageService.openSnackBar(error.error, 'dangerMessage')
      )
    )
  }

  private cleanSchedule(): void {
    this.scheduleService.cleanScheduleEmitter.subscribe(response => {
      this.dataSource = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
