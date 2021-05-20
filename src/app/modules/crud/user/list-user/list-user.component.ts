import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteItemComponent } from '../../dialog-delete-item/dialog-delete-item.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/User/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'login', 'profile', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;
  private subscription: Subscription[] = [];
 
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
  ) { }



  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.listAllUsers();
  }

  private listAllUsers(){
    this.subscription.push(
      this.userService.listAllUser().subscribe((res: User[]) => {
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  public openDialogDelete(element): void{
    let dialogRef = this.dialog.open(DialogDeleteItemComponent, {
      height: '20%',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.deleteUser(element.id_user); 
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      }
    });

  }

  private deleteUser(id_user: number): void{
    this.userService.deleteUser(id_user).subscribe(res => {
      this.listAllUsers();
    }); 
  }

  public editUser(element): void{
    this.userService.editUser(element);
      this.router.navigate(['homeUser/edit']); 
  }

  ngOnDestroy(){
    this.subscription.map(sub => {
      sub.unsubscribe();
    });
  }

}
