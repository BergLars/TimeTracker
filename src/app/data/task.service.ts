import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, Task } from '.';

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

      relations: {
        belongsTo: {
          project: {
            foreignKey: 'projectID',
            localField: 'project'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getTasks(): Promise<Task[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getTask(id: number): Promise<Task> {
    return store.find(RESOURCE_NAME, id);
  }
}
