import { TestBed } from '@angular/core/testing';

import { LikeHocLapTrinhService } from './like-hoc-lap-trinh.service';

describe('LikeHocLapTrinhService', () => {
  let service: LikeHocLapTrinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeHocLapTrinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
