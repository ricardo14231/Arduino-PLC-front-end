import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCreateUserComponent } from './form-update-create-user.component';

describe('FormUpdateCreateUserComponent', () => {
  let component: FormUpdateCreateUserComponent;
  let fixture: ComponentFixture<FormUpdateCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
