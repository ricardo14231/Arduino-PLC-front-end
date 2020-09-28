import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { cardRoom } from 'src/app/shared/models/room/cardRoom.model';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class AirService {

  constructor(
    private http: HttpClient,
    private roomService: RoomService

  ) { }

  private readonly API = environment.API_APP;

  public selectedRoom(room: cardRoom): void{

  }

}
