import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, ProjectService, TaskService, TimeTrackingEntryService, ClientService } from '../../../data';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { LoginService } from '../../../login';
import { environment } from '../../../../environments/environment';
import moment from 'moment/src/moment';
// import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';

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
  @Input() users: IUser[] = [];
  public isLoading: Boolean = false;
  public items: ITimeTrackingEntry[] = [];
  public clonedItems: ITimeTrackingEntry[] = [];
  rows = [];
  selected = [];
  projectsName = [];
  clientsName = [];
  currentProjectIDS = [];
  tasksDescription = [];
  selectedRow: any;
  cloneSelectedRow: any;
  timeTrackingEntry: ITimeTrackingEntry;
  editMode: boolean = false;
  rowID: number;
  userID: number;
  projectID: any;
  taskID: any;
  selectedDescription: string;
  count: number = 0;
  @Input() offset: number = 0;
  columns: any;
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

  constructor(
    public projectService: ProjectService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public taskService: TaskService,
    public clientService: ClientService,
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private updateDialogService: UpdateDialogService,
    private viewContainerRef: ViewContainerRef,
    private loginService: LoginService,
    public userService: UserService,
    private dialog: MdDialog,
    private http: Http) {
  }

  ngOnInit() {
    this.loadEntries();
  }

  changeRowLimits(event) {
    this.limit = event.target.value;
    this.offset = 0;
    this.loadEntries();
  }

  public projectDropdown(value: string): void {
    this.projectID = value;
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    if (cell == 'description') {
      row.description = event.target.value;
      this.ok(row);
    }
    if (cell == 'project') {
      this.projectService.getProject(event.target.value).then(res => {
        row.projectID = res.id;
        this.ok(row);
      });
    }
    if (cell == 'task') {
      this.taskService.getTask(event.target.value).then(res => {
        row.taskID = res.id;
        this.ok(row);
      });
    }
    if (cell == 'date') {
      row.entryDate = event.target.value;
      this.ok(row);
    }
    if (cell == 'startTime') {
      row.startTime = event.target.value;
      if (row.startTime > row.endTime || row.startTime == row.endTime) {
        row.startTime = cellValue;
        alert("Start time should be less than end time.");
      }
      else {
        // row.timeSpent = this.calculateTimeSpent(row);
        row.timeSpent = this.calculateSpentTime(row);
        this.ok(row);
      }
    }
    if (cell == 'endTime') {
      row.endTime = event.target.value;
      if (row.startTime > row.endTime || row.startTime == row.endTime) {
        row.endTime = cellValue;
        alert("Start time should be less than end time.");
      }
      else {
        // row.timeSpent = this.calculateTimeSpent(row);
        row.timeSpent = this.calculateSpentTime(row);
        this.ok(row);
      }
    }
  }

  // Try MomentJS to resolve this task
  // calculateTimeSpent(row) {
  //   row.timeSpent = null;
  //   let spentTimeH = moment(row.endTime, 'HH:mm').diff(moment(row.startTime, 'HH:mm'), 'Hours');
  //   let spentTimeM: any;
  //   if ((moment(row.endTime, 'HH:mm').diff(moment(row.startTime, 'HH:mm'), 'Minutes')) > 59) {
  //     spentTimeM = Math.abs(moment(row.startTime, 'HH:mm').diff(moment(row.endTime, 'HH:mm'), 'Minutes') + 60);
  //     console.log(spentTimeM);
  //   }
  //   else {
  //     spentTimeM = moment(row.endTime, 'HH:mm').diff(moment(row.startTime, 'HH:mm'), 'Minutes');
  //   }
  //   if ((spentTimeH.toString()).length < 2) {
  //     spentTimeH = '0' + spentTimeH;
  //   }
  //   if ((spentTimeM.toString()).length < 2) {
  //     spentTimeM = '0' + spentTimeM;
  //   }
  //   return spentTimeH + ':' + spentTimeM;
  // }

  onSelect({ selected }) {
    if (selected) {
      this.selectedRow = selected[0];
    }
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

  public ok(row) {
    this.timeTrackingEntryService.updateTimeTrackingEntry(row.id, row.entryDate, row.startTime, row.endTime, row.timeSpent, row.description, row.userprofileID, row.projectID, row.taskID);
  }

  isSelected(row) {
    if (this.selectedRow != null && this.selectedRow.id == row.id) {
      return true;
    }
    return false;
  }

  onDelete(row) {
    this.timeTrackingEntryService.deleteTimeTrackingEntry(row.id);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  discardChange() {
    this.selectedRow.description = this.cloneSelectedRow.description;
    this.toggleEditMode();
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
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.loadEntries();
        }
      });
  }

  public openUpdateDialog(row) {
    this.updateDialogService
      .confirm(this.viewContainerRef, row)
      // .afterClosed()
      .subscribe(res => {
        if (res) {
          // TODO : that's bad, replace the array with a dictionary or something !!!

          let description = res[0];
          let projectID = Number(res[1]);
          let taskID = Number(res[2]);
          let date = res[3];
          let starttime = res[4];
          let endtime = res[5];
          // let timespent = 

          this.projectService.getProject(projectID).then(res => {
            var selectedProject = res;

            this.items[row.$$index]['description'] = description;//this.result.description;
            this.items[row.$$index]['projectID'] = projectID; //this.result.projectID;
            this.items[row.$$index]['taskID'] = taskID; //this.result.taskID;
            this.items[row.$$index]['startTime'] = starttime;//this.result.startDateTime;
            this.items[row.$$index]['endTime'] = endtime;//this.result.endDateTime;

            this.loadEntries();
          });
          // TO DO
          this.timeTrackingEntryService.updateTimeTrackingEntry(row.id, date, starttime, endtime, row.timespent, row.description, row.userprofileid, Number(this.projectID), Number(this.taskID));
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
    this.fetch((data) => {
      //this.items = data;
    });
  }

  fetch(cb) {
    this.items = [];
    this.projectsName = [];
    this.tasksDescription = [];
    this.userID = this.loginService.getLoggedUserID();
    let url = this.baseUrl + '/timeentries/' + this.userID + '/entries';

    let clientName: string;
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      // Get all clients
      this.clientService.getClients().then(result => { this.clients = result; }),
        // Get all projects
        this.projectService.getProjects().then(result => { this.projects = result; }),
        // Get all tasks
        this.taskService.getTasks().then(result => { this.tasks = result; }),

        // Get user's entries
        this.userID = this.loginService.getLoggedUserID(),
        this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.userID).then((loadedItems) => {
          this.items = loadedItems;
          this.clonedItems = loadedItems;
          for (let item of this.items) {
            let currentProject = item.project;
            this.projectsName.push(currentProject.projectName);
            this.tasksDescription.push(item.task.taskDescription);
          }
        });
    };
    req.send();
  }

  onPage(event) {
    console.log('Page Event', event);
    this.count = this.items.length;
    this.items = this.clonedItems;;

    const start = event.offset * event.limit;
    const end = start + Number(event.limit);
    let rows = [];

    for (let i = start; i < end; i++) {
      rows[i] = this.items[i];
    }
    this.items = rows;
    this.items.length = this.count;
    console.log('Page Results', start, end, rows);
    this.offset = event.offset;
  }

  private getStatistics() {
    // TODO
    // this.statistics.totalAvailableVacationDays = 18;
    // this.statistics.totalHousWorkedMonth = 69;
    // this.statistics.totalHousWorkedWeek = 21;
  }

  public showSearchDialog() {
    // this.dialogRefSearch = this.dialog.open(SearchDialogComponent);

    // this.dialogRefSearch
    //   .afterClosed()
    //   .subscribe(result => {
    //     this.dialogRefSearch = null;
    //   });
  }

  public showExportDialog() {

  }

  public showVacationWorkedHoursDialog() {
  }
}