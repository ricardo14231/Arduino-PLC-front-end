import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'; //Ver isso - se precisa importar mesmo
import { MatTableDataSource } from '@angular/material/table';

import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { CrudRoom } from 'src/app/shared/models/room/crudRoom.model';


@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private pavilionService: PavilionService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name_room', 'air', 'active', 'actions'];
  
  dataSource: MatTableDataSource<CrudRoom>;
  pavilions: Pavilion[];  
  private subscription: Subscription[] = [];

  rooms: CrudRoom[] = [];
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.subscription.push( 
      this.pavilionService.listActivePavilion().subscribe((res: Pavilion[]) =>{
      this.pavilions = res;
      })
    );
  }

  public editRoom(element): void{
    this.roomService.editRoom(element);
    this.router.navigate(['homeRoom/edit']);
  }

  public openDialogDelete(element): void{
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.deleteRoom(element.id_room);
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteRoom(id_room: number): void{

    this.roomService.deleteRoom(id_room).subscribe( res => {   
      this.rooms = this.removeElementArrayRooms(id_room);
      this.dataSource = new MatTableDataSource<CrudRoom>(this.rooms);
    
    }); 
  }

  public selectedPavilion(event): void{
    this.subscription.push( 
      this.roomService.readCrudRoomByIdPavilion(event.value).subscribe((res) => {
      this.dataSource = new MatTableDataSource<CrudRoom>(res);
      this.dataSource.paginator = this.paginator;
      
      this.rooms = res;

      })
    );
  }

  private removeElementArrayRooms(id_room: number): any{
    let newArrayRooms: CrudRoom[] = [];
    
    this.rooms.map((r) => {
      if(r.id_room != id_room){
        newArrayRooms.push(r);
      }
    });

    return newArrayRooms;
  } 

  ngOnDestroy(){
    this.subscription.map(sub => {
      sub.unsubscribe();
    });
  }

}

