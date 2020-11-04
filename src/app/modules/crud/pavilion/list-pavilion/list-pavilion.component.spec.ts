import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPavilionComponent } from './list-pavilion.component';

describe('ListPavilionComponent', () => {
  let component: ListPavilionComponent;
  let fixture: ComponentFixture<ListPavilionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPavilionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPavilionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
