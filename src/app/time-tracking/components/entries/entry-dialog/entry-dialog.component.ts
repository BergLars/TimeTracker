import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdDatepickerModule, DateAdapter } from '@angular/material';
import { ITimeTrackingEntry, IClient, IProject, ITask, IUser, ProjectService, TaskService, TimeTrackingEntryService, UserService, ClientService } from '../../../../data';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import moment from 'moment/src/moment';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  @Input() projects: IProject[] = [];
  @Input() clients: IClient[] = [];
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
  public clientID: any;
  public projectID: any;
  public taskID: any;
  public entryDate: any;
  @Input() startTime: any;
  public endTime: any;
  public timeSpent: any;
  public tasksDictionary: any = {};
  public projectsDictionary: any = {};

  public isBillable: boolean = false;
  public enableTimes: boolean = false;
  @Input() date: any;
  @Input() checkBoxTimes: boolean;
  @Input() myFilter: any;
  public validTimePeriod: boolean;

  constructor(
    public dialogRef: MdDialogRef<EntryDialogComponent>,
    public clientService: ClientService,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public userService: UserService,
    private http: Http,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.loadItems();
    this.myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
    }
  }

  public checkIsBillable() {
    this.isBillable = !this.isBillable;
  }

  public checkEnableTimes() {
    this.enableTimes = !this.enableTimes;
  }

  public readDate(valueDate: any) {
    this.date = valueDate._selected;
  }

  public getValues(valueDesc: string, valueStartTime: string, valueEndTime: string, valueTimeSpent: string, valueClientID: string, valueProjectID: number, valueTaskID: number, valueEnableTimes: any, valueIsBillable: any) {
    this.description = valueDesc;
    this.startTime = valueStartTime;
    this.endTime = valueEndTime;
    this.timeSpent = valueTimeSpent;
    this.clientID = valueClientID;
    this.projectID = valueProjectID;
    this.taskID = valueTaskID;
    this.checkBoxTimes = valueEnableTimes._checked;
    this.isBillable = valueIsBillable._checked;

    let validDate = moment(this.date).format('L');
    this.entryDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
    this.validTimePeriod = moment(this.startTime, 'HH:mm').isBefore(moment(this.endTime, 'HH:mm'));
    console.log(this.entryDate, this.isBillable);
    // this.checkMandatoryFields();
  }

  public clientDropdown(value: string): void {
    this.clientID = value;
  }

  public projectDropdown(value: string): void {
    this.projectID = value;
  }

  public taskDropdown(value: string): void {
    this.taskID = value;
  }

  public checkMandatoryFields() {
    if (!this.enableTimes) {
      if (this.description === "" || this.clientID === null || this.projectID === null || this.taskID === null || this.timeSpent === "" || this.isBillable === null) {
        alert("Please check if all the fields are filled in");
      } else {
        this.startTime = moment().format('HH:mm');
        let endT = moment() + moment.duration().add(this.timeSpent, 'HH:mm');
        this.endTime = moment(endT).format('HH:mm');
        this.newEntry();
      }
    }
    else {
      if (this.description === "" || this.clientID === null || this.projectID === null || this.taskID === null || this.entryDate === " " || this.startTime === " " || this.endTime === " " || this.isBillable === null) {
        alert("Please check if all the fields are filled in");
      } else {
        this.timeSpent = this.calculateSpentTime();
        // this.checkStartAndEndTime();
      }
    }
  }

  public checkStartAndEndTime() {
    if (!this.validTimePeriod) {
      alert("Please enter a valid endtime.")
    } else {
      this.newEntry();
    }
  }

  public calculateSpentTime() {
    let timeSpent: string;
    let timeSpentH: number;
    let timeSpentMin: number;
    let startTimeH: number = parseInt(this.startTime.substring(0, 2));
    let startTimeMin: number = parseInt(this.startTime.substring(3, 5));

    let endTimeH: number = parseInt(this.endTime.substring(0, 2));
    let endTimeMin: number = parseInt(this.endTime.substring(3, 5));
    if (endTimeMin >= startTimeMin) {
      timeSpentMin = endTimeMin - startTimeMin;
      timeSpentH = endTimeH - startTimeH;
    } else {
      timeSpentMin = endTimeMin - startTimeMin + 60;
      timeSpentH = endTimeH - startTimeH - 1;
    }

    if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
      timeSpent = '0' + timeSpentH + ':0' + timeSpentMin;
    }
    else if ((timeSpentH.toString()).length < 2) {
      timeSpent = '0' + timeSpentH + ':' + timeSpentMin;
    }
    else if ((timeSpentMin.toString()).length < 2) {
      timeSpent = timeSpentH + ':0' + timeSpentMin;
    } else {
      timeSpent = timeSpentH + ':' + timeSpentMin;
    }
    return timeSpent;
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
        taskID: this.taskID,
        clientID: this.clientID, 
        projectID: this.projectID, 
        billable: this.isBillable 
      }).subscribe(
      (err) => {
        if (err.status === 400 || err.status === 404) {
          alert('Wrong date format or fill all filed !');
          return Observable.of(undefined);
        }
        if (err.status === 500) {
          alert('Internal server error !')
        }
      },
      () => {
        this.dialogRef.close(true);
        this.loadItems();
      })
  }

  private loadItems() {
    this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
        results => {
          this.clients = results;
        });

    this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
        results => {
          this.tasks = results;
        });

    this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
        results => {
          this.projects = results;
        });
  }
}