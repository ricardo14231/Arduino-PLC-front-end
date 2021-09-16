import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AirService } from 'src/app/core/services/air/air.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Air } from 'src/app/shared/models/air/listAir.model';
import { FieldsSelect } from 'src/app/shared/models/fieldSelect/fieldsSelect.model';
import { Pavilion } from 'src/app/shared/models/pavilion/pavilion.model';
import { RoomModel } from 'src/app/shared/models/room/RoomModel.model';

@Component({
  selector: 'app-form-update-create',
  templateUrl: './form-update-create-room.component.html',
  styleUrls: ['./form-update-create-room.component.css']
})
export class FormUpdateCreateRoomComponent implements OnInit {

  roomForm: FormGroup;

  @Input() public room: RoomModel;

  fieldsSelectPavilion: FieldsSelect[] = [];
  fieldsSelectAirUnallocated: FieldsSelect[] = [];
  @Input() public airs;

  private _idRoomEdit: number;
  private subscription: Subscription[] = [];

  constructor(
    private pavilionSevice: PavilionService,
    private airService: AirService,
    public roomService: RoomService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initObjRoom();
    this.createFormRoom(this.room);
    this.newRoomLoadPavilionAndAir();
    
    //this.editRoom();

    if(this.roomService.edit) {
      
      this.room = this.roomService.room;
      this._idRoomEdit = this.room.idRoom;
      this.roomForm.patchValue({
        fkIdPavilion: this.room.fkIdPavilion,
        fkIdAir: this.room.fkIdAir,
        fkIdNewAir: this.room.fkIdNewAir,
        nameRoom: this.room.nameRoom,
        namePavilion: this.room.namePavilion,
        nameAir: this.room.nameAir,
        activeRoom: this.room.activeRoom
      });
    }
   
  }

  createFormRoom(room: RoomModel) {
    this.roomForm = this.formBuilder.group({
      fkIdPavilion: [room.fkIdPavilion, [Validators.required]],
      fkIdAir: [room.fkIdAir],
      fkIdNewAir: [room.fkIdNewAir/* , [Validators.required, Validators.min(0)] */],
      nameRoom: [room.nameRoom,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      namePavilion: [room.namePavilion],
      nameAir: [room.nameAir],
      activeRoom: [room.activeRoom]
    });
  }

  onSave() {
    
    this.room = this.roomForm.getRawValue() as RoomModel;
     console.log(this.room)
     
    /* if (this._idRoomEdit !== null)
      this.room.idRoom = this._idRoomEdit;

    this.roomService.onSave(this.room);

    this.subscription.push(this.roomService.responseOnSave.subscribe(() => {
      this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
      this.router.navigate(['/homeRoom/list']);

    }, () => this.messageService.openSnackBar('Erro ao salvar a sala!', 'dangerMessage')
    ))  */
  }

  /* public onSubmit(form): void {

    this.validateUpdateRoom(form);

    if (!this.edit && this.room.idRoom == null) {
      this.subscription.push(
        this.roomService.createRoom(this.room).subscribe({
          next: () => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeRoom/list']);
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    } else {
      this.subscription.push(
        this.roomService.updateRoom(this.room).subscribe({
          next: () => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeRoom/list']);
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    }
  } */



  //Carrega os Selects do formulário
  public newRoomLoadPavilionAndAir(): void {
   
    this.pavilionSevice.listActivePavilion().subscribe({
      next: responsePavilion => this.valueFieldSelectPavilion(responsePavilion),
      error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
    });
  
    this.airService.listUnallocatedActiveAir().subscribe({
      next: responseAir => this.valueFieldSelectUnallocatedActiveAir(responseAir),
      error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
    });
  }
/* 
  public editRoom(): void {
    this.subscription.push(
      this.roomService.roomEmitter.subscribe((response: RoomModel) => {
       
        this.edit = true;
      })
    );
  } */

  private initObjRoom(): void {
    this.room = {
      idRoom: null,
      fkIdPavilion: null,
      fkIdAir: null,
      fkIdNewAir: null,
      nameRoom: null,
      namePavilion: null,
      nameAir: null,
      activeRoom: false
    };
  }

  private validateUpdateRoom(form): void {

    //Converte os dados de string para int e pega o valor do checkbox 
    this.room.activeRoom = form.form.value.active_room;
    this.room.fkIdPavilion = parseInt(form.form.value.fk_id_pavilion);
    this.room.fkIdNewAir = parseInt(form.form.value.fk_id_new_air);

    //Verifica se o ar-condicionado foi alterado. Se foi ele atribui o novo ar.
    if (this.room.fkIdNewAir != -1 && !isNaN(this.room.fkIdNewAir)) {
      this.room.fkIdNewAir = parseInt(form.form.value.fk_id_new_air);
    } else {
      this.room.fkIdNewAir = this.room.fkIdAir;
    }
  }

  cancelEditRoom() {
    this.roomService.edit = false;
    this.router.navigate(['/homeRoom/list']);
  }

  resetForm() {
    this.roomForm.reset();
  }

  private valueFieldSelectPavilion(pavilion: Pavilion[]): void {
    let field: FieldsSelect;
    pavilion.map(data => {
      field = {id: data.idPavilion, value: data.namePavilion}
      this.fieldsSelectPavilion.push(field)
    })
  }

  private valueFieldSelectUnallocatedActiveAir(air: Air[]): void {
    let field: FieldsSelect;
    air.map(data => {
      field = {id: data.idAir, value: data.nameAir}
      this.fieldsSelectAirUnallocated.push(field)
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  }
}
