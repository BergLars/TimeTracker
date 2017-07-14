import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IUser, ProjectService, TaskService, TimeTrackingEntryService, UserService } from '../../../../data';
import { LoginService } from '../../../../login';
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  public title: string;
  public description: string;
  public selectedProjectID: string;
  public rowid: number;
  public selectedTaskID: string;
  @Input() selectedDate: string;
  @Input() selectedStartTime: string;
  public user: IUser;
  public selectedEndTime: any;
  public userprofileID: any;
  public projectID: any;
  public taskID: any;
  public entryDate: any;
  public startTime: any;
  public endTime: any;
  public timeSpent: any;
  private selDate: IMyDate;
    public tasksDictionary: any = {};
  public projectsDictionary: any = {};

  constructor(
    public dialogRef: MdDialogRef<EntryDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public userService: UserService,
    private http: Http,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.selDate = event.date;
    console.log(event.date);
  }

  public getValues(valueDesc: string, valueDate: string, valueStartTime: string, valueEndTime: string, valueTimeSpent: string, valueProjectID: number, valueTaskID: number) {
    this.description = valueDesc;
    this.entryDate = valueDate;
    this.startTime = valueStartTime;
    this.endTime = valueEndTime;
    this.timeSpent = valueTimeSpent;
    this.projectID = valueProjectID;
    this.taskID = valueTaskID;
  }

  public projectDropdown(value: string): void {
    this.projectID = value;
    this.taskService.getTasksByProject(+this.projectID).then((tasks) => {
      this.tasks = tasks;
    });
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.entryDate === " " || this.startTime === " ") {
      alert("Please check if all the fields are filled in");
    } else {
      this.checkStartAndEndTime();
    }
  }

  checkStartAndEndTime() {
    if (this.startTime > this.endTime || this.startTime == this.endTime) {
      alert("Please enter a valid endtime.")
    } else {
      this.newEntry();
    }
  }

  public newEntry() {
    this.loadItems();
    return this.http.post(this.baseUrl + "/timeentries", 
      { entryDate: this.entryDate, 
        startTime: this.startTime, 
        endTime: this.endTime, 
        timeSpent: this.timeSpent, 
        description: this.description, 
        userprofileID: this.loginService.getLoggedUserID(), 
        taskID: this.taskID 
      }).subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private loadItems() {
    let that = this;
    this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
      results => {
        this.projects = results; 

        results.forEach(function(result) {
          that.projectsDictionary[result.id] = result;
        });
         // We build the dictionary of tasks
        this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
          results => {
            this.tasks = results;
            
            results.forEach(function(result){
              that.tasksDictionary[result.id] = result;
            });

            this.tasks.forEach(function(task){
              task.project = that.projectsDictionary[task.projectID];
            });
          });
      });
  }
}