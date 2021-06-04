import { TestBed } from '@angular/core/testing';

import { MockBlogService } from './mock-blog.service';

describe('MockBlogService', () => {
  let service: MockBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
