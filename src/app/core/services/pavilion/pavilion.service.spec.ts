import { TestBed } from '@angular/core/testing';

import { PavilionService } from './pavilion.service';

describe('PavilionService', () => {
  let service: PavilionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PavilionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
