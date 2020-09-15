import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRoomComponent } from './schedule-room.component';

describe('ScheduleRoomComponent', () => {
  let component: ScheduleRoomComponent;
  let fixture: ComponentFixture<ScheduleRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
