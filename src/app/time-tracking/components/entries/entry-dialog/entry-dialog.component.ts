import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITimeTrackingEntry, IClient, IProject, ITask, IUser, RegistryService, TimespentService } from '../../../../data';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import moment from 'moment/src/moment';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDatepickerModule, DateAdapter } from '@angular/material';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  private _mySelectedProject: any;
  private _mySelectedClient: any;
  private _mySelectedTask: any;
  public title: string;

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
  @Input() selectedProjectID: any;
  @Input() selectedTaskID: any;
  @Input() selectedClientID: any;
  @Input() startDate: any;
  @Input() startTime: any;
  public userprofileID: any;
  @Input() description: string;
  @Input() entryDate: any;
  @Input() endDate: any;
  @Input() endTime: any;
  @Input() isBillable: boolean;
  @Input() workTime: any;
  @Input() place: any;
  @Input() travelTime: any;
  @Input() inputSelectedDate: string;
  @Input() selectedStartTime: string;
  public user: IUser;

  public validTimePeriod: boolean;
  @Input() validDate: boolean = false;
  public validTimeSpentPeriod: boolean;

  constructor(
    public dialogRef: MdDialogRef<EntryDialogComponent>,
    private http: Http,
    public loginService: LoginService,
    private dateAdapter: DateAdapter<Date>,
    public registryService: RegistryService,
    public entriesService: EntriesService,
    public timeSpentService: TimespentService
  ) {
  }

  ngOnInit() {
    this.loadItems();
  }

  public checkIsBillable() {
    this.isBillable = !this.isBillable;
  }

  public readDate(valueDate: any, valueEndDate: any) {
    let validDate = moment(valueDate._selected).format('L');
    let validEndDate = moment(valueEndDate._selected).format('L');
    let currentDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
    let currentEndDate = validEndDate.substring(3, 5) + "." + validEndDate.substring(0, 2) + "." + validEndDate.substring(6, 10);
    this.startDate = currentDate;
    this.endDate = currentEndDate;
  }

  public checkMandatoryFields() {
    if (this.loginService.loggedIn()) {
      if ((this.startTime === "" && this.endTime === "") || (this.startTime === "00:00" && this.endTime === "00:00") || (this.startTime === undefined && this.endTime === undefined)) {
        this.startTime = "00:00";
        this.endTime = "00:00";
      } else {
        this.workTime = this.timeSpentService.calculateTimeSpent(this.startTime, this.endTime, this.startDate, this.endDate);
      }
      if (this.travelTime === "" || this.travelTime === undefined) {
        this.travelTime = "00:00";
      }
      this.newEntry();
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  public checkStartAndEndTime() {
    let endDate = this.startDate.substring(6, 10) + "-" + this.startDate.substring(3, 5) + "-" + this.startDate.substring(0, 2);
    if (this.endTime < this.startTime) {
      let entryEndDate = moment(endDate, 'YYYY-MM-DD').add(1, 'd');
      this.endDate = moment(entryEndDate).format('YYYY-MM-DD');
    } else {
      this.endDate = moment(endDate).format('YYYY-MM-DD');
    }
    this.newEntry();
  }



  public keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.readDate(this.startTime, this.endDate);
      this.checkMandatoryFields();

    }
  }

  public adjustEndDate() {
    if (this.startTime > this.endTime) {
      let endDate = this.startDate.substring(6, 10) + "-" + this.startDate.substring(3, 5) + "-" + this.startDate.substring(0, 2);
      let hours = Number(this.workTime.substring(0, 2)) + Number(this.startTime.substring(0, 2));
      let minutes = Number(this.workTime.substring(3, 6)) + Number(this.startTime.substring(3, 6));
      let hourFromMinutes = Math.floor(minutes / 60);
      let numberOfDays = Math.floor((hours + hourFromMinutes) / 24);
      let entryEndDate = moment(endDate, 'YYYY-MM-DD').add(numberOfDays, 'd');
      this.endDate = moment(entryEndDate).format('YYYY-MM-DD');
    } else {
      let endDate = this.startDate.substring(6, 10) + "-" + this.startDate.substring(3, 5) + "-" + this.startDate.substring(0, 2);
      this.endDate = moment(endDate).format('YYYY-MM-DD');
    }
  }

  public decimalToTime(t: any) {
    // t is a decimal validTimePeriodue
    if (this.isNumeric(t.toString()) === true) {
      if (t >= 0.1) {
        let decimalTime = parseFloat(t);
        decimalTime = decimalTime * 60 * 60;
        let hours: any = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        let minutes: any = Math.floor((decimalTime / 60));
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        this.workTime = hours + ":" + minutes;
        let endT = moment() + moment.duration().add(this.workTime, 'HH:mm');
        this.endTime = moment(endT).format('HH:mm');
        this.newEntry();
      } else {
        alert('Wrong time format !');
      }
    } else if (t.toString().indexOf(':') !== -1) {
      this.workTime = t;
      let endT = moment() + moment.duration().add(this.workTime, 'HH:mm');
      this.endTime = moment(endT).format('HH:mm');
      this.newEntry();
    } else {
      alert('Wrong time format !');
    }
  }

  private isNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
  }

  public newEntry() {
    return this.http.post(this.baseUrl + "/timeentries", {
      startDateTime: this.startDate.substring(6, 10) + "-" + this.startDate.substring(3, 5) + "-" + this.startDate.substring(0, 2) + " " + this.startTime,
      endDateTime: this.endDate.substring(6, 10) + "-" + this.endDate.substring(3, 5) + "-" + this.endDate.substring(0, 2) + " " + this.endTime,
      description: this.description.trim(),
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
          alert('Wrong date format or fill all field !');
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