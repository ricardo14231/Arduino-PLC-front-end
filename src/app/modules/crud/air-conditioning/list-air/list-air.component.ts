import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';
import { Subscription } from 'rxjs';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Air } from 'src/app/shared/models/air/air.model';
import { AirService } from 'src/app/core/services/air/air.service';

@Component({
  selector: 'app-list-air',
  templateUrl: './list-air.component.html',
  styleUrls: ['./list-air.component.css']
})
export class ListAirComponent implements OnInit {

  constructor(
    private pavilionService: PavilionService,
    private airService: AirService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nameAir', 'allocated', 'temperatureMin', 'temperatureMax', 'urlDevice', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;
  pavilions: Pavilion[];
  airs: Air[];

  ngOnInit(): void {
    this.pavilionService.listActivePavilion().subscribe({
      next: responsePavilion => this.pavilions = responsePavilion,
      error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
    });
  }

  selectedPavilion(event): void {

    if (event.value != undefined) {

      if (event.value == "unallocatedAir") {
        this.airService.listUnallocatedActiveAir().subscribe({
          next: responseAir => this.setDataTable(responseAir),
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      } else {
        if (event.value == "listNotActiveAir") {
          this.airService.listNotActiveAir().subscribe({
            next: responseAir => this.setDataTable(responseAir),
            error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
          })
        } else {
          this.airService.listAllocatedAirByIdPavilion(event.value).subscribe({
            next: responseAir => this.setDataTable(responseAir),
            error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
          })
        }
      }
    } else {
      this.setDataTable([]);
    }
  }

  openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteAir(element.idAir);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private setDataTable(data: Air[]): void {
    this.dataSource = new MatTableDataSource<Air>(data);
    this.dataSource.paginator = this.paginator;
    this.airs = data;
  }

  private deleteAir(idAir: number): void {
    this.airService.deleteAir(idAir).subscribe({
      next: () => {
        this.airs = this.removeElementArrayAir(idAir);
        this.dataSource = new MatTableDataSource<Air>(this.airs);
      },
      error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
    });
  }

  editAir(air: Air): void {
    this.airService.air = air;
    this.router.navigate(['homeAir/edit']);
  }

  private removeElementArrayAir(idAir: number): any {
    let newArrayAir: Air[] = [];

    this.airs.map((r) => {
      if (r.idAir != idAir) {
        newArrayAir.push(r);
      }
    });

    return newArrayAir;
  }
}
