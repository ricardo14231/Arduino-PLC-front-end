import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
  ) { }
  
  private readonly API = environment.API_APP;

  roomsEmitter: EventEmitter<CardRoom[]> = new EventEmitter();
  cardRoomEmitter: EventEmitter<CardRoom> = new EventEmitter();


  public readRoomByIdPavilion(id_pavilion: number): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}readRoomByIdPavilion/${id_pavilion}`)
  }

  public selectedPavilion(id_pavilion: number){

    if(id_pavilion != -1){
      this.readRoomByIdPavilion(id_pavilion).subscribe(res => {   
        this.roomsEmitter.emit(res);
      });
    }else{
      this.cleanRooms();
    }
    
  }

  public selectedRoom(room): void{
    this.cardRoomEmitter.emit(room);
  }

  public cleanRooms(): void{
    this.roomsEmitter.emit();
  }

}
