import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() items: ITimeTrackingEntry[] = [];
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];

  public editing = {};

  constructor(public projectService: ProjectService, public timeTrackingEntryService: TimeTrackingEntryService, public taskService: TaskService) { }

  ngOnInit() { 
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

  private newEntry() {
    // this.items.push(
    //   new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    // );
  }
}