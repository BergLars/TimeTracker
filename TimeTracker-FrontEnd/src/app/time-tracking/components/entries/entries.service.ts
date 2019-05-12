import { Injectable, Input } from '@angular/core';
import { Timeentry, Project, Client, Userprofile } from '../../../interfaces';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class EntriesService {
  public baseUrl: string = environment.apiBaseUrl;
  public isCreated: boolean;
  @Input() projects: Project[] = [];
  @Input() project: Project;
  @Input() clients: Client[] = [];
  @Input() client: Client;
  @Input() users: Userprofile[] = [];
  @Input() user: Userprofile;
  private sortingColumn: string;
  private sortingDirection: string;
  public projectsDictionary: any = {};
  public clientsDictionary: any = {};
  public usersDictionary: any = {};

  @Input() totalTimeSpent: any;
  @Input() static displayByAll: Timeentry[] = [];
  @Input() static clonedEntries: Timeentry[] = [];

  private isAdmin: boolean = false;

  public startOfWeek: any;
  public endOfWeek: any;
  public startOfMonth: any;
  public endOfMonth: any;
  public today: any;
  private term: string = "";
  private selectedUserID: any;
  @Input() static dates = [];
  @Input() totalAvailableVacationDays: any;

  // Allow to sort items with a String value Asc
  public propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;


  constructor(
    private loginService: LoginService,
    private http: Http) {
    this.isAdmin = this.loginService.isAdmin();
  }

  getSelectedUserID() {
    return this.selectedUserID;
  }

  setSelectedUserID(userID) {
    this.selectedUserID = userID;
  }
  public getEntries() {
    return this.sortEntriesBy(this.sortingColumn, this.sortingDirection);
  }
  private static sortEntriesByDescriptionAsc = (a, b) => {
    if (isNaN(a.description) || isNaN(b.description)) {
      return a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1;
    }
    return a.description - b.description;
  }

  public sortEntriesBy(propertyName: string, order: string) {
    let sortedEntries;
    let sortHook = EntriesService.ascendingSortingHookTable[propertyName];
    sortedEntries = EntriesService.clonedEntries.sort(sortHook);
    sortedEntries = order === "Desc" ? sortedEntries.reverse() : sortedEntries;
    return sortedEntries;
  }

   private static ascendingSortingHookTable = {
    "Description": EntriesService.sortEntriesByDescriptionAsc,
  }

  allEntriesAreLoaded(): Promise<any> {
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
                  // We build a dictionary of users
                  this.http.get(this.baseUrl + "/userprofile/all").map(res => res.json()).subscribe(
                    results => {
                      this.users = results;

                      results.forEach(function (result) {
                        that.usersDictionary[result.id] = result;
                      });

                      this.http.get(this.baseUrl + "/timeentries/all").map(res => res.json()).subscribe(
                        loadedEntries => {
                          var items = [];
                          var dates = [];

                          loadedEntries.forEach(function (entry) {
                            entry.project = that.projectsDictionary[entry.projectID];
                            entry.projectName = entry.project.projectName;
                            // entry.clientName = entry.client.clientName;
                            entry.entryDate = entry.entryDate;
                            entry.worktime = entry.worktime.value;
                            entry.client = that.clientsDictionary[entry.clientID];
                            entry.clientName = entry.client.clientName;
                            dates.push(moment(entry.entryDate).format('YYYY-MM-DD'));
                            items.push(entry);
                          });

                          EntriesService.clonedEntries = items;
                          EntriesService.displayByAll = items;
                          this.displaySidebarData();

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

  sortedProjects() {
    return this.projects.sort(this.propComparator('projectName'));
  }

  sortedClients() {
    return this.clients.sort(this.propComparator('clientName'));
  }

  sortEntriesByDescriptionDesc(items) {
    return items.sort(function (a, b) {
      if (isNaN(a.description) || isNaN(b.description)) {
        return a.description > b.description ? -1 : 1;
      }
      return b.description - a.description;
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

  displaySidebarData() {
    // this.registryService.sidebarComponent.totalHoursWorkedPast4D = this.totalHoursWorkedPast4days(EntriesService.displayByAll);
    // this.registryService.sidebarComponent.totalHoursWorkedT = this.totalHoursWorkedToday(EntriesService.displayByAll);
    // this.registryService.sidebarComponent.totalHoursWorkedW = this.totalHoursWorkedWeek(EntriesService.displayByAll);
    // this.registryService.sidebarComponent.totalHoursWorkedM = this.totalHoursWorkedMonth(EntriesService.displayByAll);
    // this.registryService.sidebarComponent.totalTimeSpent = this.timeSpentService.calculateTotalTimeSpent(EntriesService.clonedEntries);

  }

  totalHoursWorkedPast4days(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      // Check if entry date is between the start and the end of the current Week
      // If yes, add it to an array
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.today, 'DD.MM.YYYY').subtract(4, 'days'), moment(this.today, 'DD.MM.YYYY').add(1, 'days'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    // return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedToday(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isSame(moment(this.today, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    // return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedWeek(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfWeek, 'DD.MM.YYYY'), moment(this.endOfWeek, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    // return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedMonth(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfMonth, 'DD.MM.YYYY'), moment(this.endOfMonth, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    // return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  getCurrentDayWeekMonth() {
    // this.registryService.sidebarComponent.currentMonth = moment().startOf("month").format('MMMM');
    this.startOfMonth = moment().startOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.endOfMonth = moment().endOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.startOfWeek = moment().startOf('week').format('DD.MM.YYYY');
    this.endOfWeek = moment().endOf('week').format('DD.MM.YYYY');
    this.today = moment().format('DD.MM.YYYY');
    // this.registryService.sidebarComponent.weekNumber = moment(this.today, 'DD.MM.YYYY').isoWeek();
    this.totalAvailableVacationDays = '*_*';
  }
}