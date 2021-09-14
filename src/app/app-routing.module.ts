import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  

  { path: 'home', loadChildren:() => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'homePavilion', loadChildren: () => import('./modules/crud/pavilion/pavilion-module.module').then(m => m.PavilionModule) },
  { path: 'homeRoom', loadChildren: () => import('./modules/crud/room/room-module.module').then(m => m.RoomModule) },
  { path: 'homeAir', loadChildren: () => import('./modules/crud/air-conditioning/air-module.module').then(m => m.AirModule) },
  { path: 'homeSchedule', loadChildren: () => import('./modules/crud/schedule/schedule-module.module').then(m => m.ScheduleModule) },
  { path: 'homeUser', loadChildren: () => import('./modules/crud/user/user-module.module').then(m => m.UserModule) },

  { path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
