import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../../data';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html'
})
export class UpdateDialogComponent implements OnInit {
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  public title: string;
  public rowID: number;
  public selectedDescription: string;
  public selectedProject: string;
  public selectedTask: string;
  @Input() selectedDate: any;
  @Input() selectedStartTime: any;
  public userprofileID: any;
  public projectID: any;
  public taskID: any;
  public selectedEndTime: any;
  public description: string;
  public startDateTime: string;
  public endDateTime: string;

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
    public timeTrackingEntryService: TimeTrackingEntryService) {
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

  updateEntry() {
    console.log(this.projectID, this.taskID, this.userprofileID);
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowID, this.startDateTime, this.endDateTime, this.description, this.userprofileID, this.projectID, this.taskID);
  }

  ngOnInit() {
    this.projectService.getProjects().then((projects) => {
    this.projects = projects;
    });
    this.taskService.getTasks().then((tasks) => {
    this.tasks = tasks;
    });
  }

  public ok() {
    this.projectID = Number(this.projectID);
    this.taskID = Number(this.taskID);
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowID, this.startDateTime, this.endDateTime, this.description, this.userprofileID, this.projectID, this.taskID)
      .then(() => {
        this.dialogRef.close(this);
      });
  }
}
