import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, TimeTrackingEntry, User } from '.';

const RESOURCE_NAME: string = 'timeTrackingEntry';
const ENDPOINT_NAME: string = 'entries';

@Injectable()
export class TimeTrackingEntryService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() {
    // Define a Mapper for a "Project" resource
    let resource = store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,

      relations: {
        belongsTo: {
          person: {
            foreignKey: 'personID',
            localField: 'user'
          },
          task: {
            foreignKey: 'taskID',
            localField: 'task'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getTimeTrackingEntries(): Promise<TimeTrackingEntry[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getTimeTrackingEntriesByUser(user: User): Promise<TimeTrackingEntry[]> {
    let endpoint = 'persons/' + user.id + '/' + ENDPOINT_NAME;
    return store.findAll(RESOURCE_NAME, {}, {
      endpoint: endpoint
    });
  }

  public getTimeTrackingEntry(id: number): Promise<TimeTrackingEntry> {
    return store.find(RESOURCE_NAME, id);
  }


  public getEntries(): Promise<TimeTrackingEntry[]> {
    return Promise.resolve([
      new TimeTrackingEntry(1, 1, 1, new Date(), new Date()),
      new TimeTrackingEntry(2, 2, 1, new Date(), new Date()),
      new TimeTrackingEntry(3, 3, 1, new Date(), new Date()),
      new TimeTrackingEntry(4, 1, 2, new Date(), new Date())
    ]);
  }
}
