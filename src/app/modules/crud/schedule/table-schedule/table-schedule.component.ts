import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { ClassTime } from 'src/app/shared/models/classTime/ClassTime.model';


@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrls: ['./table-schedule.component.css']
})
export class TableScheduleComponent implements OnInit {

  constructor() { }

  @ViewChild(MatTable) table: MatTable<any>;
  public dataSource: any[]

  @Input() shiftHour: string[];
  @Input() shift: ClassTime[];
  @Input() enabledHour: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['hour', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  ngOnInit(): void {
    this.dataSource = this.shift;
  }

  ngOnDestroy(): void {
    this.shift = null;
    this.dataSource = null;
  }
}
