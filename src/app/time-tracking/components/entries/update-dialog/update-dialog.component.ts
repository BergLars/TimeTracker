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
  public selectedDescription: string;
  public selectedProject: string;
  public rowid: number;
  public selectedTask: string;
  public selectedDate: string;
  public selectedStartTime: string;
  public selectedEndTime: string;
  public description: string;

  public getNewDescription(value: string) {
    this.description = value;
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
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.rowid, this.description, this.selectedProject, this.selectedTask, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
   }

  ngOnInit() {
   this.projectService.getProjects().then((projects) => { this.projects = projects;
  });
    this.taskService.getTasks().then((tasks) => { this.tasks = tasks; 
  });
  }
}
