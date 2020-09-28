import { TestBed } from '@angular/core/testing';

import { ControlerService } from './controler.service';

describe('ControlerService', () => {
  let service: ControlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
