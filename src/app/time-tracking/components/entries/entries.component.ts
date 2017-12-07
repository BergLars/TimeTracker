import { Component, Input, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, RegistryService } from '../../../data';
import { MdDialog } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { environment } from '../../../../environments/environment';
import moment from 'moment/src/moment';
import { EntriesService } from './entries.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;

  @Input() projects: IProject[] = [];
  @Input() project: IProject;
  @Input() tasks: ITask[] = [];
  @Input() task: ITask;
  @Input() clients: IClient[] = [];
  @Input() client: IClient;
  public items: ITimeTrackingEntry[] = [];
  rows = [];
  selected = [];
  selectedRow: any;
  editMode: boolean = false;
  rowID: number;
  userID: number;
  clientID: any;
  projectID: any;
  taskID: any;
  isBillable: boolean;
  count: number = 0;
  @Input() offset: number = 0;
  @Input() date: string;
  public editing = {};
  public result: any;
  private limits = [
    { key: 'All Entries', value: 50 },
    { key: '10 Entries', value: 10 },
    { key: '5 Entries', value: 5 }
  ];
  limit: number = this.limits[0].value;
  rowLimits: Array<any> = this.limits;
  public createItems = [
    { key: 'None', id: 1 },
    { key: 'Client', id: 2 },
    { key: 'Project', id: 3 },
    { key: 'Task', id: 4 }
  ];
  item: number = this.createItems[0].id;
  public defaultItem: any;
  @Input() selectedClients: any;
  @Input() selectedProjects: any;
  @Input() selectedTasks: any;
  @Input() itemTotalTimeSpent: any;
  isValid: boolean = false;

  constructor(
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private viewContainerRef: ViewContainerRef,
    private dialog: MdDialog,
    private http: Http,
    public registryService: RegistryService,
    public entriesService: EntriesService,
    private elementRef: ElementRef) {
    this.registryService.entriesComponent = this;
    this.loadEntries();
  }

  ngOnInit() {
    this.defaultItem = this.createItems[0].key;
  }

  setSelectFocus(event, row, value) {
    let element = event.target;
    let parentElement = element.parentElement;
    setTimeout(() => {
      let parentElementTag = parentElement.getElementsByTagName(value)[0];
      parentElementTag.focus();
    }, 100);
  }

  removeSelectFocus(row, cell) {
    this.editing[row.$$index + cell] = false;
    setTimeout(() => {
      // this.unselectEntry();
    }, 50);
  }

  // Filter all entries with one or more parameter
  filterEntries() {
    var userSelectedProjects = [];
    var userSelectedTasks = [];
    var userSelectedClients = [];

    let filteredEntries: ITimeTrackingEntry[];

    // Handle if no project is selected
    if (this.selectedProjects) {
      this.selectedProjects.forEach(selectionIndex => {
        userSelectedProjects.push(selectionIndex);
      });
    }
    // Handle if no task is selected
    if (this.selectedTasks) {
      this.selectedTasks.forEach(selectionIndex => {
        userSelectedTasks.push(selectionIndex);
      });
    }
    // Handle if no client is selected
    if (this.selectedClients) {
      this.selectedClients.forEach(selectionIndex => {
        userSelectedClients.push(selectionIndex);
      });
    }
    // We get all the entries
    filteredEntries = this.entriesService.clonedItems;

    // We filter by project
    filteredEntries = filteredEntries.filter(function (timeEntry) {
      let entryProjectId = timeEntry.projectID.valueOf();
      // Does the current entryProjectId belong to user selected projects in the filter 
      return (userSelectedProjects.indexOf(entryProjectId) != -1);
    });

    // We filter by task
    filteredEntries = filteredEntries.filter(function (timeEntry) {
      let entryTaskId = timeEntry.taskID.valueOf();
      return (userSelectedTasks.indexOf(entryTaskId) != -1);
    });

    // We filter by client
    filteredEntries = filteredEntries.filter(function (timeEntry) {
      let entryClientId = timeEntry.clientID.valueOf();
      return (userSelectedClients.indexOf(entryClientId) != -1);
    });

    // We assign the result to the table datasource
    this.items = filteredEntries;

    // Map projectName, taskDescription, clientName and entryDate to row in rows
    this.mapEntryValue(this.items);

    this.itemTotalTimeSpent = this.totalTimeSpent(this.items);
  }

  // Calcul total time spent
  public totalTimeSpent(entries) {
    let endTimeH: number = 0;
    let endTimeMin: number = 0;
    let hour: number = 0;
    let timeSpent: any;
    for (let entry of entries) {
      // endTimeH = endTimeH + parseInt(entry.timeSpent.substring(0, 2));
      // endTimeMin = endTimeMin + parseInt(entry.timeSpent.substring(3, 5));
    }

    // Handle conversion Minute over 60mn to 1h
    if (endTimeMin > 60) {
      hour = Math.floor(endTimeMin / 60);
      endTimeH = endTimeH + hour;
      endTimeMin = Math.abs(endTimeMin - (60 * hour));
      if ((endTimeH.toString()).length < 2 && (endTimeMin.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':0' + endTimeMin;
      }
      else if ((endTimeH.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':' + endTimeMin;
      }
      else if ((endTimeMin.toString()).length < 2) {
        timeSpent = endTimeH + ':0' + endTimeMin;
      } else {
        timeSpent = endTimeH + ':' + endTimeMin;
      }
      return timeSpent;
    }
    // Handle Minute below 60mn
    else {
      if ((endTimeH.toString()).length < 2 && (endTimeMin.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':0' + endTimeMin;
      }
      else if ((endTimeH.toString()).length < 2) {
        timeSpent = '0' + endTimeH + ':' + endTimeMin;
      }
      else if ((endTimeMin.toString()).length < 2) {
        timeSpent = endTimeH + ':0' + endTimeMin;
      } else {
        timeSpent = endTimeH + ':' + endTimeMin;
      }
      return timeSpent;
    }
  }

  changeRowLimits(event) {
    this.limit = event.target.value;
    this.offset = 0;
    this.loadEntries();
  }

  public clientDropdown(value: string): void {
    this.clientID = value;
  }

  public projectDropdown(value): void {
    this.projectID = value;
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    if (cell == 'description') {
      row.description = (event.target.value).trim();
      this.updateEntry(row);
    }

    if (cell == 'client') {
      row.clientID = event.target.value;
      this.http.get(this.baseUrl + "/clients/" + event.target.value).subscribe(res => {
        row.client = res;
        return this.updateEntry(row);
      });
    }

    if (cell == 'project') {
      row.projectID = event.target.value;
      this.http.get(this.baseUrl + "/projects/" + event.target.value).subscribe(res => {
        row.project = res;
        return this.updateEntry(row);
      });
    }

    if (cell == 'task') {
      row.taskID = event.target.value;
      this.http.get(this.baseUrl + "/tasks/" + event.target.value).subscribe(res => {
        row.task = res;
        return this.updateEntry(row);
      });
    }

    if (cell == 'date') {
      let selectedDate = cellValue;
      let formatedDate = event.target.value.substring(6, 10) + "-" + event.target.value.substring(3, 5) + "-" + event.target.value.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      if (event.target.value === "") {
        row.entryDate = selectedDate;
      }
      else {
        if (!this.registryService.dateRequirement.test(event.target.value.trim())) {
          alert('Wrong date format !');
        }
        else if (moment(formatedDate, 'YYYY-MM-DD').isAfter(moment(formatedEndDate, 'YYYY-MM-DD'))) {
          row.startDateTime = formatedDate + ' ' + row.startTime;

          let endT = moment(row.startTime, 'HH:mm') + moment.duration().add(row.timeSpent, 'HH:mm');
          row.endTime = moment(endT).format('HH:mm');
          row.endDateTime = formatedDate + ' ' + row.endTime;
          this.updateEntry(row);
        }
        else if (moment(formatedDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
          let longEndDate = moment(formatedEndDate, 'YYYY-MM-DD').add(1, 'd');
          let validateFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');
          row.startDateTime = formatedDate + ' ' + row.startTime;
          row.endDateTime = validateFormatEndDate + ' ' + row.endTime;
          this.updateEntry(row);
        }
        else {
          row.entryDate = event.target.value.trim();
          row.startDateTime = formatedDate + ' ' + row.startTime;
          this.updateEntry(row);
        }
      }
    }

    if (cell == 'startTime') {
      row.startTime = event.target.value;
      if (!this.registryService.timeRequirement.test(row.startTime)) {
        row.startTime = cellValue.trim();
      }
      else {
        row.timeSpent = this.calculateSpentTime(row);
        this.updateEntry(row);
      }
    }

    if (cell == 'endTime') {
      let formatedDate = row.entryDate.substring(6, 10) + "-" + row.entryDate.substring(3, 5) + "-" + row.entryDate.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      row.endTime = event.target.value;
      if (!this.registryService.timeRequirement.test(row.endTime)) {
        row.endTime = cellValue.trim();
      }
      else if (moment(formatedDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
        let longEndDate = moment(formatedEndDate, 'YYYY-MM-DD').add(1, 'd');
        let validateFormatDate = moment(longEndDate).format('YYYY-MM-DD');
        row.endDateTime = validateFormatDate + ' ' + row.endTime;
        row.timeSpent = this.calculateSpentTime(row);
        this.updateEntry(row);
      }
      else {
        row.timeSpent = this.calculateSpentTime(row);
        this.updateEntry(row);
      }
    }
  }

  public updateEntry(row) {
    this.http.put(this.baseUrl + "/timeentries/" + row.id, {
      startDateTime: row.startDateTime.substring(0, 4) + "-" + row.startDateTime.substring(5, 7) + "-" + row.startDateTime.substring(8, 10) + " " + row.startTime,
      endDateTime: row.endDateTime.substring(0, 4) + "-" + row.endDateTime.substring(5, 7) + "-" + row.endDateTime.substring(8, 10) + " " + row.endTime,
      description: row.description,
      userprofileID: row.userprofileID,
      clientID: row.clientID,
      projectID: row.projectID,
      taskID: row.taskID,
      billable: row.isBillable
    }).subscribe(
      () => {
        this.registryService.sidebarComponent.loadEntries();
      });
  }

  selectEntry({ selected }) {
    if (selected) {
      this.selectedRow = selected[0];
    }
  }

  // Set the value of a selected entry to empty
  unselectEntry() {
    this.selected = [];
  }

  public calculateSpentTime(row) {
    let timeSpent: string;
    let timeSpentH: number;
    let timeSpentMin: number;
    let startTimeH: number = parseInt(row.startTime.substring(0, 2));
    let startTimeMin: number = parseInt(row.startTime.substring(3, 5));

    let endTimeH: number = parseInt(row.endTime.substring(0, 2));
    let endTimeMin: number = parseInt(row.endTime.substring(3, 5));
    if (endTimeMin >= startTimeMin) {
      timeSpentMin = endTimeMin - startTimeMin;
      timeSpentH = endTimeH - startTimeH;
    } else {
      timeSpentMin = endTimeMin - startTimeMin + 60;
      timeSpentH = endTimeH - startTimeH - 1;
    }

    if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
      timeSpent = '0' + timeSpentH + ':0' + timeSpentMin;
    }
    else if ((timeSpentH.toString()).length < 2) {
      timeSpent = '0' + timeSpentH + ':' + timeSpentMin;
    }
    else if ((timeSpentMin.toString()).length < 2) {
      timeSpent = timeSpentH + ':0' + timeSpentMin;
    } else {
      timeSpent = timeSpentH + ':' + timeSpentMin;
    }
    return timeSpent;
  }

  isSelected(row) {
    if (this.selectedRow != null && this.selectedRow.id == row.id) {
      return true;
    }
    return false;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateRowPosition() {
    let ix = this.getSelectedIx();
    let arr = [...this.rows];
    arr[ix - 1] = this.rows[ix];
    arr[ix] = this.rows[ix - 1];
    this.rows = arr;
  }

  getSelectedIx() {
    return this.selected[0]['$$index'];
  }

  public openDialog() {
    this.unselectEntry();
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.loadEntries();
        }
      });
  }

  public openDeleteDialog(row) {
    this.deleteEntryService
      .confirm('Delete', 'Are you sure you want to delete this entry?', this.viewContainerRef, row.id)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
         this.loadEntries();
        }
      });
  }

  loadEntries() {
    this.entriesService.entriesAreLoaded().then(results => {
      this.items = results;

      this.clients = this.entriesService.clients.sort(this.registryService.propComparator('clientName'));
      this.projects = this.entriesService.projects.sort(this.registryService.propComparator('projectName'));
      this.tasks = this.entriesService.tasks.sort(this.registryService.propComparator('taskDescription'));

      // Set itemTotalTimeSpent per default
      this.itemTotalTimeSpent = this.totalTimeSpent(this.items);

      // Set md-select true per default
      this.selectedProjects = this.projects.map(function (project) {
        return project.id;
      });
      this.selectedTasks = this.tasks.map(function (task) {
        return task.id;
      });
      this.selectedClients = this.clients.map(function (client) {
        return client.id;
      });
      this.mapEntryValue(this.items);
    });
  }

  // Set orange color of an entry over 1 day
  setColor(items) {
    items.forEach(function (entry) {
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

  // Map projectName, taskDescription, clientName and entryDate to row in rows
  private mapEntryValue(items) {
    items.forEach(function (entry) {
      entry.projectName = entry.project.projectName;
      entry.taskDescription = entry.task.taskDescription;
      entry.clientName = entry.client.clientName;
      entry.entryDate = entry.startDateTime.substring(8, 10) + "." + entry.startDateTime.substring(5, 7) + "." + entry.startDateTime.substring(0, 4);
      entry.startTime = entry.startDateTime.substring(11, 16);
      entry.endDate = entry.endDateTime.substring(8, 10) + "." + entry.endDateTime.substring(5, 7) + "." + entry.endDateTime.substring(0, 4);
      entry.endTime = entry.endDateTime.substring(11, 16);
    });
    this.entryTimeSPent(this.items);
    this.setColor(this.items);
  }

  // calculate timeSpent for each entry in items and format it correctly
  entryTimeSPent(items) {
    items.forEach(function (entry) {
      let ms = moment(entry.entryDate + ' ' + entry.startTime, "DD.MM.YYYY HH:mm").diff(moment(entry.endDate + ' ' + entry.endTime, "DD.MM.YYYY HH:mm"));
      let d = moment.duration(Math.abs(ms));
      let s = Math.floor(d.asHours()) + moment.utc(Math.abs(ms)).format(":mm");
      if (s.length < 5) {
        entry.timeSpent = '0' + s;
      }
      else {
        entry.timeSpent = s;
      }
    });
  }

  onPage(event) {
    this.count = this.items.length;
    this.items = this.entriesService.clonedItems;
    const start = event.offset * event.limit;
    const end = start + Number(event.limit);
    let rows = [];
    for (let i = start; i < end; i++) {
      rows[i] = this.items[i];
    }
    this.items = rows;
    this.items.length = this.count;
    this.offset = event.offset;
  }
}