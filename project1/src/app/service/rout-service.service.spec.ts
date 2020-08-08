import { TestBed } from '@angular/core/testing';

import { RoutServiceService } from './rout-service.service';

describe('RoutServiceService', () => {
  let service: RoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
