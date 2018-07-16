import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, ITimeTrackingEntry, IProject, ITask, IClient, RegistryService, TimespentService } from '../../../data';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { environment } from '../../../../environments/environment';
import moment from 'moment/src/moment';
import { EntriesService } from './entries.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import { sprintf } from 'sprintf-js';
import { LoginService } from '../../../login';

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
  @Input() allEntries: ITimeTrackingEntry[] = [];
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

  private previousAllProjectsFilterFlag = true;
  private previousAllTasksFilterFlag = true;
  private previousAllClientsFilterFlag = true;


  private columns = [
    { key: 'Description', id: 0 },
    { key: 'Project Name', id: 1 },
    { key: 'Client Name', id: 2 },
    { key: 'Task Description', id: 3 },
    { key: 'Entry Date', id: 4 },
    { key: 'Time Spent', id: 5 }
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
  private billables = [
    { key: 'Billable', id: 0 },
    { key: 'Not billable', id: 1 }
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
  @Input() selectedClients: any = [];
  @Input() selectedProjects: any = [];
  @Input() selectedTasks: any = [];

  @Input() selectedColumn: any;
  @Input() selectedSort: any;
  @Input() selectedBillable: any;
  @Input() term: any;
  isValid: boolean = false;
  isChecked = false;

  @Input() isAdmin: boolean = false;
  @Input() selectedUser: any;
  @Input() users: IUser[] = [];
  public sscanf = require('scanf');


  constructor(
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private viewContainerRef: ViewContainerRef,
    private http: Http,
    public registryService: RegistryService,
    public updateService: UpdateDialogService,
    public entriesService: EntriesService,
    public loginService: LoginService,
    private timespentService: TimespentService) {
    this.registryService.entriesComponent = this;
  }

  ngOnInit() {
    this.loadValuePerdefault();
    this.defaultItem = this.createItems[0].key;
    this.isAdmin = this.loginService.isAdmin();
    this.isAdmin ? this.loadAllEntries() : this.loadMyEntries();
    this.updateFilterSelection();
    this.entriesService.getCurrentDayWeekMonth();
    this.getUsers();
  }

  getSearchValue(term: string) {
    this.term = term;
    let exp = '.';

    if (this.term === '') {
      this.isChecked = true;
      this.loadEntries();
    }
    else {
      if (_.includes(this.term, exp)) {
        let day, month, year;
        day = this.term.substring(0, 2);
        let date = this.sscanf(this.term, '%d.%d.%d');
        if (day === '09') {
          day = '9';
          date[0] = day;
        }
        else {
          day = date[0];
        }
        month = date[1];
        year = date[2];
        this.term = sprintf('%d-%02d-%02d', year, month, day);
        this.loadSearched(this.term);
      }
      this.loadSearched(this.term);
    }
  }

  loadSearched(term) {
    this.entriesService.searchBy(term).then(() => {
      this.refreshDatatable();
    });
  }

  setSelectFocus(event, row, cell, value) {
    this.editing[row.$$index + cell] = true;
    let element = event.target;
    let parentElement = element.parentElement;
    setTimeout(() => {
      let parentElementTag = parentElement.getElementsByTagName(value)[0];
      parentElementTag.focus();
    }, 100);
  }

  clickOnFirstChild(event, row, cell) {
    this.editing[row.$$index + cell] = true;
    setTimeout(() => {
      let parentElementTag = document.getElementById(row.cellValue + row.$$index);
      parentElementTag.focus();
    }, 100);
  }

  removeSelectFocus(row, cell) {
    setTimeout(() => {
      this.editing[row.$$index + cell] = false;
      this.unselectEntry();
    }, 100);
  }

  getUsers() {
    if (this.loginService.loggedIn()) {
      this.http.get(this.baseUrl + "/userprofile/all").map(res => res.json()).subscribe(
        results => {
          this.users = results;
        });
    } else {
      alert("Your token has expired. Please log in again!");
    }
  }

  updateFilterSelection() {
    this.projectsSelectedPerDefault();
    this.tasksSelectedPerDefault();
    this.clientsSelectedPerDefault();
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
      if (event.target.value === cellValue) {
        row.description = cellValue;
      }
      else {
        row.description = (event.target.value).trim();
        this.updateEntry(row);
      }
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
      let formatedStartDate = event.target.value.substring(6, 10) + "-" + event.target.value.substring(3, 5) + "-" + event.target.value.substring(0, 2);
      let formatedEndDate = row.endDate.substring(6, 10) + "-" + row.endDate.substring(3, 5) + "-" + row.endDate.substring(0, 2);
      if (event.target.value === "") {
        row.entryDate = cellValue;
      }
      if (event.target.value === cellValue) {
        row.entryDate = cellValue;
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
          this.entriesService.displaySidebarData();
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
          this.entriesService.displaySidebarData();
        }
      }
    }

    if (cell == 'timeSpent') {
      if (!this.registryService.timeSpentRequirement.test(event.target.value) || row.timeSpent === event.target.value) {
        row.timeSpent = cellValue.trim();
      }
      else {
        this.timespentService.calculateEntryTimeSpent(event, cell, cellValue, row);
        var hourWorkTime = 0;
        hourWorkTime += +row.worktime.value.substring(0, 2)
        if (hourWorkTime < 0) {
          row.timeSpent = cellValue;
        }
        else {
          this.updateEntry(row);
          this.entriesService.displaySidebarData();
        }
      }
    }
  }

  updateEntry(row) {
    this.http.put(this.baseUrl + "/timeentries/" + row.id, {
      startDateTime: row.startDateTime.substring(0, 4) + "-" + row.startDateTime.substring(5, 7) + "-" + row.startDateTime.substring(8, 10) + " " + row.startTime,
      endDateTime: row.endDateTime.substring(0, 4) + "-" + row.endDateTime.substring(5, 7) + "-" + row.endDateTime.substring(8, 10) + " " + row.endTime,
      description: row.description,
      userprofileID: row.userprofileID,
      clientID: row.clientID,
      projectID: row.projectID,
      taskID: row.taskID,
      traveltime: row.traveltime.value,
      worktime: row.worktime.value,
      billable: row.isBillable
    }).subscribe(
      () => {
        this.isChecked = true;
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
          this.isChecked = true;
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
          this.isChecked = true;
          this.loadEntries();
          this.entriesService.displaySidebarData();
        }
      });
  }

  openEditDialog(row) {
    this.updateService
      .confirm(this.viewContainerRef, row, this.projects, this.tasks, this.clients)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.isChecked = true;
          this.loadEntries();
          this.entriesService.displaySidebarData();
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
    this.selectedBillable = -1;

    setTimeout(() => {
      self.datatable.pageSize = self.limit;
    }, 10);
  }

  loadValuePerdefault() {
    // Set column per default
    this.selectedColumn = this.columns[4].id;
    // Set direction per default
    this.selectedSort = this.sorts[0].id;
    // Set limit per default
    this.limit = this.limits[0].value;
  }

  /**
   * Load entries per default
   */
  loadEntries() {
    return this.isAdmin ? this.loadAllEntries() : this.loadMyEntries();
  }

  loadAllEntries() {
    this.entriesService.allEntriesAreLoaded().then(() => {
      this.clients = this.entriesService.sortedClients();
      this.projects = this.entriesService.sortedProjects();
      this.tasks = this.entriesService.sortedTasks();
      this.selectedProjects[0] = -1;
      this.selectedTasks[0] = -1;
      this.selectedClients[0] = -1;
      this.selectedUser = -1;
      this.selectedBillable = -1;

      if (!this.isChecked) {
        this.projectsSelectedPerDefault();
        this.tasksSelectedPerDefault();
        this.clientsSelectedPerDefault();
      }
      this.allEntries = EntriesService.clonedEntries;
      this.refreshDatatable();
    });
  }

  loadMyEntries() {
    this.entriesService.entriesAreLoaded().then(() => {
      this.clients = this.entriesService.sortedClients();
      this.projects = this.entriesService.sortedProjects();
      this.tasks = this.entriesService.sortedTasks();
      this.selectedProjects[0] = -1;
      this.selectedTasks[0] = -1;
      this.selectedClients[0] = -1;
      this.selectedBillable = -1;
      this.selectedUser = this.loginService.getLoggedUserID();

      if (!this.isChecked) {
        this.projectsSelectedPerDefault();
        this.tasksSelectedPerDefault();
        this.clientsSelectedPerDefault();
      }
      this.allEntries = EntriesService.clonedEntries;
      this.refreshDatatable();
    });
  }

  displayEntriesByUser() {
    this.items = this.loadUserEntriesById(this.selectedUser);
    EntriesService.clonedEntries = this.items;
    this.refreshDatatable();
    this.entriesService.displaySidebarData();
  }

  displayEntriesByBillable() {
    var billableEntries: ITimeTrackingEntry[] = [];
    var notBillableEntries: ITimeTrackingEntry[] = [];
    this.items = EntriesService.clonedEntries;
    this.items.forEach(element => {
      if (element.billable === false) {
        notBillableEntries.push(element);
      }
      else {
        billableEntries.push(element);
      }
    });
    if (this.selectedBillable === 0) {
      this.items = billableEntries;
    }
    else if (this.selectedBillable === 1) {
      this.items = notBillableEntries;
    }
    else {
      this.items = EntriesService.clonedEntries;
    }
  }

  loadUserEntriesById(id) {
    var entries: ITimeTrackingEntry[] = [];
    EntriesService.clonedEntries = this.allEntries;
    if (id === -1) {
      entries = _.map(EntriesService.clonedEntries, _.clone);
      this.items = entries;
    }
    else {
      this.allEntries.forEach(element => {
        if (element.userprofileID === id) {
          entries.push(element);
        }
      });
      this.items = entries;
    }
    return this.items;
  }

  projectsSelectedPerDefault() {

    var allProjectsFilterFlag = this.selectedProjects[0] === -1;
    let selectedProjects = [];

    selectedProjects = this.projects.map(function (project) {
      return project.id;
    });

    if (this.previousAllProjectsFilterFlag < allProjectsFilterFlag) {
      this.selectedProjects = [-1].concat(selectedProjects);
      this.previousAllProjectsFilterFlag = allProjectsFilterFlag;
      this.refreshDatatable();
      return;
    }

    if (this.previousAllProjectsFilterFlag > allProjectsFilterFlag) {
      this.previousAllProjectsFilterFlag = allProjectsFilterFlag;
      this.selectedProjects = [];
      this.refreshDatatable();
      return;
    }

    if (this.selectedProjects.length === (this.projects.length - (allProjectsFilterFlag ? 1 : 0))) {
      this.selectedProjects = [-1].concat(selectedProjects);
      allProjectsFilterFlag = true;
    } else {
      if (allProjectsFilterFlag) this.selectedProjects = this.selectedProjects.slice(1);
      allProjectsFilterFlag = false;
    }
    this.previousAllProjectsFilterFlag = allProjectsFilterFlag;
    this.refreshDatatable();
  }

  tasksSelectedPerDefault() {

    var allTasksFilterFlag = this.selectedTasks[0] === -1;
    let selectedTasks = [];

    selectedTasks = this.tasks.map(function (task) {
      return task.id;
    });

    if (this.previousAllTasksFilterFlag < allTasksFilterFlag) {
      this.selectedTasks = [-1].concat(selectedTasks);
      this.previousAllTasksFilterFlag = allTasksFilterFlag;
      this.refreshDatatable();
      return;
    }

    if (this.previousAllTasksFilterFlag > allTasksFilterFlag) {
      this.previousAllTasksFilterFlag = allTasksFilterFlag;
      this.selectedTasks = [];
      this.refreshDatatable();
      return;
    }

    if (this.selectedTasks.length === (this.tasks.length - (allTasksFilterFlag ? 1 : 0))) {
      this.selectedTasks = [-1].concat(selectedTasks);
      allTasksFilterFlag = true;
    } else {
      if (allTasksFilterFlag) this.selectedTasks = this.selectedTasks.slice(1);
      allTasksFilterFlag = false;
    }
    this.previousAllTasksFilterFlag = allTasksFilterFlag;
    this.refreshDatatable();
  }

  clientsSelectedPerDefault() {
    var allClientsFilterFlag = this.selectedClients[0] === -1;
    let selectedClients = [];


    selectedClients = this.clients.map(function (client) {
      return client.id;
    });

    if (this.previousAllClientsFilterFlag < allClientsFilterFlag) {
      this.selectedClients = [-1].concat(selectedClients);
      this.previousAllClientsFilterFlag = allClientsFilterFlag;
      this.refreshDatatable();
      return;
    }

    if (this.previousAllClientsFilterFlag > allClientsFilterFlag) {
      this.previousAllClientsFilterFlag = allClientsFilterFlag;
      this.selectedClients = [];
      this.refreshDatatable();
      return;
    }

    if (this.selectedClients.length === (this.clients.length - (allClientsFilterFlag ? 1 : 0))) {
      this.selectedClients = [-1].concat(selectedClients);
      allClientsFilterFlag = true;
    } else {
      if (allClientsFilterFlag) this.selectedClients = this.selectedClients.slice(1);
      allClientsFilterFlag = false;
    }

    this.previousAllClientsFilterFlag = allClientsFilterFlag;
    this.refreshDatatable();
  }

  datatableKeyDown(event, cell, cellValue, row) {
    if (event.key == 'Enter') {
      this.updateValue(event, cell, cellValue, row);
    }
  }
  searchKeyDown(event) {
    if (event.key == 'Enter') {
      this.getSearchValue(event.target.value);
    }
  }
}