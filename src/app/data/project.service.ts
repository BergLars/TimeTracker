import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, IProject } from '.';

const RESOURCE_NAME: string = 'project';
const ENDPOINT_NAME: string = 'projects';

@Injectable()
export class ProjectService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() {
    // Define a Mapper for a "Project" resource
    store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,
      // attributeId: 'name',
      cacheResponse: false,
      bypassCache: true,
      relations: {
        hasMany: {
          task: {
            localField: 'tasks',
            foreignKey: 'projectID'
          }
        },
        belongsTo: {
          client: {
            localField: 'client',
            localKey: 'clientID'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getProjects(): Promise<IProject[]> {
    return store.findAll(RESOURCE_NAME);
  }

  public getProject(id: number): Promise<IProject> {
    return store.find(RESOURCE_NAME, id);
  }

  public createProject(name: string, clientID: number): Promise<IProject> {
    return store.create(RESOURCE_NAME, { projectName: name, clientID: clientID });
  }

  public updateProject(id: number, name: string, clientID: number): Promise<IProject> {
    return store.update(RESOURCE_NAME, id, { projectName: name, clientID: clientID });
  }

  public deleteProject(id: number) {
    return store.destroy(RESOURCE_NAME, id, {
    });
  }
}
