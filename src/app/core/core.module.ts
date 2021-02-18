import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/materialModule/material.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';


const coreComponent = [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DialogLoadingComponent
]

@NgModule({
  declarations: [ 
    coreComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    coreComponent
  ]
})
export class CoreModule { }
