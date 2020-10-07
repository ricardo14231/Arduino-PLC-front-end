import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
}) 
export class ControlerService {
  
  constructor(
    private http: HttpClient,
    private roomService: RoomService
  ) {  }

  private readonly API = environment.API_APP;

  roomEmitter: EventEmitter<CardRoom> = new EventEmitter();

    /*
  public initObservableRoom(): void{
    console.log("FOI")
    this.roomService.cardRoomEmitter.subscribe(res => {
      this.roomEmitter.emit(res);
    console.log(res)

    });
  }
  */
}
