import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { RoomModel } from 'src/app/shared/models/room/RoomModel.model';


@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'nameRoom', 'air', 'active', 'actions'];

  dataSource: MatTableDataSource<RoomModel>;
  pavilions: Pavilion[];
  private subscription: Subscription[] = [];

  rooms: RoomModel[] = [];

  constructor(
    private roomService: RoomService,
    private pavilionService: PavilionService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { } 

  ngOnInit(): void {
    this.subscription.push(
      this.pavilionService.listActivePavilion().subscribe({
        next: responsePavilion => this.pavilions = responsePavilion,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  public editRoom(element: RoomModel): void {
    this.roomService.room = element;
    this.router.navigate(['homeRoom/edit']);
  }

  public openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteRoom(element.idRoom);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteRoom(idRoom: number): void {
    this.subscription.push(
      this.roomService.deleteRoom(idRoom).subscribe({
        next: () => {
          this.rooms = this.removeElementArrayRooms(idRoom);
          this.dataSource = new MatTableDataSource<RoomModel>(this.rooms)
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  public selectedPavilion(event): void {
    console.log(event.value)

    this.subscription.push(
      this.roomService.readCrudRoomByIdPavilion(event.value).subscribe({
        next: responsePavilion => {
          this.dataSource = new MatTableDataSource<RoomModel>(responsePavilion);
          this.dataSource.paginator = this.paginator;

          this.rooms = responsePavilion;
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  private removeElementArrayRooms(idRoom: number): any {
    let newArrayRooms: RoomModel[] = [];

    this.rooms.map((r) => {
      if (r.idRoom != idRoom) {
        newArrayRooms.push(r);
      }
    });

    return newArrayRooms;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe())
  }

}
