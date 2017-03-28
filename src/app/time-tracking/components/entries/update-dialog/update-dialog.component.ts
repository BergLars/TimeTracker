import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../../data';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html'
})
export class UpdateDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  public title: string;
  public rowID: number;
  public selectedDescription: string;
  @Input() selectedProject: any;
  @Input() selectedTask: any;
  @Input() selectedDate: any;
  @Input() selectedStartTime: any;
  public userprofileID: any;
  @Input() projectID: any;
  @Input() taskID: any;
  public selectedEndTime: any;
  public description: string;
  public startDateTime: string;
  public endDateTime: string;
  userID: number;
  @Input() tempTaskID: number;
  @Input() tempProjectID: number;
  public items: ITimeTrackingEntry[] = [];
  public result: any;

  public projectDropdown(value: string): void {
    this.projectID = value;
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  public getNewDescription(value: string) {
    this.description = value;
  }

  public getNewStartDateTime(value: any, value1: any) {
    if (value === undefined || value1 === undefined) {
      this.startDateTime = this.selectedDate + " " + this.selectedStartTime;
    }
    else {
      this.selectedDate = value;
      this.selectedStartTime = value1;
      this.startDateTime = this.selectedDate + " " + this.selectedStartTime;
    }
    return this.startDateTime;
  }

  public getNewEndDateTime(value: any, value1: any) {
    if (value === undefined || value1 === undefined) {
      this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
    }
    else {
      this.selectedDate = value;
      this.selectedEndTime = value1;
      this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
    }
    return this.endDateTime;
  }

  constructor(
    public dialogRef: MdDialogRef<UpdateDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    private loginService: LoginService) {
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.startDateTime === " " || this.endDateTime === " ") {
      alert("Please check if all the fields are filled in");
    } else {
      this.checkStartAndEndTime();
    }
  }

  checkStartAndEndTime() {
    if (this.startDateTime > this.endDateTime || this.startDateTime == this.endDateTime) {
      alert("Please enter a valid endtime.")
    } else {
      this.ok();
    }
  }

  ngOnInit() {
    this.projectService.getProjects().then((projects) => {
      this.projects = projects;
    });
    this.taskService.getTasks().then((tasks) => {
      this.tasks = tasks;
    });
  }

  loadEntries() {
    this.fetch((data) => {
      this.items = data;
    });
  }

  fetch(cb) {
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
        this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.userID).then((items) => {
          this.items = items;
        });
    };
    req.send();
  }

public ok() {
    this.projectID = Number(this.projectID);
    this.taskID = Number(this.taskID);
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowID, this.startDateTime, this.endDateTime, this.description, this.userprofileID, this.projectID, this.taskID)
      .then(() => {
        this.dialogRef.close();
      });
  }
}
