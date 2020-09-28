import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Pavilion } from 'src/app/shared/models/pavilion.model';

@Injectable({
  providedIn: 'root'
})
export class PavilionService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;


  public listPavilion(): Observable<Pavilion[]>{
    return this.http.get<Pavilion[]>(`${this.API}listPavilion`);
  }

}
