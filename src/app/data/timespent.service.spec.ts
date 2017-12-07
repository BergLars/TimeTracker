import { TestBed, inject } from '@angular/core/testing';

import { TimespentService } from './timespent.service';

describe('TimespentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimespentService]
    });
  });

  it('should be created', inject([TimespentService], (service: TimespentService) => {
    expect(service).toBeTruthy();
  }));
});
