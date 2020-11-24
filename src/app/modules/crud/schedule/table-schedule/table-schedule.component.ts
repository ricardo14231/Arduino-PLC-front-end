import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { Schedule } from 'src/app/shared/models/schedule.model';


export interface tableData {
  hour: string, 
  mon: string, 
  tue: string, 
  wed: string, 
  thu: string, 
  fri: string, 
  sat: string
}

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrls: ['./table-schedule.component.css']
})
export class TableScheduleComponent implements OnInit {

  constructor() { }

  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: tableData//ScheduleRoomDataSource;

  @Input()
  public shift_hour: string[];
  
  teste: tableData[]
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  
  ngOnInit(): void {

    /* this.teste = {
      hour: null, 
      mon: null, 
      tue: null, 
      wed: null, 
      thu: null, 
      fri: null, 
      sat: null 
    }; */

   /*  this.teste = this.shift_hour

    this.dataSource = this.teste
    console.log(this.dataSource) */

  }

}
