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

      relations: {
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

  // public getTaskByDescription(description: string): Promise<ITask> {
  //   let endpoint = '/' + ENDPOINT_NAME + '/description';
  //   return store.find(RESOURCE_NAME, description, {
  //     endpoint: endpoint,
  //     cacheResponse: false,
  //     bypassCache: true
  //   });
  // }

  public createTask(description: string, projectID: number): Promise<ITask> {
    return store.create(RESOURCE_NAME, { taskDescription: description, projectID: projectID });
  }

  public updateTask(id: number, description: string, projectID: number): Promise<ITask> {
    return store.update(RESOURCE_NAME, id, { taskDescription: description, projectID: projectID });
  }

  public deleteTask(id: number) {
    return store.destroy(RESOURCE_NAME, id, {
    });
  }
}