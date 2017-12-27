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
  @Input() projects: IProject[] = [];
  @Input() clients: IClient[] = [];
  @Input() tasks: ITask[] = [];
  public title: string;
  public description: string;
  public selectedTaskID: string;
  @Input() selectedDate: string;
  @Input() inputSelectedDate: string;
  @Input() selectedStartTime: string;
  public user: IUser;
  public userprofileID: any;
  public clientID: any;
  public projectID: any;
  public taskID: any;
  public entryDate: any;
  public entryEndDate: any;
  @Input() startTime: any;
  @Input() endTime: any;
  public timeSpent: any;
  public isBillable: boolean = false;
  public enableTimes: boolean = false;
  @Input() checkBoxTimes: boolean;
  @Input() myFilter: any;
  public validTimePeriod: boolean;
  @Input() validDate: boolean = false;
  public validTimeSpentPeriod: boolean;
  @Input() today = new FormControl(new Date());


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
    this.enableTimes = !this.enableTimes;
  }

  public readDate(valueDate: any) {
    if (valueDate._selected) {
      let validDate = moment(valueDate._selected).format('L');
      let currentDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
      this.selectedDate = currentDate;
    }
  }

  public getValues(valueDesc: string, valueDate: any, valueInputDate: any, valueStartTime: string, valueEndTime: string, valueTimeSpent: string, valueClientID: string, valueProjectID: number, valueTaskID: number, valueEnableTimes: any, valueIsBillable: any) {
    this.description = valueDesc;
    this.selectedDate = valueDate;
    this.inputSelectedDate = valueInputDate;
    this.startTime = valueStartTime;
    this.endTime = valueEndTime;
    this.timeSpent = valueTimeSpent;
    this.clientID = valueClientID;
    this.projectID = valueProjectID;
    this.taskID = valueTaskID;
    this.checkBoxTimes = valueEnableTimes.checked;
    this.isBillable = valueIsBillable.checked;
    this.validTimePeriod = moment(this.startTime, 'HH:mm').isBefore(moment(this.endTime, 'HH:mm'));
    this.validTimeSpentPeriod = moment(this.timeSpent, 'HH:mm').isBefore(moment("23:59", 'HH:mm'));

  }

  public readDateOnInputField() {
    if (this.registryService.dateRequirement.test(this.inputSelectedDate)) {
      this.validDate = true;
      this.selectedDate = this.inputSelectedDate;
    } else {
      this.validDate = false;
    }
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
    if (this.selectedDate === undefined) {
      this.selectedDate = this.inputSelectedDate;
    } else {
      this.inputSelectedDate = this.selectedDate;
    }
    if (this.loginService.loggedIn()) {
      if (!this.enableTimes) {
        if (this.description === "" || this.clientID === null || this.selectedDate === undefined || this.inputSelectedDate === undefined || this.timeSpent === null || this.isBillable === null) {
          alert("Please check if all the fields are filled in");
        } else if (this.validDate === false) {
          alert('Wrong date format!');
        } else {
          this.startTime = moment().format('HH:mm');
          this.decimalToTime(this.timeSpent);
        }
      } else {
        if (this.description === "" || this.selectedDate === undefined || this.startTime === " " || this.endTime === " " || this.isBillable === null) {
          alert("Please check if all the fields are filled in");
        } else {
          this.timeSpent = this.calculateTimeSpent();
          this.checkStartAndEndTime();
        }
      }
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  public checkStartAndEndTime() {
      let endDate = this.selectedDate.substring(6, 10) + "-" + this.selectedDate.substring(3, 5) + "-" + this.selectedDate.substring(0, 2);
      if (this.endTime < this.startTime) {
        let entryEndDate = moment(endDate, 'YYYY-MM-DD').add(1, 'd');
        this.entryEndDate = moment(entryEndDate).format('YYYY-MM-DD');
      } else {
        this.entryEndDate = moment(endDate).format('YYYY-MM-DD');
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

  public adjustEndDate(){
    if (this.timeSpent > "23:59") {
      let endDate = this.selectedDate.substring(6, 10) + "-" + this.selectedDate.substring(3, 5) + "-" + this.selectedDate.substring(0, 2);
      let hours = this.timeSpent.substring(0,2);
      let numberofdays = Math.floor(hours / 24);
      let entryEndDate = moment(endDate, 'YYYY-MM-DD').add(numberofdays, 'd');
      this.entryEndDate = moment(entryEndDate).format('YYYY-MM-DD');
    } else {
      let endDate = this.selectedDate.substring(6, 10) + "-" + this.selectedDate.substring(3, 5) + "-" + this.selectedDate.substring(0, 2);

      this.entryEndDate = moment(endDate).format('YYYY-MM-DD');
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
        this.timeSpent = hours + ":" + minutes;
        let endT = moment() + moment.duration().add(this.timeSpent, 'HH:mm');
        this.endTime = moment(endT).format('HH:mm');

        this.adjustEndDate();
        this.newEntry();
      } else {
        alert('Wrong time format !');
      }
    } else if (t.toString().indexOf(':') !== -1) {
        this.timeSpent = t;
        let endT = moment() + moment.duration().add(this.timeSpent, 'HH:mm');
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
      startDateTime: this.selectedDate.substring(6, 10) + "-" + this.selectedDate.substring(3, 5) + "-" + this.selectedDate.substring(0, 2) + " " + this.startTime,
      endDateTime: this.entryEndDate + " " + this.endTime,
      description: this.description.trim(),
      userprofileID: this.loginService.getLoggedUserID(),
      taskID: this.taskID,
      clientID: this.clientID,
      projectID: this.projectID,
      billable: this.isBillable
    }).subscribe(
      () => {
        this.dialogRef.close(true);
        this.registryService.entriesComponent.offset = 0;
        this.registryService.sidebarComponent.displaySidebarData();
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