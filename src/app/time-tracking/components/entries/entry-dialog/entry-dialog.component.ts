import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITimeTrackingEntry, IClient, IProject, ITask, IUser, RegistryService } from '../../../../data';
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
    console.log(this.endTime);
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
    public entriesService: EntriesService
  ) {
  }

  ngOnInit() {
    this.loadItems();
  }

  public checkIsBillable() {
    this.isBillable = !this.isBillable;
  }

  public checkEnableTimes() {
    // this.enableTimes = !this.enableTimes;
  }

  public readDate(valueDate: any) {
    if (valueDate._selected) {
      let validDate = moment(valueDate._selected).format('L');
      let currentDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
      this.startDate = currentDate;
    }
  }

  public readDateOnInputField() {
    if (this.registryService.dateRequirement.test(this.inputSelectedDate)) {
      this.validDate = true;
      this.startDate = this.inputSelectedDate;
    } else {
      this.validDate = false;
    }
  }

  public checkMandatoryFields() {
    if (this.startDate === undefined) {
      this.startDate = this.inputSelectedDate;
    } else {
      this.inputSelectedDate = this.startDate;
    }
    if (this.loginService.loggedIn()) {
      // if (!this.enableTimes) {
      //   if (this.description === "" || this.clientID === null || this.selectedDate === undefined || this.inputSelectedDate === undefined || this.timeSpent === null || this.isBillable === null) {
      //     alert("Please check if all the fields are filled in");
      //   } else if (this.validDate === false) {
      //     alert('Wrong date format!');
      //   } else {
      //     this.startTime = moment().format('HH:mm');
      //     this.decimalToTime(this.workTime);
      //   }
      // } else {
        if (this.description === "" || this.startDate === undefined || this.startTime === " " || this.endTime === " " || this.isBillable === null) {
          alert("Please check if all the fields are filled in");
        }
        else if (!this.registryService.timeRequirement.test(this.startTime) || !this.registryService.timeRequirement.test(this.endTime)) {
          alert('Wrong time format!');
        } else {
          this.checkStartAndEndTime();
          this.workTime = this.calculateTimeSpent();
        }
      // }
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

  public calculateTimeSpent() {
    let timeSpent: string;
    let timeSpentH: number;
    let timeSpentMin: number;
    let startTimeH: number = parseInt(this.startTime.substring(0, 2));
    let startTimeMin: number = parseInt(this.startTime.substring(3, 5));

    let endTimeH: number = parseInt(this.endTime.substring(0, 2));
    let endTimeMin: number = parseInt(this.endTime.substring(3, 5));
    if (this.validTimePeriod) {
      if (endTimeMin >= startTimeMin) {
        timeSpentMin = endTimeMin - startTimeMin;
        timeSpentH = endTimeH - startTimeH;
      } else {
        timeSpentMin = endTimeMin - startTimeMin + 60;
        timeSpentH = endTimeH - startTimeH - 1;
      }

      if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
        timeSpent = '0' + timeSpentH + ':0' + timeSpentMin;
      } else if ((timeSpentH.toString()).length < 2) {
        timeSpent = '0' + timeSpentH + ':' + timeSpentMin;
      } else if ((timeSpentMin.toString()).length < 2) {
        timeSpent = timeSpentH + ':0' + timeSpentMin;
      } else {
        timeSpent = timeSpentH + ':' + timeSpentMin;
      }
    } else {
      if (endTimeMin < startTimeMin) {
        timeSpentMin = (endTimeMin + 60) - startTimeMin;
        timeSpentH = (endTimeH + 23) - startTimeH;
      } else if (endTimeMin === startTimeMin) {
        timeSpentMin = endTimeMin - startTimeMin;
        timeSpentH = (endTimeH + 24) - startTimeH;
      } else {
        timeSpentH = ((endTimeH + 24) - startTimeH);
        timeSpentMin = endTimeMin - startTimeMin;
      } if ((timeSpentH.toString()).length < 2 && (timeSpentMin.toString()).length < 2) {
        timeSpent = '0' + timeSpentH + ':0' + timeSpentMin;
      } else if ((timeSpentH.toString()).length < 2) {
        timeSpent = '0' + timeSpentH + ':' + timeSpentMin;
      } else if ((timeSpentMin.toString()).length < 2) {
        timeSpent = timeSpentH + ':0' + timeSpentMin;
      } else {
        timeSpent = timeSpentH + ':' + timeSpentMin;
      }
    }
    return timeSpent;
  }

  public keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.readDateOnInputField();
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
    // t is a decimal value
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

        this.adjustEndDate();
        this.newEntry();
      } else {
        alert('Wrong time format !');
      }
    } else if (t.toString().indexOf(':') !== -1) {
      this.workTime = t;
      let endT = moment() + moment.duration().add(this.workTime, 'HH:mm');
      this.endTime = moment(endT).format('HH:mm');
      this.adjustEndDate();
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
      endDateTime: this.endDate+ " " + this.endTime,
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