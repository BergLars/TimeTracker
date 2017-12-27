import { Observable } from 'rxjs/Rx';
import { Injectable, Input, ViewContainerRef } from '@angular/core';
import { ITimeTrackingEntry, IProject, ITask, IClient } from '../../../data';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';

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

  // Allow to sort items with a String value Asc
  public propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;


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

  /**
  * Sort by Start date
  * @param items 
  */
  sortEntriesByDefault(items) {
    return items.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
  }

  sortEntriesByStartDateAsc(items) {
    return items.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  }
  /**
  * Sort by End date
  * @param items 
  */
  sortEntriesByEndDateDesc(items) {
    return items.sort((a, b) => new Date(b.endDateTime).getTime() - new Date(a.endDateTime).getTime());
  }

  sortEntriesByEndDateAsc(items) {
    return items.sort((a, b) => new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime());
  }

  /**
   * Sort by Descripiton
   * @param items 
   */
  sortEntriesByDescriptionAsc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.description) || isNaN(b.description)) {
        return a.description > b.description ? 1 : -1;
      }
      return a.description - b.description;
    });
  }

  sortEntriesByDescriptionDesc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.description) || isNaN(b.description)) {
        return a.description > b.description ? -1 : 1;
      }
      return b.description - a.description;
    });
  }

  /**
 * Sort by End time
 * @param items 
 */
  sortEntriesByEndTimeAsc(items) {
    return items.sort((a, b) => {
      let x = moment(a.endDateTime).format('HH:mm');
      let y = moment(b.endDateTime).format('HH:mm');
      if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
        return -1
      if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
        return 1
      return 0
    });
  }

  sortEntriesByEndTimeDesc(items) {
    return items.sort((a, b) => {
      let x = moment(a.endDateTime).format('HH:mm');
      let y = moment(b.endDateTime).format('HH:mm');
      if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
        return 1
      if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
        return -1
      return 0
    });
  }

  /**
 * Sort by Start time
 * @param items 
 */
  sortEntriesByStartTimeAsc(items) {
    return items.sort((a, b) => {
      let x = moment(a.startDateTime).format('HH:mm');
      let y = moment(b.startDateTime).format('HH:mm');
      if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
        return -1
      if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
        return 1
      return 0
    });
  }

  sortEntriesByStartTimeDesc(items) {
    return items.sort((a, b) => {
      let x = moment(a.startDateTime).format('HH:mm');
      let y = moment(b.startDateTime).format('HH:mm');
      if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
        return 1
      if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
        return -1
      return 0
    });
  }

  /**
  * Sort by Time spent
  * @param items 
  */
  sortEntriesByTimeSpentAsc(items) {
    return items.sort(function (a, b) {
      return a.timeSpent > b.timeSpent ? 1 : -1;
    });
  }

  sortEntriesByTimeSpentDesc(items) {
    return items.sort(function (a, b) {
      return a.timeSpent > b.timeSpent ? -1 : 1;
    });
  }

  /**
  * Sort by Project name
  * @param items 
  */
  sortEntriesByProjectAsc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.project.projectName) || isNaN(b.project.projectName)) {
        return a.project.projectName.toLowerCase() > b.project.projectName.toLowerCase() ? 1 : -1;
      }
      return a.project.projectName - b.project.projectName;
    });
  }

  sortEntriesByProjectDesc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.project.projectName) || isNaN(b.project.projectName)) {
        return a.project.projectName.toLowerCase() > b.project.projectName.toLowerCase() ? -1 : 1;
      }
      return b.project.projectName - a.project.projectName;
    });
  }

  /**
 * Sort by Client name
 * @param items 
 */
  sortEntriesByClientAsc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.client.clientName) || isNaN(b.client.clientName)) {
        return a.client.clientName.toLowerCase() > b.client.clientName.toLowerCase() ? 1 : -1;
      }
      return a.client.clientName - b.client.clientName;
    });
  }

  sortEntriesByClientDesc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.client.clientName) || isNaN(b.client.clientName)) {
        return a.client.clientName.toLowerCase() > b.client.clientName.toLowerCase() ? -1 : 1;
      }
      return b.client.clientName - a.client.clientName;
    });
  }

  /**
 * Sort by Task description
 * @param items 
 */
  sortEntriesByTaskAsc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.task.taskDescription) || isNaN(b.task.taskDescription)) {
        return a.task.taskDescription.toLowerCase() > b.task.taskDescription.toLowerCase() ? 1 : -1;
      }
      return a.task.taskDescription - b.task.taskDescription;
    });
  }

  sortEntriesByTaskDesc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.task.taskDescription) || isNaN(b.task.taskDescription)) {
        return a.task.taskDescription.toLowerCase() > b.task.taskDescription.toLowerCase() ? -1 : 1;
      }
      return b.task.taskDescription - a.task.taskDescription;
    });
  }
}