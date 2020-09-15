import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRoomsComponent } from './container-rooms.component';

describe('ContainerRoomsComponent', () => {
  let component: ContainerRoomsComponent;
  let fixture: ComponentFixture<ContainerRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
