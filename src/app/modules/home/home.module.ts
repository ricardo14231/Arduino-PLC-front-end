import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { MaterialModule } from '../../shared/materialModule/material.module';
import { HomeComponent } from './home.component';
import { FilterRoomComponent } from './filter-room/filter-room.component';
import { ContainerRoomsComponent } from './container-rooms/container-rooms.component';
import { RoomComponent } from './container-rooms/room/room.component';
import { ScheduleRoomComponent } from './schedule-room/schedule-room.component';
import { DataRoomComponent } from './data-room/data-room.component';
import { ControlAirRoomComponent } from './control-air-room/control-air-room.component';



const homeCompo = [
    HomeComponent,
    FilterRoomComponent,
    ContainerRoomsComponent,
    RoomComponent,
    ScheduleRoomComponent,
    DataRoomComponent,
    ControlAirRoomComponent,
    ScheduleRoomComponent
]

@NgModule({
  declarations: [ 
    homeCompo, 
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  exports: [
    homeCompo
  ]
})
export class HomeModule { }
