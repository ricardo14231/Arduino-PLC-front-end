import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, timeout, throwIfEmpty } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
    
  private readonly API_ARDUINO = environment.API_ARDUINO;

  public dataRoomEmitter = new EventEmitter();
  private timeoutHTTP: number = 5000;  


  public readSensors(ip_device: string): Observable<any> {
    return this.http.get<any>(`${ip_device}?c=resSensores`).pipe(
      timeout(this.timeoutHTTP),
      retry(1),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  public sendTurnOnShutdown(ip_device: string, command: string): Observable<any> {    
    
    return this.http.get<any>(`${ip_device}?c=${command}`).pipe(
      timeout(this.timeoutHTTP),
      retry(1),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  public sendTemprature(ip_device: string, temperature: number, cool: boolean, fan: boolean): Observable<any> {
    return this.http.get<any>(`${ip_device}?c=${temperature}&cool=${cool}&fan=${fan}`);
  }

  public selectedRoom(ip_device: string): void{
    
    this.readSensors(ip_device).subscribe((res) => {
      this.dataRoomEmitter.emit(res);

    });
  
  }

  private handleError(error) {
    if (error.error instanceof ErrorEvent) {
        // client-side error
      this.messageService.openSnackBar(`Erro na aplicação: ${error.message}`, "dangerMessage");
    } else {
      // server-side error 
      this.messageService.openSnackBar(`Erro no servidor Arduino: ${error.message}`, "dangerMessage");
    }
  }
}
