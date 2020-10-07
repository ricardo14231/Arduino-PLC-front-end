import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialModule } from '../../../shared/materialModule/material.module';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snacBar: MatSnackBar
  ) { }


  public openSnackBar(msg: string, typeMsg: string): void{
    this.snacBar.open(
      msg,
      "X",
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: typeMsg
      })
  }
}
