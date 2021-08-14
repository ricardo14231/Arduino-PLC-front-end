import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AirService } from 'src/app/core/services/air/air.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { PavilionService } from 'src/app/core/services/pavilion/pavilion.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Air } from 'src/app/shared/models/air/listAir.model';
import { Pavilion } from 'src/app/shared/models/pavilion.model';
import { CrudRoom } from 'src/app/shared/models/room/crudRoom.model';

@Component({
  selector: 'app-form-update-create',
  templateUrl: './form-update-create-room.component.html',
  styleUrls: ['./form-update-create-room.component.css']
})
export class FormUpdateCreateRoomComponent implements OnInit {

  @Input()
  public room: CrudRoom;

  @Input()
  public pavilions: Pavilion[];
  @Input()
  public airs;

  public edit: boolean = false;
  private subscription: Subscription[] = [];

  constructor(
    private pavilionSevice: PavilionService,
    private airService: AirService,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initObjRoom();
    this.newRoomLoadPavilionAndAir();
    this.editRoom();
    this.initCheckedActiveRoom();

  }

  public onSubmit(form): void {

    this.validateUpdateRoom(form);

    if (!this.edit && this.room.id_room == null) {
      this.subscription.push(
        this.roomService.createRoom(this.room).subscribe({
          next: response => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeRoom/list']);
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    } else {
      this.subscription.push(
        this.roomService.updateRoom(this.room).subscribe({
          next: response => {
            this.messageService.openSnackBar('Sucesso na operação!', 'successMessage');
            this.router.navigate(['/homeRoom/list']);
          },
          error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
        })
      )
    }
  }

  //Carrega os Selects do formulário
  public newRoomLoadPavilionAndAir(): void {
    this.subscription.push(
      this.pavilionSevice.listActivePavilion().subscribe({
        next: responsePavilion => this.pavilions = responsePavilion,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );

    this.subscription.push(
      this.airService.listUnallocatedActiveAir().subscribe({
        next: responseAir => this.airs = responseAir,
        error: err => this.messageService.openSnackBar(err.error, 'dangerMessage')
      })
    );
  }

  public editRoom(): void {
    this.subscription.push(
      this.roomService.roomEmitter.subscribe((res: CrudRoom) => {
        this.room.id_room = res.id_room;
        this.room.name_room = res.name_room;
        this.room.name_air = res.name_air;
        this.room.fk_id_pavilion = res.fk_id_pavilion;
        this.room.fk_id_air = res.fk_id_air;
        this.room.active_room = res.active_room;

        this.edit = true;
      })
    );
  }

  private initObjRoom(): void {
    this.room = {
      id_room: null,
      fk_id_pavilion: null,
      fk_id_air: null,
      fk_id_new_air: null,
      name_room: null,
      name_pavilion: null,
      name_air: null,
      active_room: false
    };
  }

  private initCheckedActiveRoom(): void {
    if (!this.edit || this.room.active_room) {
      this.room.active_room = true;
    } else {
      this.room.active_room = false;
    }
  }

  private validateUpdateRoom(form): void {

    //Converte os dados de string para int e pega o valor do checkbox 
    this.room.active_room = form.form.value.active_room;
    this.room.fk_id_pavilion = parseInt(form.form.value.fk_id_pavilion);
    this.room.fk_id_new_air = parseInt(form.form.value.fk_id_new_air);

    //Verifica se o ar-condicionado foi alterado. Se foi ele atribui o novo ar.
    if (this.room.fk_id_new_air != -1 && !isNaN(this.room.fk_id_new_air)) {
      this.room.fk_id_new_air = parseInt(form.form.value.fk_id_new_air);
    } else {
      this.room.fk_id_new_air = this.room.fk_id_air;
    }
  }


  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe())
  }
}
