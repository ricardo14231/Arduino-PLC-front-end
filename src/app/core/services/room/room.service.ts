import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cardRoom } from 'src/app/shared/models/room/cardRoom.model';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }
  
  private readonly API = environment.API_APP;

  roomsEmitter: EventEmitter<cardRoom[]> = new EventEmitter();
  cardRoomEmitter: EventEmitter<cardRoom> = new EventEmitter();


  public readRoomByIdPavilion(id_pavilion: number): Observable<cardRoom[]>{
    return this.http.get<cardRoom[]>(`${this.API}readRoomByIdPavilion/${id_pavilion}`)
  }

  public selectedPavilion(id_pavilion: number){
    this.readRoomByIdPavilion(id_pavilion).subscribe(res => {   
      this.roomsEmitter.emit(res);
    });
  }

  public selectedRoom(room): void{
    this.cardRoomEmitter.emit(room);
  }

    
}
