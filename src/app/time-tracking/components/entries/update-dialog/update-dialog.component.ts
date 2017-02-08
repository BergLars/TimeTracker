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
  public selectedDate: string;
  public selectedStartTime: string;
  public selectedEndTime: string;
  public description: string;
  public project: string;
  public task: string;
  public date: string;
  public startTime: string;
  public endTime: string;

  public getNewDescription(value: string) {
    this.description = value;
  }

  public getNewStartTime(value: string) {
    this.startTime = value;
  }

  public getNewEndTime(value: string) {
    this.endTime = value;
  }
   
  public getNewDate(value: string) {
    this.date = value;
  }

  constructor(
    public dialogRef: MdDialogRef<UpdateDialogComponent>,
    public projectService: ProjectService, 
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService) { 
  }

  onUpdate(){

  }

  updateEntry(){
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowid, this.description, this.selectedProject, this.selectedTask, this.date, this.startTime, this.endTime);
   }

  ngOnInit() {
   this.projectService.getProjects().then((projects) => { this.projects = projects;
  });
    this.taskService.getTasks().then((tasks) => { this.tasks = tasks; 
  });
  }
}
