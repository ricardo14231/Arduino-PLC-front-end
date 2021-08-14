import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/User/user.model';


@Component({
  selector: 'app-form-update-create-user',
  templateUrl: './form-update-create-user.component.html',
  styleUrls: ['./form-update-create-user.component.css']
})
export class FormUpdateCreateUserComponent implements OnInit {

  edit: boolean = false;
  user: User;
  password: string;
  confirmPassword: string;

  private subscription: Subscription[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initObjUser();
    this.editUser();
  }

  public onSubmit(): void {

    if (this.checkPassword()) {
      this.user.password = this.password;

      if (!this.edit && this.user.id_user == null) {
        this.createUser();
      } else {
        this.updateUser();
      }
    } else {
      this.messageService.openSnackBar('A senha não confere!', 'dangerMessage');
    }

  }

  private updateUser(): void {
    this.subscription.push(
      this.userService.updateUser(this.user).subscribe({
        next: response => {
          this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
          this.router.navigate(['/homeUser/list']);
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  private createUser(): void {
    this.subscription.push(
      this.userService.createUser(this.user).subscribe({
        next: response => {
          this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
          this.router.navigate(['/homeUser/list']);
        },
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    )
  }

  private checkPassword(): boolean {
    let result = this.password !== this.confirmPassword ? false : true;
    return result;
  }

  public editUser(): void {
    this.subscription.push(
      this.userService.editUserEmitter.subscribe((res: User) => {
        this.user = res;
        this.edit = true;
        this.router.navigate(['/homeUser/edit']);
      }));
  }

  private initObjUser(): void {
    this.user = {
      id_user: null,
      name_user: null,
      login: null,
      password: null,
      profile: null,
      active_user: false
    };
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
