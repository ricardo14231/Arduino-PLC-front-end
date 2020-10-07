import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MessageService } from 'src/app/core/services/message/message.service';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';


@Component({
  selector: 'app-schedule-room',
  templateUrl: './schedule-room.component.html',
  styleUrls: ['./schedule-room.component.css']
})

export class ScheduleRoomComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: any//ScheduleRoomDataSource;

  constructor(
    private scheduleService: ScheduleService,
    private messageService: MessageService,
  ){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit() {
    this.cleanSchedule();

    this.showSchedule();
  }

  private showSchedule(): void{
    this.scheduleService.scheduleEmitter.subscribe(res => {
      
      if(res[0].schedule_room != null){
        this.dataSource = JSON.parse(res[0].schedule_room);
        this.messageService.openSnackBar("Sucesso ao exibir horário!", "successMessage");
      }else{
        this.scheduleService.cleanSchedule();
        this.messageService.openSnackBar("Não existe horário cadastrado para o filtro selecionado!", "alertMessage");
      }
    })

  }

  private cleanSchedule(): void{
    this.scheduleService.cleanScheduleEmitter.subscribe(res => {
      this.dataSource = res;
    });
  }

}
