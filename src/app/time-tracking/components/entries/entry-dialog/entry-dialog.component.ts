import { Component, OnInit, Input } from '@angular/core';
import { IClient, IProject, ITask, IUser, RegistryService, TimespentService, DatesService } from '../../../../data';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import moment from 'moment/src/moment';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, DateAdapter } from '@angular/material';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  private _mySelectedProject: number;
  private _mySelectedClient: any;
  private _mySelectedTask: any;
  public title: string;
  model: any = {};

  @Input() projects: IProject[] = [];
  @Input() clients: IClient[] = [];
  @Input() tasks: ITask[] = [];

  get selectedProject(): number {
    return this._mySelectedProject;
  }

  @Input()
  set selectedProject(id: number) {
    this._mySelectedProject = id;
  }

  get selectedClient(): number {
    return this._mySelectedClient;
  }

  @Input()
  set selectedClient(id: number) {
    this._mySelectedClient = id;
  }

  get selectedTask(): number {
    return this._mySelectedTask;
  }

  @Input()
  set selectedTask(id: number) {
    this._mySelectedTask = id;
  }

  public rowID: number;
  public userprofileID: any;
  @Input() place: string;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() startTime: any;
  @Input() endTime: any;
  @Input() travelTime: any;
  @Input() workTime: any;
  @Input() isBillable: boolean = false;
  public user: IUser;
  private description: string;
  public defaultTimeValue: String = "00:00";

  public validTimePeriod: boolean = false;
  @Input() validDate: boolean = false;
  public validDatePeriod: boolean;
  public isSameDate: boolean;

  constructor(
    public dialogRef: MdDialogRef<EntryDialogComponent>,
    private http: Http,
    public loginService: LoginService,
    private dateAdapter: DateAdapter<Date>,
    public registryService: RegistryService,
    public entriesService: EntriesService,
    public timeSpentService: TimespentService,
    public datesService: DatesService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  public checkIsBillable() {
    this.isBillable = !this.isBillable;
  }

  public ok() {
    this.fromDate = moment(this.model.startdate.toISOString()).format('YYYY-MM-DD');
    this.toDate = moment(this.model.enddate.toISOString()).format('YYYY-MM-DD');
    this.validDatePeriod = this.datesService.isValidDatePeriod(this.fromDate, this.toDate);
    this.description = this.model.description;
    this.place = this.model.place;
    this.startTime = this.model.startTime;
    this.endTime = this.model.endTime;
    this.travelTime = this.model.travelTime;
    this.workTime = this.model.workTime;
    this.isBillable = this.model.isBillable;
    this.isSameDate = this.datesService.isSameDate(this.fromDate, this.toDate);
    this.validTimePeriod = this.timeSpentService.isValidTimePeriod(this.startTime, this.endTime, this.isSameDate);
    this.checkMandatoryFields();
  }

  public checkMandatoryFields() {
    if (this.loginService.loggedIn()) {
      if (this.selectedProject === undefined || this.selectedClient === undefined || this.selectedTask === undefined) {
        alert("Please check if all fields are filled in");
      } else if (this.validDatePeriod === false) {
        alert("Invalid date period!");
      } else if (((this.workTime === undefined && (this.startTime === undefined || this.endTime === undefined))) === true) {
        alert("Check if woktime or start and end time are filled!");
      } else {
        if (this.travelTime === undefined) {
          this.travelTime = this.defaultTimeValue;
        } if (this.registryService.timeSpentRequirement.test(this.travelTime) === false) {
          alert('Wrong travel time format');
        } if (this.startTime === undefined || this.endTime === undefined || this.startTime === this.defaultTimeValue || this.endTime === this.defaultTimeValue) {
          if (this.startTime === undefined || this.endTime == undefined) {
            this.startTime = this.defaultTimeValue;
            this.endTime = this.defaultTimeValue; 
          }
          return this.registryService.timeSpentRequirement.test(this.workTime) === false ? alert('Wrong work time format') : this.createEntryWithWorkTime();
        } if (this.workTime === undefined ) {
          if (this.validTimePeriod) {
            return (this.registryService.timeRequirement.test(this.startTime) && this.registryService.timeRequirement.test(this.endTime)) === false ? 
                  alert('Wrong start or end time format') : this.createEntryWithStartAndEndTime();  
          } else {
            alert("Wrong start or end time format");
          }          
        } else {
          var r = confirm('Clicking on OK you will take the worktime value');
          if (r === true) {
            this.createEntryWithWorkTime();
          } else {
            this.createEntryWithStartAndEndTime();
          }
        }
      }
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  createEntryWithStartAndEndTime() {
    let formatedStartDateTime = this.fromDate + " " + this.startTime;
    let formatedEndDateTime = this.toDate + " " + this.endTime;

    this.workTime = this.timeSpentService.calculateWorktimeBetweenDates(formatedStartDateTime, formatedEndDateTime);
    return this.newEntry();
  }

  createEntryWithWorkTime() {
    this.workTime = this.workTime;
    return this.newEntry();
  }

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.checkMandatoryFields();
    }
  }

  private isNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
  }

  public newEntry() {
    return this.http.post(this.baseUrl + "/timeentries", {
      startDateTime: this.fromDate+ " " + this.startTime,
      endDateTime: this.toDate + " " + this.endTime,
      description: this.description,
      userprofileID: this.loginService.getLoggedUserID(),
      taskID: this.selectedTask,
      clientID: this.selectedClient,
      projectID: this.selectedProject,
      billable: this.isBillable,
      traveltime: this.travelTime,
      place: this.place,
      worktime: this.workTime
    }).subscribe(
      () => {
        this.dialogRef.close(true);
        this.registryService.entriesComponent.offset = 0;
        this.entriesService.displaySidebarData();
      },
      (err) => {
        if (err.status === 400 || err.status === 404) {
          alert('Check if all fields are filled in!');
          return Observable.of(undefined);
        }
        if (err.status === 500) {
          alert('Internal server error !')
        }
      });
  }

  private loadItems() {
    if (this.loginService.loggedIn()) {
      this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
        results => {
          this.clients = results.sort(this.entriesService.propComparator('clientName'));
        });

      this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
        results => {
          this.tasks = results.sort(this.entriesService.propComparator('taskDescription'));
        });

      this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
        results => {
          this.projects = results.sort(this.entriesService.propComparator('projectName'));
        });
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }
}