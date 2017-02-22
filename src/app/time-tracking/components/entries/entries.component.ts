import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../data';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { LoginService } from '../../../login';

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
  rowid: number;
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
    private updateEntryService: UpdateDialogService, 
    private viewContainerRef: ViewContainerRef,
    private loginService: LoginService) { }

  ngOnInit() { 
    this.projectService.getProjects().then((projects) => { this.projects = projects; 
  });
    this.taskService.getTasks().then((tasks) => { this.tasks = tasks; 
  });
  }
 
  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.items[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    this.selectedRow = selected[0]; 
    this.rowid = this.selectedRow.id;
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

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  discardChange(){
    this.selectedRow.description = this.cloneSelectedRow.description;
    this.toggleEditMode();
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

  public openDialog() {
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef)
      .subscribe(res => this.result = res);
  }

  public openUpdateDialog(row) {
    this.updateEntryService
      .confirm('Update Entry', this.viewContainerRef, row)
      .subscribe(res => this.result = res);
  }

  public openDeleteDialog(row) {
    this.deleteEntryService
      .confirm('Delete', 'Are you sure you want to delete this entry?', this.viewContainerRef, row.id)
      .subscribe(res => this.result = res);
  }
}