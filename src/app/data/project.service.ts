import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, IProject } from '.';
import { Http } from '@angular/http';
import { LoginService } from '../login/login.service'

const RESOURCE_NAME: string = 'project';
const ENDPOINT_NAME: string = 'projects';

@Injectable()
export class ProjectService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  public projectsDictionary: any = {}
  @Input() projects: IProject[] = [];

  constructor(
    private http: Http,
    // private loginService: LoginService
    ) {
    // Define a Mapper for a "Project" resource
    store.defineMapper(RESOURCE_NAME, {
      basePath: this.baseUrl,
      endpoint: ENDPOINT_NAME,
      relations: {
        hasMany: {
          entry: {
            foreignKey: 'projectID',
            localField: 'entry'
          }
        }
      }
    });
  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getProjects() {
    let that = this;

    return new Promise<any>((resolve, reject) => {
      this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
          results => {
            this.projects = results;

            results.forEach(function (result) {
              that.projectsDictionary[result.id] = result;
            });
      }, 
      (err) => {
          if (err.status === 500) {
            // this.loginService.logout();
          }
        });
    });

  }
  
  public getProject(id: number): Promise<IProject> {
    return store.find(RESOURCE_NAME, id);
  }

  public createProject(name: string): Promise<IProject> {
    return store.create(RESOURCE_NAME, { projectName: name }, { force: true });
  }

  public updateProject(id: number, name: string): Promise<IProject> {
    return store.update(RESOURCE_NAME, id, { projectName: name });
  }

  public deleteProject(id: number) {
    return store.destroy(RESOURCE_NAME, id, { force: true });
  }
}
