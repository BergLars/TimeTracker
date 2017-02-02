import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() items: ITimeTrackingEntry[] = [];
  @Input() projects: IProject[] = [];
  @Input() project: IProject;
  @Input() tasks: ITask[] = [];
  @Input() task: ITask;

  rows = [];
  selected = [];
  selectedRow: any;
  cloneSelectedRow: any;
  timeTrackingEntry: ITimeTrackingEntry;
  editMode: boolean = false;
  selectedDescription: string;
  selectedProject: string;
  selectedTask: string;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;

  public editing = {};
  public result: any;

  constructor(
    public projectService: ProjectService, 
    public timeTrackingEntryService: TimeTrackingEntryService, 
    public taskService: TaskService, 
    private entryDialogService: EntryDialogService, 
    private deleteEntryService: DeleteEntryService, 
    private viewContainerRef: ViewContainerRef) { }

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

  public openDialog(row) {
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef, row)
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
    this.selectedDescription = this.selectedRow.description;
    this.selectedProject = this.selectedRow.projectName();
    this.selectedTask = this.selectedRow.taskDescription();
    this.selectedDate = this.selectedRow.date();
    this.selectedStartTime = this.selectedRow.startTime();
    this.selectedEndTime = this.selectedRow.endTime();
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
    // this.toggleEditMode();
    console.log("Cloned selected Row", this.cloneSelectedRow);
    this.timeTrackingEntryService.updateTimeTrackingEntry(this.selectedRow.id, this.selectedDescription, this.selectedProject, this.selectedTask, this.selectedDate, this.selectedStartTime, this.selectedEndTime);
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

  public openUpdateDialog(row) {
    this.entryDialogService
      .confirm('Update Entry', this.viewContainerRef, row)
      .subscribe(res => this.result = res);
      console.log(row.projectName());
  }

  public openDeleteDialog(row) {
    this.deleteEntryService
      .confirm('Delete', 'Are you sure you want to delete this entry?', this.viewContainerRef, row.id)
      .subscribe(res => this.result = res);
  }
}