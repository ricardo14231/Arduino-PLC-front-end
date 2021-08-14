import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { Subscription } from 'rxjs';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Air } from 'src/app/shared/models/air/listAir.model';
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
  displayedColumns: string[] = ['id', 'name_air', 'allocated', 'temperature_min', 'temperature_max', 'url_device', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;
  pavilions: Pavilion[];
  airs: Air[];

  private subscription: Subscription[] = [];

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.subscription.push(
      this.pavilionService.listActivePavilion().subscribe({
        next: responsePavilion => this.pavilions = responsePavilion,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      }),
    );
  }

  public selectedPavilion(event): void {

    if (event.value != undefined) {

      if (event.value == "unallocatedAir") {
        this.subscription.push(
          this.airService.listUnallocatedActiveAir().subscribe({
            next: responseAir => this.setDataTable(responseAir),
            error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
          })
        )
      } else {
        if (event.value == "listNotActiveAir") {
          this.subscription.push(
            this.airService.listNotActiveAir().subscribe({
              next: responseAir => this.setDataTable(responseAir),
              error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
            })
          )
        } else {
          this.subscription.push(
            this.airService.listAllocatedAirByIdPavilion(event.value).subscribe({
              next: responseAir => this.setDataTable(responseAir),
              error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
            })
          )
        }
      }
    } else {
      this.setDataTable([]);
    }
  }

  private setDataTable(data: Air[]): void {
    this.dataSource = new MatTableDataSource<Air>(data);
    this.dataSource.paginator = this.paginator;
    this.airs = data;
  }

  public openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteAir(element.id_air);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteAir(id_air: number): void {
    this.subscription.push(
      this.airService.deleteAir(id_air).subscribe({
        next: response => {
          this.airs = this.removeElementArrayAir(id_air);
          this.dataSource = new MatTableDataSource<Air>(this.airs);
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  private removeElementArrayAir(id_air: number): any {
    let newArrayAir: Air[] = [];

    this.airs.map((r) => {
      if (r.id_air != id_air) {
        newArrayAir.push(r);
      }
    });

    return newArrayAir;
  }

  public editAir(element): void {
    this.airService.editAir(element);
    this.router.navigate(['homeAir/edit']);
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
