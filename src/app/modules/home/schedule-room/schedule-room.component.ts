import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
//import { ScheduleRoomDataSource, ScheduleRoomItem } from './schedule-room-datasource';

@Component({
  selector: 'app-schedule-room',
  templateUrl: './schedule-room.component.html',
  styleUrls: ['./schedule-room.component.css']
})
export class ScheduleRoomComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatTable) table: MatTable<ScheduleRoomItem>;
    dataSource: any//ScheduleRoomDataSource;

  schedule = {
    hour: ["07:00", "07:00", "07:00", "07:00", "07:00", "07:00"],
    mon: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"],
    tue: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"],
    wed: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"],
    thu: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"],
    fri: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"],
    sat: ["AULA", "AULA", "AULA", "AULA", "AULA", "AULA"], 
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit() {
    this.dataSource = this.schedule//new ScheduleRoomDataSource();
    console.log(this.dataSource.hour)
  }

  ngAfterViewInit() {
   // this.dataSource.sort = this.sort;
   // this.dataSource.paginator = this.paginator;
//    this.table.dataSource = this.dataSource;
  }
}
