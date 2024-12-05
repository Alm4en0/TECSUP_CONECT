import { TestBed } from '@angular/core/testing';

import { UserProfileSService } from './user-profile-s.service';

describe('UserProfileSService', () => {
  let service: UserProfileSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
