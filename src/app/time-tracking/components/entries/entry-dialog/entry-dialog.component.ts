import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../../data';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
	@Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
	public title: string;
  public selectedDescription: string;
  public selectedProjectID: string;
  public rowid: number;
  public selectedTaskID: string;
  @Input() selectedDate: string;
  @Input() selectedStartTime: string;
  public selectedEndTime: any;
  public description: string;
  public startDateTime: any;
  public endDateTime: any;

  constructor(
  	public dialogRef: MdDialogRef<EntryDialogComponent>,
  	public projectService: ProjectService, 
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService) { 
  }

  ngOnInit() {
   this.projectService.getProjects().then((projects) => { this.projects = projects;
  });
    this.taskService.getTasks().then((tasks) => { this.tasks = tasks; 
  });
  }

  public getNewDescription(value: string) {
    this.description = value;
    console.log(this.description);
  }
  public getNewTask(value: string) {
    this.description = value;
    console.log(this.description);
  }
  public getNewProject(value: string) {
    this.description = value;
    console.log(this.description);
  }

  public getNewStartDateTime(value: string, value1: string){
    console.log(this.selectedDate);
    console.log(this.selectedStartTime);
    console.log(this.selectedEndTime);
    this.selectedDate = value;
    this.selectedStartTime = value1;
    this.startDateTime = this.selectedDate + " " + this.selectedStartTime;
    console.log(this.startDateTime);
    return this.startDateTime;
  }

  public getNewEndDateTime(value: string, value1: string){
    if(value === null && value1 === null){
      this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
    }
    else{
      this.selectedDate = value;
      this.selectedEndTime = value1;
    this.endDateTime = this.selectedDate + " " + this.selectedEndTime;
  }

    console.log(this.endDateTime);
    return this.endDateTime;
  }

  createEntry(){
       this.timeTrackingEntryService.createTimeTrackingEntry(this.startDateTime, this.endDateTime, this.description, 3, 1, 1);
    // this.userprofileID, this.projectID, this.taskID);
  }
}