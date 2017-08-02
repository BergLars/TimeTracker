import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, TaskService, ProjectService, TimeTrackingEntryService, ClientService } from '../../../data';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { LoginService } from '../../../login';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import moment from 'moment/src/moment';
import { EntriesService } from './entries.service';
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
  selectedRow: any;
  cloneSelectedRow: any;
  timeTrackingEntry: ITimeTrackingEntry;
  editMode: boolean = false;
  rowID: number;
  userID: number;
  clientID: any;
  projectID: any;
  taskID: any;
  isBillable: boolean;
  selectedDescription: string;
  count: number = 0;
  @Input() offset: number = 0;
  columns: any;
  @Input() date: string;

  public tasksDictionary: any = {};
  public projectsDictionary: any = {};
  public clientsDictionary: any = {};

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
    private http: Http,
    private router: Router,
    public entriesService: EntriesService) {
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
      this.updateEntry(row);
    }

    if (cell == 'client') {
      // row.client.clientName = event.target.value;
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
      let selectedDate = event.target.value.substring(8, 10) + "." + event.target.value.substring(5, 7) + "." + event.target.value.substring(0, 4);
      row.entryDate = selectedDate;
      this.updateEntry(row);
    }

    if (cell == 'startTime') {
      row.startTime = event.target.value;
      if (row.startTime > row.endTime || row.startTime == row.endTime) {
        row.startTime = cellValue;
        alert("Start time should be less than end time.");
      }
      else {
        row.timeSpent = this.calculateSpentTime(row);
        this.updateEntry(row);
      }
    }

    if (cell == 'endTime') {
      row.endTime = event.target.value;
      if (row.startTime > row.endTime || row.startTime == row.endTime) {
        row.endTime = cellValue;
        alert("Start time should be less than end time.");
      }
      else {
        row.timeSpent = this.calculateSpentTime(row);
        this.updateEntry(row);
      }
    }
  }

  public updateEntry(row) {
    this.http.put(this.baseUrl + "/timeentries/" + row.id, {
      entryDate: row.entryDate, 
      startTime: row.startTime,
      endTime: row.endTime, 
      timeSpent: row.timeSpent,
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

  isSelected(row) {
    if (this.selectedRow != null && this.selectedRow.id == row.id) {
      return true;
    }
    return false;
  }

  onDelete(row) {
    this.timeTrackingEntryService.deleteTimeTrackingEntry(row.id);
      this.loadEntries();
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

  // public openUpdateDialog(row) {
  //   this.updateDialogService
  //     .confirm(this.viewContainerRef, row)
  //     // .afterClosed()
  //     .subscribe(res => {
  //       if (res) {
  //         // TODO : that's bad, replace the array with a dictionary or something !!!

  //         let description = res[0];
  //         let projectID = Number(res[1]);
  //         let taskID = Number(res[2]);
  //         let date = res[3];
  //         let starttime = res[4];
  //         let endtime = res[5];
  //         // let timespent = 

  //         this.projectService.getProject(projectID).then(res => {
  //           var selectedProject = res;

  //           this.items[row.$$index]['description'] = description;//this.result.description;
  //           this.items[row.$$index]['projectID'] = projectID; //this.result.projectID;
  //           this.items[row.$$index]['taskID'] = taskID; //this.result.taskID;
  //           this.items[row.$$index]['startTime'] = starttime;//this.result.startDateTime;
  //           this.items[row.$$index]['endTime'] = endtime;//this.result.endDateTime;

  //           this.loadEntries();
  //         });
  //         // TO DO
  //         this.timeTrackingEntryService.updateTimeTrackingEntry(row.id, date, starttime, endtime, row.timespent, row.description, row.userprofileid, Number(this.taskID));
  //       }
  //     });
  // }

  public openDeleteDialog(row) {
    console.log(row.project.projectName, row.id);
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
    this.items = [];
    this.userID = this.loginService.getLoggedUserID();

    let that = this;

    this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
      results => {
        this.clients = results; 

        results.forEach(function(result) {
          that.clientsDictionary[result.id] = result;
        });

        this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
          results => {
            this.projects = results; 

            results.forEach(function(result) {
              that.projectsDictionary[result.id] = result;
            });

             // We build the dictionary of tasks
            this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
              results => {
                this.tasks = results;
                
                results.forEach(function(result){
                  that.tasksDictionary[result.id] = result;
                });

                this.http.get(this.baseUrl + "/timeentries").map(res => res.json()).subscribe(
                  loadedEntries => {
                    let that = this;

                    loadedEntries.forEach(function(entry){
                      entry.task = that.tasksDictionary[entry.taskID];
                      entry.client = that.clientsDictionary[entry.clientID];
                      entry.project = that.projectsDictionary[entry.projectID];
                      that.items.push(entry);
                    });
                  });
              }); 
          });
      });
  }

  onPage(event) {
    console.log('Page Event', event);
    /*this.count = this.items.length;
    this.items = this.clonedItems;;
    const start = event.offset * event.limit;
    const end = start + Number(event.limit);
    let rows = [];
    for (let i = start; i < end; i++) {
      rows[i] = this.items[i];
    }
    // this.items = rows;
    this.items.length = this.count;
    console.log('Page Results', start, end, rows);
    this.offset = event.offset;*/
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