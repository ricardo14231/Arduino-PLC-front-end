import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCreateAirComponent } from './form-update-create-air.component';

describe('FormUpdateCreateComponent', () => {
  let component: FormUpdateCreateAirComponent;
  let fixture: ComponentFixture<FormUpdateCreateAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCreateAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCreateAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
