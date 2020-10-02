import { TestBed } from '@angular/core/testing';

import { LikevideoService } from './likevideo.service';

describe('LikevideoService', () => {
  let service: LikevideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikevideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
