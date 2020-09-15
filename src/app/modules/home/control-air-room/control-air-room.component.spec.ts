import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAirRoomComponent } from './control-air-room.component';

describe('ControlAirRoomComponent', () => {
  let component: ControlAirRoomComponent;
  let fixture: ComponentFixture<ControlAirRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAirRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAirRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
