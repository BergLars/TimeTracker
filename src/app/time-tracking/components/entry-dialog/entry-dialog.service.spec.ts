/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntryDialogServiceService } from './entry-dialog-service.service';

describe('EntryDialogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryDialogServiceService]
    });
  });

  it('should ...', inject([EntryDialogServiceService], (service: EntryDialogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
