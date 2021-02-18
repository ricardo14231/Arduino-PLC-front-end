import { TestBed } from '@angular/core/testing';

import { ModalLoadingService } from './modal-loading.service';

describe('ModalLoadingService', () => {
  let service: ModalLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
