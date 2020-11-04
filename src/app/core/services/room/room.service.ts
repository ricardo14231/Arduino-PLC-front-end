import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { CrudRoom } from 'src/app/shared/models/room/crudRoom.model';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
  ) { }
  
  private readonly API = environment.API_APP;

  roomsEmitter: EventEmitter<CardRoom[]> = new EventEmitter();
  roomEmitter: EventEmitter<CrudRoom> = new EventEmitter();
  cardRoomEmitter: EventEmitter<CardRoom> = new EventEmitter();


  public readRoomByIdPavilion(id_pavilion: number): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}readRoomByIdPavilion/${id_pavilion}`)
  }

  public readCrudRoomByIdPavilion(id_pavilion: number): Observable<CrudRoom[]>{
    return this.http.get<CrudRoom[]>(`${this.API}readCrudRoomByIdPavilion/${id_pavilion}`)
  }

  public listAllRoom(): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}listAllRoom`);
  }

  public listActiveRoom(): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}/listActiveRoom`);
  }

  public createRoom(room: CrudRoom): Observable<any> {
    return this.http.post<any>(`${this.API}createRoom`, room);
  }

  public updateRoom(room: CrudRoom): Observable<any> {
    return this.http.put<any>(`${this.API}updateRoom`, room);
  }

  public deleteRoom(id_room: number): Observable<any> {
    return this.http.delete<any>(`${this.API}deleteRoom/${id_room}`);
  }

  public selectedPavilion(id_pavilion: number){

    if(id_pavilion != -1){
      this.readRoomByIdPavilion(id_pavilion).subscribe(res => {   
        this.roomsEmitter.emit(res);
        
      }), error => { error.error };
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

  public editRoom(room: CrudRoom): void{
    
    //Verificar pq não está atualizando os dados da tela sem o delay
    setTimeout(()=>{ 
      this.roomEmitter.emit(room);
    }, 200)
  }

}
