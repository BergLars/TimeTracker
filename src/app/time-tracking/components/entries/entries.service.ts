import { Injectable, Input } from '@angular/core';
import { ITimeTrackingEntry, IProject, ITask, IClient, RegistryService, TimespentService, DatesService } from '../../../data';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';
import * as _ from 'lodash';

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
  public tasksDictionary: any = {};
  public projectsDictionary: any = {};
  public clientsDictionary: any = {};
  @Input() totalTimeSpent: any;

  @Input() static clonedEntries: ITimeTrackingEntry[] = [];
  @Input() filteredEntries: ITimeTrackingEntry[] = [];
  @Input() searchedEntries: ITimeTrackingEntry[] = [];

  private projectsFilter = [];
  private clientsFilter = [];
  private tasksFilter = [];
  private selectedDate: any;
  private billable: any;
  private isAdmin: boolean = false;

  private sortingColumn: string;
  private sortingDirection: string;

  public startOfWeek: any;
  public endOfWeek: any;
  public startOfMonth: any;
  public endOfMonth: any;
  public today: any;
  @Input() static dates = [];
  @Input() totalAvailableVacationDays: any;

  // Allow to sort items with a String value Asc
  public propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;


  constructor(
    private loginService: LoginService,
    private http: Http,
    private registryService: RegistryService,
    private timeSpentService: TimespentService,
    public datesService: DatesService) {
    this.isAdmin = this.loginService.isAdmin();
  }

  /**
    * Sort by Start date
    * @param a
    * @param b
    */

  private static sortEntriesByStartDateAsc = (a, b) => {
    return moment(a.startDateTime, 'YYYY-MM-DD HH:mm').toDate() - moment(b.startDateTime, 'YYYY-MM-DD HH:mm').toDate();
  }

  /**
  * Sort by End date
  * @param a
  * @param b 
  */

  private static sortEntriesByEndDateAsc = (a, b) => {
    return moment(a.endDateTime, 'YYYY-MM-DD HH:mm').toDate() - moment(b.endDateTime, 'YYYY-MM-DD HH:mm').toDate();
  }

  /**
   * Sort by Descripiton
   * @param a
    * @param b
   */
  private static sortEntriesByDescriptionAsc = (a, b) => {
    if (isNaN(a.description) || isNaN(b.description))
      return a.description > b.description ? 1 : -1;
    return a.description - b.description;
  }

  /**
  * Sort by Start time
   * @param a
    * @param b
  */
  private static sortEntriesByStartTimeAsc = (a, b) => {
    let x = moment(a.startDateTime).format('HH:mm');
    let y = moment(b.startDateTime).format('HH:mm');
    if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
      return -1
    if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
      return 1
    return 0;
  }

  /**
  * Sort by End time
  * @param a
    * @param b 
  */
  private static sortEntriesByEndTimeAsc = (a, b) => {
    let x = moment(a.endDateTime).format('HH:mm');
    let y = moment(b.endDateTime).format('HH:mm');
    if (moment(x, 'HH:mm').isBefore(moment(y, 'HH:mm')))
      return -1
    if (moment(x, 'HH:mm').isAfter(moment(y, 'HH:mm')))
      return 1
    return 0;
  }

  /**
  * Sort by Time spent
  * @param a
    * @param b  
  */
  private static sortEntriesByTimeSpentAsc = (a, b) => {
    return a.timeSpent > b.timeSpent ? 1 : -1;
  }

  /**
  * Sort by Project name
  * @param a
    * @param b 
  */
  private static sortEntriesByProjectAsc = (a, b) => {
    if (isNaN(a.project.projectName) || isNaN(b.project.projectName))
      return a.project.projectName.toLowerCase() > b.project.projectName.toLowerCase() ? 1 : -1;
    return a.project.projectName - b.project.projectName;
  }

  /**
 * Sort by Client name
 * @param a
   * @param b 
 */
  private static sortEntriesByClientAsc = (a, b) => {
    if (isNaN(a.client.clientName) || isNaN(b.client.clientName))
      return a.client.clientName.toLowerCase() > b.client.clientName.toLowerCase() ? 1 : -1;
    return a.client.clientName - b.client.clientName;
  }

  /**
  * Sort by Task description
  * @param a
   * @param b  
  */
  private static sortEntriesByTaskAsc = (a, b) => {
    if (isNaN(a.task.taskDescription) || isNaN(b.task.taskDescription))
      return a.task.taskDescription.toLowerCase() > b.task.taskDescription.toLowerCase() ? 1 : -1;
    return a.task.taskDescription - b.task.taskDescription;
  }

  private static ascendingSortingHookTable = {
    "Description": EntriesService.sortEntriesByDescriptionAsc,
    "Entry Date": EntriesService.sortEntriesByStartDateAsc,
    "Start Time": EntriesService.sortEntriesByStartTimeAsc,
    "End Date": EntriesService.sortEntriesByEndDateAsc,
    "End Time": EntriesService.sortEntriesByEndTimeAsc,
    "Time Spent": EntriesService.sortEntriesByTimeSpentAsc,
    "Project Name": EntriesService.sortEntriesByProjectAsc,
    "Client Name": EntriesService.sortEntriesByClientAsc,
    "Task Description": EntriesService.sortEntriesByTaskAsc
  }

  // Filter all entries with one or more parameter
  private filterEntries(entries) {
    // We filter by 
    let self = this;
    entries = entries.filter((timeEntry) => {
      let entryProjectId = timeEntry.projectID.valueOf();
      // Does the current entryProjectId belong to user selected projects in the filter 
      return (self.projectsFilter.indexOf(entryProjectId) != -1);
    });

    // We filter by task
    entries = entries.filter(function (timeEntry) {
      let entryTaskId = timeEntry.taskID.valueOf();
      return (self.tasksFilter.indexOf(entryTaskId) != -1);
    });

    // We filter by client
    entries = entries.filter(function (timeEntry) {
      let entryClientId = timeEntry.clientID.valueOf();
      return (self.clientsFilter.indexOf(entryClientId) != -1);
    });

    // We filter by date
    entries = entries.filter(function (timeEntry) {
      let entryStartDate = moment(timeEntry.startDateTime).format('DD.MM.YYYY');
      if (self.selectedDate === 'All') {
        return entries;
      }
      else {
        return (entryStartDate === self.selectedDate);
      }
    });

    // We filter by billable
    entries = entries.filter(function (timeEntry) {
      let entryBillable = timeEntry.billable.valueOf();
      return (entryBillable != self.billable);
    });

    this.registryService.sidebarComponent.totalTimeSpent = this.timeSpentService.calculateTotalTimeSpent(entries);
    return entries;
  }

  public sortEntriesBy(propertyName: string, order: string) {
    let sortedEntries;
    let sortHook = EntriesService.ascendingSortingHookTable[propertyName];
    sortedEntries = EntriesService.clonedEntries.sort(sortHook);
    sortedEntries = order === "Desc" ? sortedEntries.reverse() : sortedEntries;
    let filteredEntries = this.filterEntries(sortedEntries);
    return filteredEntries;
  }

  public setFilteringBy(parameterObject) {
    this.projectsFilter = parameterObject["projects"];
    this.clientsFilter = parameterObject["clients"];
    this.tasksFilter = parameterObject["tasks"];
    this.selectedDate = parameterObject["selectedDate"];
    this.billable = parameterObject["selectedBillable"];
  }

  public setSortingBy(parameterObject) {
    this.sortingColumn = parameterObject["column"];
    this.sortingDirection = parameterObject["direction"];
  }

  public getEntries() {
    return this.sortEntriesBy(this.sortingColumn, this.sortingDirection);
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
                      var dates = [];

                      loadedEntries.forEach(function (entry) {
                        entry.task = that.tasksDictionary[entry.taskID];
                        entry.client = that.clientsDictionary[entry.clientID];
                        entry.project = that.projectsDictionary[entry.projectID];
                        entry.projectName = entry.project.projectName;
                        entry.taskDescription = entry.task.taskDescription;
                        entry.clientName = entry.client.clientName;
                        entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
                        entry.startTime = entry.startDateTime.substring(11, 16);
                        entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
                        entry.endTime = entry.endDateTime.substring(11, 16);
                        dates.push(moment(entry.startDateTime).format('YYYY-MM-DD'));
                        items.push(entry);
                      });
                      this.timeSpentService.calculateEntriesTimeSpent(items);
                      this.setColor(items);
                      EntriesService.dates = _.uniqWith(dates, _.isEqual);
                      EntriesService.dates = _.sortBy(EntriesService.dates, function (dateObj) {
                        return new Date(dateObj.value);
                      });
                      EntriesService.dates = EntriesService.dates;
                      dates = this.datesService.uniqValue(dates);
                      dates = this.datesService.sortBy(dates);
                      EntriesService.dates = this.datesService.swissFormat(dates);
                      EntriesService.clonedEntries = items;
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

              // We build the dictionary of tasks
              this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
                results => {
                  this.tasks = results;

                  results.forEach(function (result) {
                    that.tasksDictionary[result.id] = result;
                  });

                  this.http.get(this.baseUrl + "/timeentries/all").map(res => res.json()).subscribe(
                    loadedEntries => {
                      var items = [];
                      var dates = [];

                      loadedEntries.forEach(function (entry) {
                        entry.task = that.tasksDictionary[entry.taskID];
                        entry.client = that.clientsDictionary[entry.clientID];
                        entry.project = that.projectsDictionary[entry.projectID];
                        entry.projectName = entry.project.projectName;
                        entry.taskDescription = entry.task.taskDescription;
                        entry.clientName = entry.client.clientName;
                        entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
                        entry.startTime = entry.startDateTime.substring(11, 16);
                        entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
                        entry.endTime = entry.endDateTime.substring(11, 16);
                        dates.push(moment(entry.startDateTime).format('YYYY-MM-DD'));
                        items.push(entry);
                      });
                      this.timeSpentService.calculateEntriesTimeSpent(items);
                      this.setColor(items);
                      dates = this.datesService.uniqValue(dates);
                      dates = this.datesService.sortBy(dates);
                      EntriesService.dates = this.datesService.swissFormat(dates);

                      EntriesService.clonedEntries = items;
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

  // Set orange color of an entry over 1 day
  setColor(items) {
    items.forEach(entry => {
      let startDateTime = moment().format(entry.startDateTime, 'yyyy-MM-dd HH:mm:ss');
      let endDateTime = moment().format(entry.endDateTime, 'yyyy-MM-dd HH:mm:ss');

      // Split to catch the startDate and endDate
      let start = startDateTime.split(" ");
      let end = endDateTime.split(" ");

      // Compare start and endDate are not the same
      if (moment(start[0], 'YYYY-MM-DD').isBefore(moment(end[0], 'YYYY-MM-DD'))) {
        entry.isColored = true;
      }
      else {
        entry.isColored = false;
      }
    });
  }

  searchBy(id, term): Promise<any> {
    let that = this;
    let url = this.baseUrl + "/timeentries/search?";

    return new Promise<any>((resolve, reject) => {
      this.http.get(url + "selectedUserID=" + id + "&term=" + term).map(res => res.json()).subscribe(
        loadedEntries => {
          var items = [];

          loadedEntries.forEach(function (entry) {
            entry.task = that.tasksDictionary[entry.taskID];
            entry.client = that.clientsDictionary[entry.clientID];
            entry.project = that.projectsDictionary[entry.projectID];
            entry.projectName = entry.project.projectName;
            entry.taskDescription = entry.task.taskDescription;
            entry.clientName = entry.client.clientName;
            entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
            entry.startTime = entry.startDateTime.substring(11, 16);
            entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
            entry.endTime = entry.endDateTime.substring(11, 16);
            items.push(entry);
          });
          this.timeSpentService.calculateEntriesTimeSpent(items);
          this.setColor(items);
          EntriesService.clonedEntries = items;
          resolve(items);
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

  sortedTasks() {
    return this.tasks.sort(this.propComparator('taskDescription'));
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
    this.registryService.sidebarComponent.totalHoursWorkedPast4D = this.totalHoursWorkedPast4days(EntriesService.clonedEntries);
    this.registryService.sidebarComponent.totalHoursWorkedT = this.totalHoursWorkedToday(EntriesService.clonedEntries);
    this.registryService.sidebarComponent.totalHoursWorkedW = this.totalHoursWorkedWeek(EntriesService.clonedEntries);
    this.registryService.sidebarComponent.totalHoursWorkedM = this.totalHoursWorkedMonth(EntriesService.clonedEntries);
    this.registryService.sidebarComponent.totalTimeSpent = this.timeSpentService.calculateTotalTimeSpent(EntriesService.clonedEntries);

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
    return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedToday(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isSame(moment(this.today, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedWeek(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfWeek, 'DD.MM.YYYY'), moment(this.endOfWeek, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  totalHoursWorkedMonth(entries) {
    let timeSpents = [];
    entries.forEach(element => {
      if (moment(element.entryDate, 'DD.MM.YYYY').isBetween(moment(this.startOfMonth, 'DD.MM.YYYY'), moment(this.endOfMonth, 'DD.MM.YYYY'))) {
        timeSpents.push(element.timeSpent);
      }
    });
    return this.timeSpentService.sidebarTotalTimeSpent(timeSpents);
  }

  getCurrentDayWeekMonth() {
    this.registryService.sidebarComponent.currentMonth = moment().startOf("month").format('MMMM');
    this.startOfMonth = moment().startOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.endOfMonth = moment().endOf('month').subtract(1, 'days').format('DD.MM.YYYY');
    this.startOfWeek = moment().startOf('week').format('DD.MM.YYYY');
    this.endOfWeek = moment().endOf('week').format('DD.MM.YYYY');
    this.today = moment().format('DD.MM.YYYY');
    this.registryService.sidebarComponent.weekNumber = moment(this.today, 'DD.MM.YYYY').isoWeek();
    this.totalAvailableVacationDays = '*_*';
  }
}