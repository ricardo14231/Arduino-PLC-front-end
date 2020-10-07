import { Component, OnInit, Output } from '@angular/core';
import {  } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  openedMenu: boolean = false;

  @Output()
  closedStart: Observable<void>

  ngOnInit(): void {
  }

  public openMenu(event): void{
    this.openedMenu = event;
  }

  close(){
    console.log(this.openedMenu)

  }

}
