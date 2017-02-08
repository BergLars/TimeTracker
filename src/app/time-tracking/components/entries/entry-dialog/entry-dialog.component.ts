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
  public selectedProjectName: string;
  public selectedTaskDescription: string;
  public selectedDate: string;
  public selectedStartTime: string;
  public selectedEndTime: string;


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

  onUpdate(){
  // this.timeTrackingEntryService.updateTimeTrackingEntry(row.id, row.description, row.projectID.getProjectName(), row.taskID.getTaskDecription(), row.startDate.substring(0,10), row.startDate.substring(11,16), row.endDate.substring(11,16));
  }
}
