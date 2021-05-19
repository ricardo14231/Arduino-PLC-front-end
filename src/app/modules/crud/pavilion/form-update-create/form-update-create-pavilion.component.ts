import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { Pavilion } from 'src/app/shared/models/pavilion.model';

@Component({
  selector: 'app-form-update-create-pavilion',
  templateUrl: './form-update-create-pavilion.component.html',
  styleUrls: ['./form-update-create-pavilion.component.css']
})
export class FormUpdateCreatePavilionComponent implements OnInit {

  constructor(
    private pavilionService: PavilionService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  @Input()
  public pavilion: Pavilion;
  
  public edit: boolean = false; 
  
  private subscription: Subscription[] = [];

  ngOnInit(): void {
    this.initObjPavilion();
    this.editPavilion();
  }

  public onSubmit(): void{
    
    if(!this.edit && this.pavilion.id_pavilion == null){
      this.subscription.push( this.pavilionService.createPavilion(this.pavilion).subscribe((res => {
          this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
          this.router.navigate(['/homePavilion/list']);
  
        }), error => this.messageService.openSnackBar(error.error, 'dangerMessage')));
  
    }else{
      this.subscription.push( this.pavilionService.updatePavlion(this.pavilion).subscribe((res => {
        this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
        this.router.navigate(['/homePavilion/list']);
      
      }), error => this.messageService.openSnackBar(error.error, 'dangerMessage')));
    }
  }

  public editPavilion(): void{

    this.subscription.push( this.pavilionService.editPavilionEmitter.subscribe((res: Pavilion) => {
      this.pavilion = res;
      this.edit = true;
      this.router.navigate(['/homePavilion/edit']);
    }));

  }

  private initObjPavilion(): void{
    this.pavilion = {
      id_pavilion: null,
      name_pavilion: "",
      amount_room_pavilion: null,
      active_pavilion: false
    };
  }
  

  ngOnDestroy(): void{
    this.subscription.map( sub => {
      sub.unsubscribe();
    });
  }

}
