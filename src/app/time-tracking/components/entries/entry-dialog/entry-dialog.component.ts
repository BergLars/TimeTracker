import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IUser, ProjectService, TaskService, TimeTrackingEntryService, UserService } from '../../../../data';
import { LoginService } from '../../../../login';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
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
  public startDateTime: any;
  public endDateTime: any;
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
    this.projectService.getProjects().then((projects) => {
      this.projects = projects;
    });
    this.taskService.getTasks().then((tasks) => {
      this.tasks = tasks;
    });
  }

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        disableWeekends: true,
    };

    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
          this.selDate = event.date;
          console.log(event.date);
    }


  public getDescription(value: string) {
    this.description = value;
  }

  public getStartDateTime(value: string, value1: string) {
    this.selectedDate = value;
    this.selectedStartTime = value1;
    this.startDateTime = this.selectedDate + " " + this.selectedStartTime;
    return this.startDateTime;
  }

  public getEndDateTime(value: string, value1: string) {
    if (value === null && value1 === null) {
      this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
    }
    else {
      this.selectedDate = value;
      this.selectedEndTime = value1;
      this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
    }
    return this.endDateTime;
  }

  public projectDropdown(value: string): void {
    this.projectID = value;
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.startDateTime === " " || this.endDateTime === " ") {
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

  public ok() {
    this.timeTrackingEntryService
      .createTimeTrackingEntry(this.startDateTime, this.endDateTime, this.description, this.loginService.getLoggedUserID(), this.projectID, this.taskID)
      .then(() => {
        this.dialogRef.close(true);
    });
  }
}