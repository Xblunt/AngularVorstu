import { TestBed } from '@angular/core/testing';

import { IbaseServiceService } from './ibase-service.service';

describe('IbaseServiceService', () => {
  let service: IbaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
