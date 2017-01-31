import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EntryDialogService } from '../entry-dialog/entry-dialog.service';

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
  public result: any;

  constructor(
    public projectService: ProjectService, 
    public timeTrackingEntryService: TimeTrackingEntryService, 
    public taskService: TaskService, 
    private entryDialogService: EntryDialogService, 
    private viewContainerRef: ViewContainerRef) { }

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

  public openDialog() {
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef)
      .subscribe(res => this.result = res);
  }
}