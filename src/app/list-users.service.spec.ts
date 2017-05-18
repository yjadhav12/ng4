import { TestBed, inject } from '@angular/core/testing';

import { ListUsersService } from './list-users.service';

describe('ListUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListUsersService]
    });
  });

  it('should ...', inject([ListUsersService], (service: ListUsersService) => {
    expect(service).toBeTruthy();
  }));
});
