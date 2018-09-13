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
  public defaultTimeValue: String = "00:00";

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
    this.startTime = "00:00";
    this.endTime = "00:00";
    this.workTime = this.workTime;
    return this.updateEntry();
  }

  checkStartAndEndTime() {
    if (this.loginService.loggedIn()) {
      if (this.description === "" || this.description === undefined || this.toDate === undefined || this.fromDate === undefined || this.selectedProject === undefined || this.selectedClient === undefined || this.selectedTask === undefined) {
        alert("Please check if all fields are filled in");
      } else if ((this.registryService.dateRequirement.test(this.fromDate) && this.registryService.dateRequirement.test(this.toDate)) !== true) {
        alert("Please check date format");
      } else if (this.validDatePeriod === false) {
        alert("Invalid date Period!");
      } else if (((this.workTime === '' && (this.startTime === '' || this.endTime === ''))) === true) {
        alert("Check if woktime or start and end time are filled!");
      } else {
        if (this.travelTime === '') {
          this.travelTime = this.defaultTimeValue;
        } if (this.registryService.timeSpentRequirement.test(this.travelTime) === false) {
          alert('Wrong travel time format');
        } if (this.startTime === '' || this.endTime === '' || this.startTime === this.defaultTimeValue || this.endTime === this.defaultTimeValue) {
          if (this.startTime === '' || this.endTime == '') {
            this.startTime = this.defaultTimeValue;
            this.endTime = this.defaultTimeValue; 
          }          
          return this.registryService.timeSpentRequirement.test(this.workTime) === false ? alert('Wrong work time format') : this.createEntryWithWorkTime();
        } if (this.workTime === '') {
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

  public updateEntry() {
    return this.http.put(this.baseUrl + "/timeentries/" + this.rowID, {
      startDateTime: this.fromDate.substring(6, 10) + "-" + this.fromDate.substring(3, 5) + "-" + this.fromDate.substring(0, 2) + " " + this.startTime,
      endDateTime: this.toDate.substring(6, 10) + "-" + this.toDate.substring(3, 5) + "-" + this.toDate.substring(0, 2) + " " + this.endTime,
      description: this.description.trim(),
      userprofileID: this.registryService.entriesComponent.rowUserprofileID,
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
    this.validDatePeriod = this.datesService.isValidDatePeriod(this.fromDate, this.toDate);
    this.validTimePeriod = this.timeSpentService.isValidTimePeriod(this.startTime, this.endTime);

        this.checkMandatoryFields();
  }

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.ok();
    }
  }
}
