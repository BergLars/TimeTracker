import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IProject, ITask, IClient, ProjectService, TaskService, TimeTrackingEntryService, TimespentService, RegistryService, DatesService } from '../../../../data';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html'
})
export class UpdateDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  private _mySelectedProject: any;
  private _mySelectedClient: any;
  private _mySelectedTask: any;

  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  @Input() clients: IClient[] = [];

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
  @Input() fromDate: any;
  @Input() startTime: any;
  public userprofileID: any;
  @Input() clientID: any;
  @Input() projectID: any;
  @Input() taskID: any;
  @Input() description: string;
  @Input() entryDate: any;
  @Input() toDate: any;
  @Input() endTime: any;
  @Input() isBillable: boolean;
  @Input() workTime: any;
  @Input() place: any;
  @Input() travelTime: any;
  public validDatePeriod: boolean = false;
  public validTimePeriod: boolean = false;

  constructor(
    public dialogRef: MdDialogRef<UpdateDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    private http: Http,
    public timeTrackingEntryService: TimeTrackingEntryService,
    public timeSpentService: TimespentService,
    public registryService: RegistryService,
    private loginService: LoginService,
    public datesService: DatesService) {
  }

  ngOnInit() {
    this._mySelectedProject = this.selectedProjectID;
    this._mySelectedClient = this.selectedClientID;
    this._mySelectedTask = this.selectedTaskID;
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.entryDate === " " || this.toDate === " " || this.workTime === " ") {
      alert("Please check if all the fields are filled in");
    } else {
      this.checkStartAndEndTime();
    }
  }

  createEntryWithStartAndEndTime() {
    this.workTime = this.timeSpentService.calculateWorktimeBetweenDates(this.datesService.convertDaysToHours(this.fromDate, this.toDate), this.startTime, this.endTime);
    return this.updateEntry();
  }

  createEntryWithWorkTime() {
    this.workTime = this.workTime;
    return this.updateEntry();
  }

  checkStartAndEndTime() {
    if (this.loginService.loggedIn()) {
      this.validDatePeriod = this.datesService.isValidDatePeriod(this.fromDate, this.toDate);
      this.validTimePeriod = this.timeSpentService.isValidTimePeriod(this.startTime, this.endTime);
      if (this.validDatePeriod === false) {
        alert("Invalid dates Period!");
      }
      else if (this.fromDate === this.toDate && this.validTimePeriod === false) {
        if (this.startTime === '' && this.endTime === '') {
          this.startTime = "00:00";
          this.endTime = "00:00";
        } else {
          alert("Invalid time Period!");  
        }
      }
      else if ((this.registryService.timeRequirement.test(this.startTime) && this.registryService.timeRequirement.test(this.endTime) && this.registryService.timeSpentRequirement.test(this.workTime) && this.registryService.timeRequirement.test(this.travelTime)) === false) {
        alert("Please check time format");
      }
      else {
        var r = confirm('Clicking on OK you will take the worktime value');
        if (r === true) {
          this.startTime = "00:00";
          this.endTime = "00:00";
          this.createEntryWithWorkTime();
        }
        else {
          this.createEntryWithStartAndEndTime();
        }
      }
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  public updateEntry() {
    return this.http.put(this.baseUrl + "/timeentries/" + this.rowID, {
      startDateTime: this.fromDate.substring(6, 10) + "-" + this.fromDate.substring(3, 5) + "-" + this.fromDate.substring(0, 2) + " " + this.startTime,
      endDateTime: this.toDate.substring(6, 10) + "-" + this.toDate.substring(3, 5) + "-" + this.toDate.substring(0, 2) + " " + this.endTime,
      description: this.description.trim(),
      userprofileID: this.registryService.entriesComponent.selectedUser,
      clientID: this._mySelectedClient,
      projectID: this._mySelectedProject,
      taskID: this._mySelectedTask,
      billable: this.isBillable,
      traveltime: this.timeSpentService.addCorrectTimeFormat(this.travelTime),
      place: this.place,
      worktime: this.timeSpentService.addCorrectTimeFormat(this.workTime)
    }).subscribe(
      () => {
        this.dialogRef.close(true);
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
  public ok() {
    this.checkMandatoryFields();
  }

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.ok();
    }
  }
}
