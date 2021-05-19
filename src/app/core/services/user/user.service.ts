import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;
  
  @Output()
  public editUserEmitter = new EventEmitter<User>();


  public listAllUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.API}listAllUser`);
  }

  public createUser(user): Observable<User>{
    return this.http.post<User>(`${this.API}createUser`, user);
  }

  public deleteUser(id_user): Observable<User>{
    return this.http.delete<User>(`${this.API}deleteUser/${id_user}`);
  }

  public updateUser(user): Observable<User>{
    return this.http.put<User>(`${this.API}updateUser`, user);
  }

  public editPavilion(user: User): void{
    
    /*
      Atualizar os dados na tela sem o delay
    */
    setTimeout(()=>{    
      this.editUserEmitter.emit(user); 

    }, 200)
  }

}
