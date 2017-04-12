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
    let resource = store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,

      relations: {
        belongsTo: {
          project: {
            foreignKey: 'projectID',
            localField: 'project'
          },
          task: {
            foreignKey: 'taskID',
            localField: 'task'
          }
        }
      },

      methods: {
        taskDescription: function() {
          return (this.task) ? this.task.taskDescription : '-';
        },
        projectName: function () {
          return this.project ? this.project.projectName : '-';
        }
      },
      //   timeSpent: function() {
      //     var timeSpent: string;
      //     var timeSpentH: number;
      //     var timeSpentMin: number;
      //     var startTimeH: number = parseInt(this.startDate.substring(11, 13));
      //     var startTimeMin: number = parseInt(this.startDate.substring(14, 16));
      //     var endTimeH: number = parseInt(this.endDate.substring(11, 13));
      //     var endTimeMin: number = parseInt(this.endDate.substring(14, 16));
      //     if (endTimeMin >= startTimeMin) {
      //       timeSpentMin = endTimeMin - startTimeMin;
      //       timeSpentH = endTimeH - startTimeH;
      //     } else {
      //       timeSpentMin = endTimeMin - startTimeMin + 60;
      //       timeSpentH = endTimeH - startTimeH - 1;
      //     }
      //     if (timeSpentMin < 10)  {
      //       timeSpent = timeSpentH + ":0" + timeSpentMin;
      //     } else {
      //       timeSpent = timeSpentH + ":" + timeSpentMin;
      //     }
      //     return timeSpent;
      //   }
      // }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getTimeTrackingEntries(): Promise<ITimeTrackingEntry[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getTimeTrackingEntriesByUser(id: number): Promise<ITimeTrackingEntry[]> {
    let endpoint = '/' + ENDPOINT_NAME + '/' + id + '/entries';
    return store.findAll(RESOURCE_NAME, {}, {
      endpoint: endpoint,
      cacheResponse: false,
      bypassCache: true
    });
  }

  public getTimeTrackingEntry(id: number): Promise<ITimeTrackingEntry> {
    return store.find(RESOURCE_NAME, id);
  }

  public deleteTimeTrackingEntry(id: number) {
    return store.destroy(RESOURCE_NAME, id, {
    });
  }

  public updateTimeTrackingEntry(id: number, entryDate: string, startTime: string, endTime: string, timeSpent: string, description: string, userprofileID: number, projectID: number, taskID: number): Promise<ITimeTrackingEntry> {
    return store.update(RESOURCE_NAME, id, { entryDate: entryDate, startTime: startTime, endTime: endTime, timeSpent: timeSpent, description: description, userprofileID: userprofileID, projectID: projectID, taskID: taskID });
  }

  public createTimeTrackingEntry(entryDate: string, startTime: string, endTime: string, timeSpent: string, description: string, userprofileID: number, projectID: number, taskID: number): Promise<ITimeTrackingEntry> {
    return store.create(RESOURCE_NAME, { entryDate: entryDate, startTime: startTime, endTime: endTime, timeSpent: timeSpent, description: description, userprofileID: userprofileID, projectID: projectID, taskID: taskID });
  }
}
