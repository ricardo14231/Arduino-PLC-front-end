import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, timeout } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageService } from '../message/message.service';
import { ModalLoadingService } from '../modal-loading/modal-loading.service';


@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private modalLoading: ModalLoadingService
  ) { }
    
  private readonly API_ARDUINO = environment.API_ARDUINO;

  public dataRoomEmitter = new EventEmitter();
  private timeoutHTTP: number = 5000;  
 
  public readSensors(ipDevice: string): Observable<any> {
    console.log(ipDevice)
    return this.http.get<any>(`${ipDevice}?c=resSensores`).pipe(
      timeout(this.timeoutHTTP),
      retry(1),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  public sendTurnOnShutdown(ipDevice: string, command: string): Observable<any> {    
    
    return this.http.get<any>(`${ipDevice}?c=${command}`).pipe(
      timeout(this.timeoutHTTP),
      retry(1),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  public sendTemprature(ipDevice: string, temperature: number, cool: boolean, fan: boolean): Observable<any> {
    return this.http.get<any>(`${ipDevice}?c=${temperature}&cool=${cool}&fan=${fan}`).pipe(
      timeout(this.timeoutHTTP),
      retry(1),
      catchError((error) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  public selectedRoom(ipDevice: string): void{
     
    //Abre o modal de loading
    //this.modalLoading.openDialogLoading();
    
    this.readSensors(ipDevice).subscribe((res) => {
      this.dataRoomEmitter.emit(res);

    });
  
  }

  private handleError(error) {

    //Fecha o modal de loading
   // this.modalLoading.dialog.closeAll();


    if (error.error instanceof ErrorEvent) {
        // client-side error
      this.messageService.openSnackBar(`Erro na aplicação: ${error.message}`, "dangerMessage");
    } else {
      // server-side error 
      this.messageService.openSnackBar(`Erro no servidor Arduino: ${error.message}`, "dangerMessage");

    }
  }

}
