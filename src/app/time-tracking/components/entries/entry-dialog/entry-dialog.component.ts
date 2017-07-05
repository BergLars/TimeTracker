import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IUser, ProjectService, TaskService, TimeTrackingEntryService, UserService } from '../../../../data';
import { LoginService } from '../../../../login';
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  public title: string;
  public description: string;
  public selectedProjectID: string;
  public rowid: number;
  public selectedTaskID: string;
  @Input() selectedDate: string;
  @Input() selectedStartTime: string;
  public user: IUser;
  public selectedEndTime: any;
  public userprofileID: any;
  public projectID: any;
  public taskID: any;
  public entryDate: any;
  public startTime: any;
  public endTime: any;
  public timeSpent: any;
  private selDate: IMyDate;

  constructor(
    public dialogRef: MdDialogRef<EntryDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public userService: UserService,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.selDate = event.date;
    console.log(event.date);
  }

  public getValues(valueDesc: string, valueDate: string, valueStartTime: string, valueEndTime: string, valueTimeSpent: string, valueProjectID: number, valueTaskID: number) {
    this.description = valueDesc;
    this.entryDate = valueDate;
    this.startTime = valueStartTime;
    this.endTime = valueEndTime;
    this.timeSpent = valueTimeSpent;
    this.projectID = valueProjectID;
    this.taskID = valueTaskID;
  }

  public projectDropdown(value: string): void {
    this.projectID = value;
    this.taskService.getTasksByProject(+this.projectID).then((tasks) => {
      this.tasks = tasks;
    });
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.entryDate === " " || this.startTime === " ") {
      alert("Please check if all the fields are filled in");
    } else {
      this.checkStartAndEndTime();
    }
  }

  checkStartAndEndTime() {
    if (this.startTime > this.endTime || this.startTime == this.endTime) {
      alert("Please enter a valid endtime.")
    } else {
      this.newEntry();
    }
  }

  public newEntry() {
    this.loadItems();
    this.timeTrackingEntryService
      .createTimeTrackingEntry(this.entryDate, this.startTime, this.endTime, this.timeSpent, this.description, this.loginService.getLoggedUserID(), this.taskID)
      .then((data) => {
        this.dialogRef.close(true);
      });
  }

  private loadItems() {
    this.projectService.getProjects().then((projects) => {
      this.projects = projects;
    });
    
    this.taskService.getTasks().then(result => {
      this.tasks = result;
    });

    this.taskService.getTasksByProject(this.projectID).then((tasks) => {
      this.tasks = tasks;
    });
  }
}