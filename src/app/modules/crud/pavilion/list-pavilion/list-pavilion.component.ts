import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';


@Component({
  selector: 'app-list-pavilion',
  templateUrl: './list-pavilion.component.html',
  styleUrls: ['./list-pavilion.component.css']
})
export class ListPavilionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'amountRoom', 'active', 'actions'];
  dataSource: MatTableDataSource<Pavilion>;

  constructor(
    private pavilionService: PavilionService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listAllPavilion();
  }

  openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deletePavilion(element.idPavilion);
      }
    });
  }

  editPavilion(element): void {
    this.pavilionService.pavilion = element;
    this.router.navigate(['homePavilion/edit']);
  }

  private deletePavilion(idPavilion: number): void {

    this.pavilionService.deletePavlion(idPavilion).subscribe({
      next: () => {
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
        this.listAllPavilion();
      },
      error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
    })
  }

  private listAllPavilion() {

    this.pavilionService.listAllPavilion().subscribe({
      next: responsePavilion => {
        this.dataSource = new MatTableDataSource<Pavilion>(responsePavilion);
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.messageService.openSnackBar("Erro ao listar pavilhões!", 'dangerMessage')
    })
  }
}
