import { TestBed } from '@angular/core/testing';

import { AirService } from './air.service';

describe('AirService', () => {
  let service: AirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
