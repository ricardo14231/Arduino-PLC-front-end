import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-pavilion',
  templateUrl: './list-pavilion.component.html',
  styleUrls: ['./list-pavilion.component.css']
})
export class ListPavilionComponent implements OnInit {

  private subscription: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'amount_room', 'active', 'actions'];
  dataSource: MatTableDataSource<Pavilion>;


  constructor(
    private pavilionService: PavilionService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.listAllPavilion();
  }

  private listAllPavilion() {
    this.subscription.push(
      this.pavilionService.listAllPavilion().subscribe({
        next: responsePavilion => {
          this.dataSource = new MatTableDataSource<Pavilion>(responsePavilion);
          this.dataSource.paginator = this.paginator;
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  public openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deletePavilion(element.id_pavilion);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deletePavilion(id_pavilion: number): void {
    this.subscription.push(
      this.pavilionService.deletePavlion(id_pavilion).subscribe({
        next: response => this.listAllPavilion(),
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  public editPavilion(element): void {
    this.pavilionService.editPavilion(element);
    this.router.navigate(['homePavilion/edit']);
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }

}
