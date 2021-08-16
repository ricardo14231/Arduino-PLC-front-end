import { EventEmitter, Injectable } from '@angular/core';
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

  editPavilionEmitter = new EventEmitter<Pavilion>();

  listAllPavilion(): Observable<Pavilion[]> {
    return this.http.get<Pavilion[]>(`${this.API}listAllPavilion`);
  }

  listActivePavilion(): Observable<Pavilion[]> {
    return this.http.get<Pavilion[]>(`${this.API}listActivePavilion`);
  }

  createPavilion(pavilion: Pavilion): Observable<Pavilion> {
    return this.http.post<Pavilion>(`${this.API}createPavilion`, pavilion);
  }

  deletePavlion(idPavilion: number): Observable<any> {
    return this.http.delete<any>(`${this.API}deletePavilion/${idPavilion}`);
  }

  updatePavlion(pavilion: Pavilion): Observable<any> {
    return this.http.put<any>(`${this.API}updatePavilion`, pavilion);
  }

  editPavilion(pavilion: Pavilion): void {

    /*
      Atualizar os dados na tela sem o delay
    */
    setTimeout(() => {
      this.editPavilionEmitter.emit(pavilion);

    }, 200)
  }
}
