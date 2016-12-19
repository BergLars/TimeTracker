import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '.';

const ENDPOINT: string = 'Project';

@Injectable()
export class ProjectService {

  public baseUrl: string;

  constructor(private http: Http) {

  }

  // ------------------------------------------------------------------------------ CRUD operations

  public getProjects(): any {
    return this.http
      .get(this.baseUrl + '/Projects')
      .map(result => {
        let body = result.json();
        return body.data || {};
      })
      .catch(this.handleError);
  }

  public getProject(id: number): any {
    return this.http
      .get(this.baseUrl + '/Project/' + id)
      .map(this.deserialize)
      .catch(this.handleError);
  }

  public saveProject(item: Project): any {
    return this.http
      .get(this.baseUrl + '/Project/' + item.id)
      .map(this.deserialize)
      .catch(this.handleError);
  }

  // ------------------------------------------------------------------------------- Helper methods

  private deserialize(result: Response) {
    
  }

  private serialize(result: Response) {
    
  }

  private  insertProject(id: number): any {
    return this.http
      .get(this.baseUrl + '/Project/' + id)
      .map(result => {
        let body = result.json();
        return body.data || {};
      })
      .catch(this.handleError);
  }


  // ------------------------------------------------------------------------------- Error handling

  

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}