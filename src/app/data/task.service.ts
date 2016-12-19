import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IDataservice, Project } from '.';

@Injectable()
export class TaskService implements IDataservice {

  public baseUrl: string = environment.apiBaseUrl;

  constructor() { }

}
