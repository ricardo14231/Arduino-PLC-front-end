import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-arduino-plc';
  

  teste() {
    console.log("dcdc");
    console.log("asdfsd");
  }
}
