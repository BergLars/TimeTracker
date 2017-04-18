import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, ITask } from '.';

const RESOURCE_NAME: string = 'task';
const ENDPOINT_NAME: string = 'tasks';

@Injectable()
export class TaskService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() {
    // Define a Mapper for a "Task" resource
    store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,

      relations : {
        hasMany: {
          entry: {
            foreignKey: 'taskID',
            localField: 'entries'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getTasks(): Promise<ITask[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getTask(id: number): Promise<ITask> {
    return store.find(RESOURCE_NAME, id);
  }
}
