import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { EntryDialogComponent } from './entry-dialog/entry-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() items: ITimeTrackingEntry[] = [];
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];

  rows = [];
  selected = [];
  selectedRow: any;
  cloneSelectedRow: any;
  timeTrackingEntry: ITimeTrackingEntry;
  editMode: boolean = false;

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

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    this.selectedRow = selected[0];
    console.log("Selected Row", this.selectedRow);
  }

  isSelected(row){
    if(this.selectedRow != null && this.selectedRow.id == row.id){
      return true;
    }
    return false;
  }

  onDelete(row){
    this.timeTrackingEntryService.deleteTimeTrackingEntry(row.id);
  }

  onUpdate(row){
    this.cloneSelectedRow  = Object.assign({}, this.selectedRow);
    this.toggleEditMode();
    console.log("Cloned selected Row", this.cloneSelectedRow);
    // this.timeTrackingEntryService.deleteTimeTrackingEntry(row.id);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  discardChange(){
    this.selectedRow.description = this.cloneSelectedRow.description;
    this.toggleEditMode();
    console.log(this.cloneSelectedRow);
  }

  updateRowPosition() {
    let ix = this.getSelectedIx();
    let arr = [ ...this.rows ];
    arr[ix - 1] = this.rows[ix];
    arr[ix] = this.rows[ix - 1];
    this.rows = arr;
  }

  getSelectedIx() {
    return this.selected[0]['$$index'];
  }
}