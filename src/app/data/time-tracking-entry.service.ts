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

      methods:{
        projectName: function(){
          return (this.project) ? this.project.projectName : '-';
        },
        taskDescription: function(){
          return (this.task) ? this.task.taskDescription : '-';
        },
        date: function(){
          var str = this.startDate;
          return str.substring(0,10);
        },
        startTime: function(){
          var str = this.startDate;
          return str.substring(11,19);
        },
        endTime: function(){
          var str = this.endDate;
          return str.substring(11,19);
        }
      },

      relations: {
        belongsTo: {
          user: {
            foreignKey: 'userID',
            localField: 'user'
          },
          project: {
            foreignKey: 'projectID',
            localField: 'project'
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

  public getTimeTrackingEntries(): Promise<ITimeTrackingEntry[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getTimeTrackingEntriesByUser(user: IUser): Promise<ITimeTrackingEntry[]> {
    let endpoint = '/' + ENDPOINT_NAME + '/' + user.id + '/entries';
    return store.findAll(RESOURCE_NAME, {}, {
      endpoint: endpoint
    });
  }

  public getTimeTrackingEntry(id: number): Promise<ITimeTrackingEntry> {
    return store.find(RESOURCE_NAME, id);
  }

  public deleteTimeTrackingEntry(id: number) {
    return store.destroy(RESOURCE_NAME, id,{
    });
  }

  public updateTimeTrackingEntry(id: number, description: string, projectName: string, taskDescription: string, startTime: string, endTime: string): Promise<ITimeTrackingEntry>  {
    // TODO
    return store.update(RESOURCE_NAME, id, {});
  }
}
