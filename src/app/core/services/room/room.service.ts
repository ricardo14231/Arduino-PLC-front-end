import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { RoomModel } from 'src/app/shared/models/room/RoomModel.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
  ) { }
  
  private readonly API = environment.API_APP;

  private _room: RoomModel;
  private _edit: boolean = false;
  @Output() responseOnSave = new Subject<any>();

  roomsEmitter: EventEmitter<CardRoom[]> = new EventEmitter();
  roomEmitter: EventEmitter<RoomModel> = new EventEmitter();
  cardRoomEmitter: EventEmitter<CardRoom> = new EventEmitter();

  public readRoomByIdPavilion(idPavilion: number): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}readRoomByIdPavilion/${idPavilion}`)
  }

  public readCrudRoomByIdPavilion(idPavilion: number): Observable<RoomModel[]>{
    return this.http.get<RoomModel[]>(`${this.API}readCrudRoomByIdPavilion/${idPavilion}`)
  }

  public listAllRoom(): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}listAllRoom`);
  }

  public listActiveRoom(): Observable<CardRoom[]>{
    return this.http.get<CardRoom[]>(`${this.API}listActiveRoom`);
  }

  public createRoom(room: RoomModel): Observable<any> {
    return this.http.post<any>(`${this.API}createRoom`, room);
  }

  public updateRoom(room: RoomModel): Observable<any> {
    return this.http.put<any>(`${this.API}updateRoom`, room);
  }

  public deleteRoom(idRoom: number): Observable<any> {
    return this.http.delete<any>(`${this.API}deleteRoom/${idRoom}`);
  }

  public selectedPavilion(idPavilion: number){

    if(idPavilion != -1){
      this.readRoomByIdPavilion(idPavilion).subscribe(res => {   
        this.roomsEmitter.emit(res);
        
      }), error => { error.error };
    }else{
      this.cleanRooms();
    }
    
  }

  onSave(room: RoomModel) {
    if(this._edit) {
      this.updateRoom(room).subscribe({ 
        next: responseRoom => {
          this.responseOnSave.next(responseRoom);
          this._edit = false;
        }, error: err => this.responseOnSave.error(err)
      })
    } else {
      this.createRoom(room).subscribe({
        next: responseRoom => this.responseOnSave.next(responseRoom),
        error: err => this.responseOnSave.error(err)
      })
    }
  }

  public selectedRoom(room): void{
    this.cardRoomEmitter.emit(room);
  }

  public cleanRooms(): void{
    this.roomsEmitter.emit();
  }

  public editRoom(room: RoomModel): void{
    
    //Verificar pq não está atualizando os dados da tela sem o delay
    setTimeout(()=>{ 
      this.roomEmitter.emit(room);
    }, 200)
  }


  get room(): RoomModel {
    return this._room;
  }

  set room(value: RoomModel) {
    this._edit = true;
    this._room = value;
  }

  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }
}
