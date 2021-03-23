import { TestBed } from '@angular/core/testing';

import { CovidUserApiService } from './covid-user-api.service';

describe('CovidUserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidUserApiService = TestBed.get(CovidUserApiService);
    expect(service).toBeTruthy();
  });
});
