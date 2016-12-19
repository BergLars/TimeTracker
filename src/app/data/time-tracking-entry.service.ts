import { Injectable } from '@angular/core';
import { TimeTrackingEntry } from '.';
import { environment } from '../../environments/environment';
import { IDataservice, Project } from '.';

@Injectable()
export class TimeTrackingEntryService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() { }

  public getEntries(): Promise<TimeTrackingEntry[]> {
    return Promise.resolve([
      new TimeTrackingEntry(1, 1, 1, new Date(), new Date()),
      new TimeTrackingEntry(2, 2, 1, new Date(), new Date()),
      new TimeTrackingEntry(3, 3, 1, new Date(), new Date()),
      new TimeTrackingEntry(4, 1, 2, new Date(), new Date())
    ]);
  }
}
