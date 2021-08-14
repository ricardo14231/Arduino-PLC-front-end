import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Output()
  public openedMenuEmmiter = new EventEmitter<boolean>();

  @Input()
  private openedMenu: boolean = false;

  ngOnInit(): void {
  }

  public btnMenu(): void{
    this.openedMenu = !this.openedMenu;
    this.openedMenuEmmiter.emit(this.openedMenu);
  }

}
