import { TestBed } from '@angular/core/testing';

import { CategoryTestService } from './category-test.service';

describe('CategoryTestService', () => {
  let service: CategoryTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
