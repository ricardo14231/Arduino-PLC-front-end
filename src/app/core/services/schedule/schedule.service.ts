import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Schedule } from 'src/app/shared/models/schedule/schedule.model';
import { MessageService } from '../message/message.service';
import { ScheduleCrud } from 'src/app/shared/models/schedule/scheduleCrud.model';


 
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
  public editScheduleEmitter = new EventEmitter<ScheduleCrud>();
  public cleanScheduleEmitter = new EventEmitter();

  private readonly API = environment.API_APP;

  private listSchedule(idRoom: number, shiftSchedule: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.API}listSchedule/${idRoom}/${shiftSchedule}`);
  }

  public createSchedule(schedule: Schedule): Observable<any> {
    return this.http.post<any>(`${this.API}createSchedule`, schedule);
  }

  public updateAllSchedule(schedule): Observable<any> {
    return this.http.put<any>(`${this.API}updateAllSchedule`, schedule);
  }

  public updateSchedule(schedule): Observable<any> {
    return this.http.put<any>(`${this.API}updateSchedule`, schedule);
  }

  public getIdScheduleRoom(idRoom: number, shiftSchedule: string): Observable<any> {
    return this.http.get<any>(`${this.API}getIdScheduleRoom/${idRoom}/${shiftSchedule}`);
  }

  public selectedShift(shift): void{
    this.shiftSchedule = shift;
  }

  public showSchedule(idRoom: number): void{
    
    if(this.shiftSchedule != "notSelected"){
      this.listSchedule(idRoom, this.shiftSchedule).subscribe((res: Schedule) => {
        this.scheduleEmitter.emit(res);
      });
    }else{
      this.messageService.openSnackBar("Selecione o campo turno!", "alertMessage");
    }
  }

  public cleanSchedule(): void{
    this.cleanScheduleEmitter.emit([]);
  }

  public editSchedule(schedule: ScheduleCrud): void{
    
    /*
      Atualizar os dados na tela sem o delay
    */
    setTimeout(()=>{    
      this.editScheduleEmitter.emit(schedule); 
    }, 200)
  }

}
