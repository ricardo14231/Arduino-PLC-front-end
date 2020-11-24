import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Schedule } from 'src/app/shared/models/schedule.model';
import { MessageService } from '../message/message.service';


 
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
   
  public shiftSchedule: string = "notSelected";
  public scheduleEmitter = new EventEmitter<Schedule>();
  public cleanScheduleEmitter = new EventEmitter();

  private readonly API = environment.API_APP;

  private listSchedule(id_room: number, shift_schedule: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.API}listSchedule/${id_room}/${shift_schedule}`);
  }

  public selectedShift(shift): void{
    this.shiftSchedule = shift;
  }

  
  public showSchedule(id_room: number): void{
    
    if(this.shiftSchedule != "notSelected"){
      this.listSchedule(id_room, this.shiftSchedule).subscribe((res: Schedule) => {
        this.scheduleEmitter.emit(res);
      });
    }else{
      this.messageService.openSnackBar("Selecione o campo turno!", "alertMessage");
    }
  }

  public cleanSchedule(): void{
    this.cleanScheduleEmitter.emit([]);
  }

}
