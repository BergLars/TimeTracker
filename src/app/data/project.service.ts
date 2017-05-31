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
    let resource = store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,
      attributeId: 'name',
      relations: {
        hasMany: {
          entry: {
            foreignKey: 'projectID',
            localField: 'entries'
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

  // public getProjectByName(name: string): Promise<IProject> {
  //   let endpoint = '/' + ENDPOINT_NAME + '/projectName';
  //   return store.find(RESOURCE_NAME,{'name':name}, {
  //     endpoint: endpoint,
  //     cacheResponse: false,
  //     bypassCache: true
  //   });
  // }

  // ------------------------------------------------------------------------------- Helper methods

  private insertProject(id: number): any {
    // return this.http
    //   .get(this.baseUrl + '/Project/' + id)
    //   .map(result => {
    //     let body = result.json();
    //     return body.data || {};
    //   })
    //   .catch(this.handleError);
  }
}
