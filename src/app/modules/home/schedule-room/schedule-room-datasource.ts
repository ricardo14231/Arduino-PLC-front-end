/*

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ScheduleRoomItem {
  hour: any[],
  mon: any[],
  tue: any[],
  wed: any[],
  thu: any[],
  fri: any[],
  sat: any[], 
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ScheduleRoomItem[] = [
  {hour: ["07:00", "07:00","07:00","07:00","07:00","07:00"]},
  {mon: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
  {tue: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
  {wed: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
  {thu: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
  {fri: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
  {sat: ["AULA", "AULA","AULA","AULA","AULA","AULA"]},
];
*/
/**
 * Data source for the ScheduleRoom view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
/*
export class ScheduleRoomDataSource extends DataSource<ScheduleRoomItem> {
  data: ScheduleRoomItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
/*
   connect(): Observable<ScheduleRoomItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

 //   return merge(...dataMutations).pipe(map(() => {
 //     return this.getPagedData(this.getSortedData([...this.data]));
//    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
//  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
//  private getPagedData(data: ScheduleRoomItem[]) {
 //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //  return data.splice(startIndex, this.paginator.pageSize);
//  }
/*
  
  private getSortedData(data: ScheduleRoomItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}
*/

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
/*
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
*/

//}
