import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCreateScheduleComponent } from './form-update-create-schedule.component';

describe('FormUpdateCreateScheduleComponent', () => {
  let component: FormUpdateCreateScheduleComponent;
  let fixture: ComponentFixture<FormUpdateCreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCreateScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
