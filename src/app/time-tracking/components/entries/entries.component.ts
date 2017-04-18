import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { LoginService } from '../../../login';
import { environment } from '../../../../environments/environment';
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
  public isLoading: Boolean = false;
  public items: ITimeTrackingEntry[] = [];

  rows = [];
  selected = [];
  selectedRow: any;
  cloneSelectedRow: any;
  timeTrackingEntry: ITimeTrackingEntry;
  editMode: boolean = false;
  rowID: number;
  userID: number;
  selectedDescription: string;
  selectedProject: string;
  selectedTask: string;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  count: number = 0;
  @Input() offset: number = 0;
  columns: any;
  @Input() date: string;

  public editing = {};
  public result: any;
  // private dialogRefSearch: MdDialogRef<SearchDialogComponent>;
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
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private updateDialogService: UpdateDialogService,
    private viewContainerRef: ViewContainerRef,
    private loginService: LoginService,
    private dialog: MdDialog,
    private http: Http) {
    //this.loadEntries();
  }

  ngOnInit() {
    this.loadEntries();
  }

  changeRowLimits(event) {
    this.limit = event.target.value;
    this.offset = 0;
    this.loadEntries();
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    console.log(cell);
    console.log(event.target.value);
    if (cell == 'project') {
      row.projectName = event.target.value;
    }
    else if (cell == 'task') {
      row.taskDescription = event.target.value;
    }
    else if (cell == 'date') {
      row.startDate = event.target.value;
    }
    else if (cell == 'startTime') {
      row.startDate = event.target.value;
    }
    else if (cell == 'endTime') {
      row.endDate = event.target.value;
    }
    else {
      this.items[row.$$index][cell] = event.target.value;
    }
    // this.loadEntries();
    console.log(this.items[row.$$index][cell]);
    console.log(cell);
    console.log(row.entryDate);
    console.log(this.selectedTask);
    console.log(row.projectID);
  }

  onSelect({ selected }) {
    // this.selectedRow = selected[0];
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
      .confirm('Update Entry', this.viewContainerRef, row)
      .afterClosed()
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
    this.userID = this.loginService.getLoggedUserID();
    let url = this.baseUrl + '/timeentries/' + this.userID + '/entries';
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
    // Get all projects
    this.projectService.getProjects().then(result => { this.projects = result; }),

    // Get all tasks
    this.taskService.getTasks().then(result => { this.tasks = result; }),

    // Get user's entries
    this.userID = this.loginService.getLoggedUserID(),
    this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.userID).then((loadedItems) => {
      this.items = loadedItems;
      //this.items = items;
    });
    };
    req.send();
  }

  page(offset, limit) {
    this.fetch((results) => {
      this.count = results.length;

      const start = offset * limit;
      const end = start + limit;
      const rows = [...this.rows];

      for (let i = start; i < end; i++) {
        rows[i] = results[i];
      }

      this.rows = rows;
      console.log('Page Results', start, end, rows);
    });
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
    this.offset = event.offset;
  }

  // public openDialogTest(row) {
  //   let config = new MdDialogConfig();
  //   config.data = row;
  //   let dialogRef = this.dialog.open(UpdateDialogComponent);
  // }

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