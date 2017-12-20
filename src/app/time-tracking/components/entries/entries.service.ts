import { Observable } from 'rxjs/Rx';
import { Injectable, Input, ViewContainerRef } from '@angular/core';
import { ITimeTrackingEntry, IProject, ITask, IClient } from '../../../data';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../login';

@Injectable()
export class EntriesService {
  public baseUrl: string = environment.apiBaseUrl;
  public isCreated: boolean;
  @Input() projects: IProject[] = [];
  @Input() project: IProject;
  @Input() tasks: ITask[] = [];
  @Input() task: ITask;
  @Input() clients: IClient[] = [];
  @Input() client: IClient;
  public clonedItems: ITimeTrackingEntry[] = [];
  public tasksDictionary: any = {};
  public projectsDictionary: any = {};
  public clientsDictionary: any = {};


  constructor(
    private loginService: LoginService,
    private http: Http) {
  }

  entriesAreLoaded(): Promise<any> {
    let that = this;

    return new Promise<any>((resolve, reject) => {
      this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
        results => {
          this.clients = results;

          results.forEach(function (result) {
            that.clientsDictionary[result.id] = result;
          });

          this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
            results => {
              this.projects = results;

              results.forEach(function (result) {
                that.projectsDictionary[result.id] = result;
              });

              // We build the dictionary of tasks
              this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
                results => {
                  this.tasks = results;

                  results.forEach(function (result) {
                    that.tasksDictionary[result.id] = result;
                  });

                  this.http.get(this.baseUrl + "/timeentries").map(res => res.json()).subscribe(
                    loadedEntries => {
                      var items = [];

                      loadedEntries.forEach(function (entry) {
                        entry.task = that.tasksDictionary[entry.taskID];
                        entry.client = that.clientsDictionary[entry.clientID];
                        entry.project = that.projectsDictionary[entry.projectID];
                        items.push(entry);
                      });
                      this.clonedItems = items;
                      resolve(items);
                    });
                });
            });
        },
        (err) => {
          if (err.status === 500) {
            this.loginService.logout();
          }
        });
    });
  }

  sortEntriesByDefault(items) {
    return items.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
  }

  sortEntriesByStartDateAsc(items) {
    return items.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  }

  sortEntriesByEndDateDesc(items) {
    return items.sort((a, b) => new Date(b.endDateTime).getTime() - new Date(a.endDateTime).getTime());
  }

  sortEntriesByEndDateAsc(items) {
    return items.sort((a, b) => new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime());
  }
}