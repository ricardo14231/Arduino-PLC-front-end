import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { RoomService } from '../room/room.service';
import { Air } from 'src/app/shared/models/air/air.model';

@Injectable({
  providedIn: 'root'
})
export class AirService {

  private readonly API = environment.API_APP;
  private _roomSelected: CardRoom

  @Output() responseOnSave = new Subject<any>();
  private _air: Air;
  private _isEdit: boolean;

  constructor(
    private http: HttpClient,
    private roomService: RoomService,
   
  ) { }

  public airEmitter: EventEmitter<Air> = new EventEmitter(); 

  listUnallocatedActiveAir(): Observable<Air[]> {
    return this.http.get<Air[]>(`${this.API}listUnallocatedActiveAir`);
  }

  listAllocatedAirByIdPavilion(id_pavilion: number): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listAllocatedAirByIdPavilion/${id_pavilion}`);
  }
  
  listAllAir(id_pavilion: number): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listAllAir`);
  }

  listNotActiveAir(): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listNotActiveAir`);
  }

  private createAir(air: Air): Observable<any>{
    return this.http.post<any>(`${this.API}createAir`, air);
  }

  private updateAir(air: Air): Observable<any>{
    return this.http.post<any>(`${this.API}updateAir`, air);
  }

  deleteAir(id_air: number): Observable<any>{
    return this.http.delete<any>(`${this.API}deleteAir/${id_air}`);
  }

  currentAirData(fk_id_air: number): Observable<any> {
    return this.http.get<any>(`${this.API}currentAirData/${fk_id_air}`);
  }

  onSave(air: Air): void {
    if(this._isEdit) {
      this.updateAir(air).subscribe({
        next: responseAir => {
          this.responseOnSave.next(responseAir);
          this._isEdit = false;
        },
        error: err => this.responseOnSave.error(err)
      })
    } else {
      this.createAir(air).subscribe({
        next: responseAir => {
          this.responseOnSave.next(responseAir);          
        },
        error: err => this.responseOnSave.error(err)
      })
    }
  } 

  get air(): Air {
    return this._air;
  }

  set air(value: Air) {
    this._isEdit = true;
    this._air = value;
  }

  get isEdit() {
    return this._isEdit;
  }

  public roomSelectedAir(): void {
    this.roomService.roomEmitter.subscribe((res: CardRoom) => {
      this._roomSelected = res;    
    })
  }
}
