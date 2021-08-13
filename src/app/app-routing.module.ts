import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { MainComponent } from './modules/crud/main-crud/main-crud.component';
import { ListPavilionComponent } from './modules/crud/pavilion/list-pavilion/list-pavilion.component';
import { ListRoomComponent  } from './modules/crud/room/list-room/list-room.component';
import { FormUpdateCreatePavilionComponent } from './modules/crud/pavilion/form-update-create/form-update-create-pavilion.component';
import { FormUpdateCreateRoomComponent } from './modules/crud/room/form-update-create/form-update-create-room.component';
import { ListAirComponent } from './modules/crud/air-conditioning/list-air/list-air.component';
import { FormUpdateCreateAirComponent } from './modules/crud/air-conditioning/form-update-create-air/form-update-create-air.component';
import { ListScheduleComponent } from './modules/crud/schedule/list-schedule/list-schedule.component';
import { FormUpdateCreateScheduleComponent } from './modules/crud/schedule/form-update-create-schedule/form-update-create-schedule.component';
import { ListUserComponent } from './modules/crud/user/list-user/list-user.component';
import { FormUpdateCreateUserComponent } from './modules/crud/user/form-update-create-user/form-update-create-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  
  { path: 'home', component: HomeComponent },

  { path: 'homePavilion', component: MainComponent,
      children: [
        { path: 'list', component: ListPavilionComponent },
        { path: 'new', component: FormUpdateCreatePavilionComponent },
        { path: 'edit', component: FormUpdateCreatePavilionComponent },
      ]
  },
  { path: 'homeRoom', component: MainComponent, 
      children: [
        { path: 'list', component: ListRoomComponent },
        { path: 'new', component: FormUpdateCreateRoomComponent  },
        { path: 'edit', component: FormUpdateCreateRoomComponent },

      ]
  },
  { path: 'homeAir', component: MainComponent, 
      children: [
        { path: 'list', component: ListAirComponent },
        { path: 'new', component: FormUpdateCreateAirComponent  },
        { path: 'edit', component: FormUpdateCreateAirComponent },
      ]
  },
  { path: 'homeSchedule', component: MainComponent, 
      children: [
        { path: 'list', component: ListScheduleComponent },
        { path: 'new', component: FormUpdateCreateScheduleComponent },
        { path: 'edit', component: FormUpdateCreateScheduleComponent },
      ]
  },
  { path: 'homeUser', component: MainComponent, 
    children: [
    { path: 'list', component: ListUserComponent },
    { path: 'new', component: FormUpdateCreateUserComponent },
    { path: 'edit', component: FormUpdateCreateUserComponent },
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
