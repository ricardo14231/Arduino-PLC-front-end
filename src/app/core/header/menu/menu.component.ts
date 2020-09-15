import { Component, OnInit, Input } from '@angular/core';
import {  } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  @Input()
  opened: boolean = false;

  ngOnInit(): void {
    
  }

  menu(){
    if(this.opened)
    return this.opened= false;
    else
    return this.opened= true;
console.log(1)
  }

}
