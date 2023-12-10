import { TestBed } from '@angular/core/testing';

import { MensajeriaService } from './mensajeria.service';

describe('MensajeriaService', () => {
  let service: MensajeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
