import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCreatePavilionComponent } from './form-update-create-pavilion.component';

describe('FormUpdateCreatePavilionComponent', () => {
  let component: FormUpdateCreatePavilionComponent;
  let fixture: ComponentFixture<FormUpdateCreatePavilionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCreatePavilionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCreatePavilionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
