import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API_ARDUINO = environment.API_ARDUINO;

  public dataRoomEmitter = new EventEmitter();

  public readSensors(ip_device: string): Observable<any> {
    return this.http.get<any>(`${ip_device}?c=resSensores`);
  }

  public sendTurnOnShutdown(ip_device: string, command: string): Observable<any> {
    return this.http.get<any>(`${ip_device}?c=${command}`);
  }

  public sendTemprature(ip_device: string, temperature: number, cool: boolean, fan: boolean): Observable<any> {
    return this.http.get<any>(`${ip_device}?c=${temperature}&cool=${cool}&fan=${fan}`);
  }

  public selectedRoom(ip_device: string): void{
    
    this.readSensors(ip_device).subscribe((res) => {
      this.dataRoomEmitter.emit(res);

    });
  
  }

}
