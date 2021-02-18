import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogLoadingComponent } from '../../../core/dialog-loading/dialog-loading.component';

@Injectable({
  providedIn: 'root'
})
export class ModalLoadingService {

  constructor(
    public dialog: MatDialog,
  ) { }



  
  public openDialogLoading(): void{
    this.dialog.open(DialogLoadingComponent, {
      disableClose: true
    });
  }

}
