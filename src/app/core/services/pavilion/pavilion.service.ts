import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Pavilion } from 'src/app/shared/models/pavilion.model';

@Injectable({
  providedIn: 'root'
})
export class PavilionService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;
  
  @Output()
  public editPavilionEmitter = new EventEmitter<Pavilion>();


  public listAllPavilion(): Observable<Pavilion[]>{
    return this.http.get<Pavilion[]>(`${this.API}listAllPavilion`);
  }

  public listActivePavilion(): Observable<Pavilion[]>{
    return this.http.get<Pavilion[]>(`${this.API}listActivePavilion`);
  }

  public createPavilion(pavilion): Observable<Pavilion>{
    return this.http.post<Pavilion>(`${this.API}createPavilion`, pavilion);
  }

  public deletePavlion(id_pavilion): Observable<Pavilion>{
    return this.http.delete<Pavilion>(`${this.API}deletePavilion/${id_pavilion}`);
  }

  public updatePavlion(pavilion): Observable<Pavilion>{
    return this.http.put<Pavilion>(`${this.API}updatePavilion`, pavilion);
  }

  public editPavilion(pavilion: Pavilion): void{
    
    /*
      Verificar pq não está atualizando os dados da tela sem o delay
    */
    setTimeout(()=>{    
      this.editPavilionEmitter.emit(pavilion); 

    }, 200)
  }

}
