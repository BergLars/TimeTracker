import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, ITimeTrackingEntry, IUser, IProject, ITask } from '.';

const RESOURCE_NAME: string = 'entry';
const ENDPOINT_NAME: string = 'timeentries';

@Injectable()
export class TimeTrackingEntryService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() {
    // Define a Mapper for a "Project - User - Task" resource
    store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,
      relations: {
        belongsTo: {
          task: {
            localField: 'task',
            localKey: 'taskID'
          },
          user: {
            localField: 'user',
            foreignKey: 'userprofileID'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getTimeTrackingEntries(): Promise<ITimeTrackingEntry[]> {
    return store.findAll(RESOURCE_NAME, {}, { force: true });
  }


  // public getTimeTrackingEntriesByUser(): Promise<ITimeTrackingEntry[]> {
  //   let endpoint = '/' + ENDPOINT_NAME;
  // }
  public getTimeTrackingEntriesByUser(id: number): Promise<ITimeTrackingEntry[]> {
    let endpoint = '/' + ENDPOINT_NAME + '/user/' + id;
    return store.findAll(RESOURCE_NAME, {}, {
      endpoint: endpoint,
      force: true
    });

    // return store.getMapper(RESOURCE_NAME).findAll(
    //   {},
    //   { endpoint: endpoint });
  }

  public getTimeTrackingEntry(id: number): Promise<ITimeTrackingEntry> {
    return store.find(RESOURCE_NAME, id);
  }

  public deleteTimeTrackingEntry(id: number) {
    return store.destroy(RESOURCE_NAME, id, {
    });
  }

  public updateTimeTrackingEntry(id: number, entryDate: string, startTime: string, endTime: string, timeSpent: string, description: string, userprofileID: number, taskID: number): Promise<ITimeTrackingEntry> {
    return store.update(RESOURCE_NAME, id, { entryDate: entryDate, startTime: startTime, endTime: endTime, timeSpent: timeSpent, description: description, userprofileID: userprofileID, taskID: taskID });
  }

  public createTimeTrackingEntry(entryDate: string, startTime: string, endTime: string, timeSpent: string, description: string, userprofileID: number, taskID: number): Promise<ITimeTrackingEntry> {
    return store.create(RESOURCE_NAME, { entryDate: entryDate, startTime: startTime, endTime: endTime, timeSpent: timeSpent, description: description, userprofileID: userprofileID, taskID: taskID });
  }
}
