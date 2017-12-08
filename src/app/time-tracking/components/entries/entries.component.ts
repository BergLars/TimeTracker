import { Component, Input, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, RegistryService, TimespentService } from '../../../data';
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
    private elementRef: ElementRef,
    private timespentService: TimespentService) {
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
    this.timespentService.mapEntryValue(this.items);
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
      let formatedStartDate = event.target.value.substring(6, 10) + "-" + event.target.value.substring(3, 5) + "-" + event.target.value.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      if (event.target.value === "") {
        row.entryDate = selectedDate;
      }
      else {
        if (!this.registryService.dateRequirement.test(event.target.value.trim())) {
          alert('Wrong date format !');
        }
        else if (moment(formatedStartDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
          let longEndDate = moment(formatedEndDate, 'YYYY-MM-DD').add(1, 'd');
          let validateFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');
          row.startDateTime = formatedStartDate + ' ' + row.startTime;
          row.endDateTime = validateFormatEndDate + ' ' + row.endTime;
          this.updateEntry(row);
        }
        else {
          row.startDateTime = formatedStartDate + ' ' + row.startTime;
          let numberOfDate = Number(event.target.value.substring(0, 2)) - Math.abs(Number(row.entryDate.substring(0, 2)));
          let endT = moment(row.startTime, 'HH:mm') + moment.duration().add(row.timeSpent, 'HH:mm');
          row.endTime = moment(endT).format('HH:mm');
          let validateFormatEndDate = moment(row.endDateTime).add(numberOfDate, 'days');
          validateFormatEndDate = moment(validateFormatEndDate).format('YYYY-MM-DD');
          row.endDateTime = validateFormatEndDate + ' ' + row.endTime;
          this.updateEntry(row);
        }
      }
      this.registryService.sidebarComponent.displaySidebarData();
    }

    if (cell == 'startTime') {
      row.startTime = event.target.value;
      if (!this.registryService.timeRequirement.test(row.startTime)) {
        row.startTime = cellValue.trim();
      }
      else {
        row.timeSpent = this.timespentService.calculateInlineFieldTimeSpent(row);
        this.updateEntry(row);
      }
      this.registryService.sidebarComponent.displaySidebarData();
    }

    if (cell == 'endTime') {
      let formatedStartDate = row.entryDate.substring(6, 10) + "-" + row.entryDate.substring(3, 5) + "-" + row.entryDate.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      row.endTime = event.target.value;
      if (!this.registryService.timeRequirement.test(row.endTime)) {
        row.endTime = cellValue.trim();
      }
      else if (moment(formatedStartDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
        let longEndDate = moment(formatedEndDate, 'YYYY-MM-DD').add(1, 'd');
        let validateFormatDate = moment(longEndDate).format('YYYY-MM-DD');
        row.endDateTime = validateFormatDate + ' ' + row.endTime;
        row.timeSpent = this.timespentService.calculateInlineFieldTimeSpent(row);
        this.updateEntry(row);
      }
      else {
        row.timeSpent = this.timespentService.calculateInlineFieldTimeSpent(row);
        this.updateEntry(row);
      }
    }

    if (cell == 'timeSpent') {
      if (!this.registryService.timeSpentRequirement.test(event.target.value) || row.timeSpent === event.target.value) {
        row.timeSpent = cellValue.trim();
      }
      else {
        let decimalTime = parseFloat(moment.duration(event.target.value).asHours());
        let decimalStartTime = parseFloat(moment.duration(row.startTime).asHours());
        let totalDecimalEndTime = Number(decimalTime + decimalStartTime);
        totalDecimalEndTime = totalDecimalEndTime * 60 * 60;
        let hours: any = Math.floor((totalDecimalEndTime / (60 * 60)));
        totalDecimalEndTime = totalDecimalEndTime - (hours * 60 * 60);
        let minutes: any = Math.floor((totalDecimalEndTime / 60));

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        let numberOfDays = Math.floor(hours / 24);
        let hoursEndTime = hours % 24;

        let longEndDate = moment(row.startDateTime, 'YYYY-MM-DD').add(numberOfDays, 'd');
        let validFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');
        let validFormatStartDate = moment(row.startDateTime).format('YYYY-MM-DD');
        if (hoursEndTime < 10) {
          hours = "0" + hoursEndTime;
        }
        else {
          hours = hoursEndTime;
        }
        let endTime = hours + ':' + minutes;
        if (moment(row.startDateTime, 'YYYY-MM-DD').isBefore(moment(row.endDateTime, 'YYYY-MM-DD')) && moment(row.startTime, 'HH:mm').isBefore(moment(row.endTime, 'HH:mm'))) {
          row.timeSpent = event.target.value;
          row.endDateTime = validFormatStartDate + ' ' + endTime;
          row.endTime = moment(row.endDateTime).format('HH:mm');
          this.registryService.sidebarComponent.displaySidebarData();
          this.updateEntry(row);
        }
        else {
          row.timeSpent = event.target.value;
          row.startDateTime = row.startDateTime;
          row.endDateTime = validFormatEndDate + ' ' + endTime;
          row.endTime = moment(row.endDateTime).format('HH:mm');
          row.endDate = validFormatEndDate.substring(8, 10) + '.' + validFormatEndDate.substring(5, 7) + '.' + validFormatEndDate.substring(0, 4);
          this.registryService.sidebarComponent.displaySidebarData();
          this.updateEntry(row);
        }
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
        this.loadEntries();
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
          this.registryService.sidebarComponent.displaySidebarData();
        }
      });
  }

  loadEntries() {
    this.entriesService.entriesAreLoaded().then(results => {
      this.items = results;

      this.clients = this.entriesService.clients.sort(this.registryService.propComparator('clientName'));
      this.projects = this.entriesService.projects.sort(this.registryService.propComparator('projectName'));
      this.tasks = this.entriesService.tasks.sort(this.registryService.propComparator('taskDescription'));

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
      this.timespentService.mapEntryValueToSetColor(this.items);
      this.itemTotalTimeSpent = this.timespentService.itemTotalTimeSpent;
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