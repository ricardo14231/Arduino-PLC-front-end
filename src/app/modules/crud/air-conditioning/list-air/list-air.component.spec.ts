import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirComponent } from './list-air.component';

describe('ListAirComponent', () => {
  let component: ListAirComponent;
  let fixture: ComponentFixture<ListAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
