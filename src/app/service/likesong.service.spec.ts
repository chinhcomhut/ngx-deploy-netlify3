import { TestBed } from '@angular/core/testing';

import { LikesongService } from './likesong.service';

describe('LikesongService', () => {
  let service: LikesongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikesongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
