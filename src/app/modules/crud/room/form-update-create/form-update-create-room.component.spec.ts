import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCreateRoomComponent } from './form-update-create-room.component';

describe('FormUpdateCreateComponent', () => {
  let component: FormUpdateCreateRoomComponent;
  let fixture: ComponentFixture<FormUpdateCreateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCreateRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
