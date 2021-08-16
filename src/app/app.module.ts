import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { CrudModule } from './modules/crud/crud.module';

import { DialogDeleteItemComponent } from './modules/crud/dialog-delete-item/dialog-delete-item.component';
import { DialogLoadingComponent } from './core/dialog-loading/dialog-loading.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,

    CoreModule,
    HomeModule,
    CrudModule
  ],
  entryComponents: [
    DialogDeleteItemComponent,
    DialogLoadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
