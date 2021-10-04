import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';


@Injectable({
  providedIn: 'root'
})
export class PavilionService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;
  private _pavilion: Pavilion;
  private _isEdit: boolean;
  @Output() responseOnSave = new Subject<any>();

  listAllPavilion(): Observable<Pavilion[]> {
    return this.http.get<Pavilion[]>(`${this.API}listAllPavilion`);
  }

  listActivePavilion(): Observable<Pavilion[]> {
    return this.http.get<Pavilion[]>(`${this.API}listActivePavilion`);
  }

  private createPavilion(pavilion: Pavilion): Observable<Pavilion> {
    return this.http.post<Pavilion>(`${this.API}createPavilion`, pavilion);
  }

  deletePavlion(idPavilion: number): Observable<any> {
    return this.http.delete<any>(`${this.API}deletePavilion/${idPavilion}`);
  }

  private updatePavlion(pavilion: Pavilion): Observable<any> {
    return this.http.put<any>(`${this.API}updatePavilion`, pavilion);
  }

  get pavilion(): Pavilion {
    return this._pavilion;
  }
  
  set pavilion(value: Pavilion) {
    this._isEdit = true;
    this._pavilion = value;
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  set isEdit(value: boolean) {
    this._isEdit = value;
  }

  onSave(pavilion: Pavilion): void {
    if(this._isEdit) {
      this.updatePavlion(pavilion).subscribe({
        next: responsePavilion => {
          this.responseOnSave.next(responsePavilion);
          this._isEdit = false;
        },
        error: err => this.responseOnSave.error(err)
      })
    } else {
      this.createPavilion(pavilion).subscribe({
        next: responsePavilion => {
          this.responseOnSave.next(responsePavilion);          
        },
        error: err => this.responseOnSave.error(err)
      })
    }
  } 

}
