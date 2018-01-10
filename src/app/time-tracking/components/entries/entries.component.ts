import { Component, Input, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, RegistryService, TimespentService } from '../../../data';
import { MdDialog } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { environment } from '../../../../environments/environment';
import moment from 'moment/src/moment';
import { EntriesService } from './entries.service';
import { elementAt } from 'rxjs/operator/elementAt';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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

  @ViewChild('mydatatable') datatable: DatatableComponent;

  @Input() items: ITimeTrackingEntry[] = [];
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

  private columns = [
    { key: 'Description', id: 0 },
    { key: 'Project Name', id: 1 },
    { key: 'Client Name', id: 2 },
    { key: 'Task Description', id: 3 },
    { key: 'Entry Date', id: 4 },
    { key: 'Start Time', id: 5 },
    { key: 'End Date', id: 6 },
    { key: 'End Time', id: 7 },
    { key: 'Time Spent', id: 8 }
  ];
  private limits = [
    { key: 'All Entries', value: 50 },
    { key: '10 Entries', value: 10 },
    { key: '5 Entries', value: 5 }
  ];
  private sorts = [
    { key: 'Desc', id: 0 },
    { key: 'Asc', id: 1 }
  ];
  public createItems = [
    { key: 'None', id: 1 },
    { key: 'Client', id: 2 },
    { key: 'Project', id: 3 },
    { key: 'Task', id: 4 }
  ];
  @Input() limit: number;
  item: number = this.createItems[0].id;

  public defaultItem: any;
  @Input() selectedClients: any;
  @Input() selectedProjects: any;
  @Input() selectedTasks: any;

  @Input() selectedColumn: any;
  @Input() selectedSort: any;
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

  updateFilterSelection() {
    this.refreshDatatable();
  }

  updateSortingSelection() {
    this.refreshDatatable();
  }

  changeRowLimits(event) {
    this.datatable.offset = 0;
    this.limit = Number(event.target.value);
    this.refreshDatatable();
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
      let formatedStartDate = row.entryDate.substring(6, 10) + "-" + row.entryDate.substring(3, 5) + "-" + row.entryDate.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      row.startTime = event.target.value.trim();
      if (!this.registryService.timeRequirement.test(event.target.value.trim()) || moment(formatedStartDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
        row.startTime = cellValue.trim();
      }
      else if (moment(formatedStartDate, 'YYYY-MM-DD').isBefore(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
        this.updateEntry(row);
      }
      else {
        this.updateEntry(row);
      }
      this.registryService.sidebarComponent.displaySidebarData();
    }

    if (cell == 'endTime') {
      let formatedStartDate = row.entryDate.substring(6, 10) + "-" + row.entryDate.substring(3, 5) + "-" + row.entryDate.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      row.endTime = event.target.value.trim();
      if (!this.registryService.timeRequirement.test(event.target.value.trim())) {
        row.endTime = cellValue;
      }
      else if (moment(formatedStartDate, 'YYYY-MM-DD').isSame(moment(formatedEndDate, 'YYYY-MM-DD')) && moment(row.endTime, 'HH:mm').isBefore(moment(row.startTime, 'HH:mm'))) {
        let longEndDate = moment(formatedEndDate, 'YYYY-MM-DD').add(1, 'd');
        let validateFormatDate = moment(longEndDate).format('YYYY-MM-DD');
        row.endDateTime = validateFormatDate + ' ' + row.endTime;
        this.updateEntry(row);
      }
      else {
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
        let longEndDate = moment(row.startDateTime, 'YYYY-MM-DD HH:mm').add(numberOfDays, 'd');
        let validFormatEndDate = moment(longEndDate).format('YYYY-MM-DD');
        if (hoursEndTime < 10) {
          hours = "0" + hoursEndTime;
        }
        else {
          hours = hoursEndTime;
        }
        let endTime = hours + ':' + minutes;
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

  openDialog() {
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

  openDeleteDialog(row) {
    this.deleteEntryService
      .confirm('Delete', 'Are you sure that you want to delete this entry?', this.viewContainerRef, row.id)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.loadEntries();
        }
      });
  }

  private refreshDatatable() {
    let self = this;

    // Take in acount the filtering
    this.entriesService.setFilteringBy({
      clients: this.selectedClients,
      projects: this.selectedProjects,
      tasks: this.selectedTasks
    });

    // Take in acount the sorting
    this.entriesService.setSortingBy({
      column: this.columns[this.selectedColumn].key,
      direction: this.sorts[this.selectedSort].key
    });

    self.items = this.entriesService.getEntries();
    setTimeout(() => {
      self.datatable.pageSize = self.limit;
    }, 10);
  }

  /**
  * Load entries per default
  */
  loadEntries() {
    // Set column per default
    this.selectedColumn = this.columns[4].id;
    // Set direction per default
    this.selectedSort = this.sorts[0].id;
    // Set limit per default
    this.limit = this.limits[0].value;

    this.entriesService.entriesAreLoaded().then(() => {
      this.clients = this.entriesService.sortedClients();
      this.projects = this.entriesService.sortedProjects();
      this.tasks = this.entriesService.sortedTasks();

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
      this.refreshDatatable();
    });
  }
}