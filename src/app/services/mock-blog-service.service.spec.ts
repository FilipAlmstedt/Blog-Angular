import { TestBed } from '@angular/core/testing';

import { MockBlogServiceService } from './mock-blog-service.service';

describe('MockBlogServiceService', () => {
  let service: MockBlogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBlogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
