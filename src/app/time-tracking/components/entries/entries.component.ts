import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { TimeTrackingEntry, Project, Task, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() items: TimeTrackingEntry[] = [];
  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = [];

  public editing = {};

  constructor(public projectService: ProjectService, public timeTrackingEntryService: TimeTrackingEntryService, public taskService: TaskService) { }

  ngOnInit() { 
    this.projectService.getProjects().then((projects) => { this.projects = projects; 
  });
    this.timeTrackingEntryService.getTimeTrackingEntries().then((items) => { this.items = items; 
  });
    this.taskService.getTasks().then((tasks) => { this.tasks = tasks; 
  });
  }
 
  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.items[row.$$index][cell] = event.target.value;
    console.log(row, cell, cellValue);
  }

  public getProjectName(projectID: number) {
    
  }

  private newEntry() {
    // this.items.push(
    //   new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    // );
  }
}