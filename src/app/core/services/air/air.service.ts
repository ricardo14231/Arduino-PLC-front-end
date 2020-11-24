import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { RoomService } from '../room/room.service';
import { Air } from 'src/app/shared/models/air/listAir.model';

@Injectable({
  providedIn: 'root'
})
export class AirService {

  constructor(
    private http: HttpClient,
    private roomService: RoomService

  ) { }

  private readonly API = environment.API_APP;
  
  public airEmitter:EventEmitter<Air> = new EventEmitter(); 

  public listUnallocatedActiveAir(): Observable<Air[]> {
    return this.http.get<Air[]>(`${this.API}listUnallocatedActiveAir`);
  }

  public listAllocatedAirByIdPavilion(id_pavilion: number): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listAllocatedAirByIdPavilion/${id_pavilion}`);
  }
  
  public listAllAir(id_pavilion: number): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listAllAir`);
  }

  public listNotActiveAir(): Observable<Air[]>{
    return this.http.get<Air[]>(`${this.API}listNotActiveAir`);
  }

  public createAir(air: Air): Observable<any>{
    return this.http.post<any>(`${this.API}createAir`, air);
  }

  public updateAir(air: Air): Observable<any>{
    console.log(air)
    return this.http.post<any>(`${this.API}updateAir`, air);
  }

  public deleteAir(id_air: number): Observable<any>{
    return this.http.delete<any>(`${this.API}deleteAir/${id_air}`);
  }

  public selectedRoom(room: CardRoom): void{

  }

  public editAir(air: Air): void{

    //Verificar pq não está atualizando os dados da tela sem o delay
    setTimeout(()=>{ 
      this.airEmitter.emit(air);
    }, 200)
  }

}
