import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { LoginService } from '../../../login';
// import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() projects: IProject[] = [];
  @Input() project: IProject;
  @Input() tasks: ITask[] = [];
  @Input() task: ITask;
  public isLoading: Boolean = false;
  public items: ITimeTrackingEntry[] = [];
  @Input() rowSize: number = undefined;

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
  // limits: number[];

  public editing = {};
  public result: any;
  // private dialogRefSearch: MdDialogRef<SearchDialogComponent>;
  private list = [
    { id: this.rowSize, name: 'Default' },
    { id: 5, name: 'Five' },
    { id: 10, name: 'Ten' }
  ];

  constructor(
    public projectService: ProjectService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public taskService: TaskService,
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private updateDialogService: UpdateDialogService,
    private viewContainerRef: ViewContainerRef,
    private loginService: LoginService,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.loadEntries();
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.items[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    this.selectedRow = selected[0];
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
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.loadEntries();
        }
        this.items[row.$$index]['description'] = this.result.description;
        this.items[row.$$index]['projectID'] = this.result.projectID;
        //this.items[row.$$index]['taskID'] = this.result.taskID;
        this.items[row.$$index]['startDate'] = this.result.startDateTime;
        this.items[row.$$index]['endDate'] = this.result.endDateTime;
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

  private loadEntries() {
    this.isLoading = false;
    console.log(this.rowSize);
    Promise.all([
      // Get all projects
      this.projectService.getProjects().then(result => { this.projects = result; }),

      // Get all tasks
      this.taskService.getTasks().then(result => { this.tasks = result; }),

      this.userID = this.loginService.getLoggedUserID(),
      this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.userID).then((items) => {
        this.items = items;
      }).then(result => {
        this.getStatistics();
      })
        .catch(error => {
          this.isLoading = false;
        })
    ]);
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