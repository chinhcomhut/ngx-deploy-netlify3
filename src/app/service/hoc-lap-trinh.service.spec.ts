import { TestBed } from '@angular/core/testing';

import { HocLapTrinhService } from './hoc-lap-trinh.service';

describe('HocLapTrinhService', () => {
  let service: HocLapTrinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HocLapTrinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
