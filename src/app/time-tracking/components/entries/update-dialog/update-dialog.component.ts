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
  public rowid: number;
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

  public getDescription(value: string) {
    this.description = value;
  }

  public getStartDateTime(value: any, value1: any) {
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

  public getEndDateTime(value: any, value1: any) {
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

  updateEntry() {
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowid, this.startDateTime, this.endDateTime, this.description, this.userprofileID, this.projectID, this.taskID);
  }

  ngOnInit() {
    this.projectService.getProjects().then((projects) => {
      this.projects = projects;
    });
    this.taskService.getTasks().then((tasks) => {
      this.tasks = tasks;
    });
  }
}
