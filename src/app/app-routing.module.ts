import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { MainComponent } from './modules/crud/main-crud/main-crud.component';
import { ListPavilionComponent } from './modules/crud/pavilion/list-pavilion/list-pavilion.component';
import { ListRoomComponent  } from './modules/crud/room/list-room/list-room.component';
import { FormUpdateCreatePavilionComponent } from './modules/crud/pavilion/form-update-create/form-update-create-pavilion.component';
import { FormUpdateCreateRoomComponent } from './modules/crud/room/form-update-create/form-update-create-room.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},  
  
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
