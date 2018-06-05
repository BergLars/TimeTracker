import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IClient, ProjectService, TaskService, TimeTrackingEntryService } from '../../../../data';
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
  @Input() clientID: any;
  @Input() projectID: any;
  @Input() taskID: any;
  @Input() description: string;
  @Input() entryDate: any;
  @Input() endDate: any;
  @Input() endTime: any;
  @Input() isBillable: boolean;
  @Input() workTime: any;
  @Input() place: any;
  @Input() travelTime: any;

  constructor(
    public dialogRef: MdDialogRef<UpdateDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    private http: Http,
    public timeTrackingEntryService: TimeTrackingEntryService,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this._mySelectedProject = this.selectedProjectID;
    this._mySelectedClient = this.selectedClientID;
    this._mySelectedTask = this.selectedTaskID;
  }

  checkMandatoryFields() {
    if (this.description === "" || this.projectID === null || this.taskID === null || this.entryDate === " " || this.endDate === " " || this.workTime === " ") {
      alert("Please check if all the fields are filled in");
    } else {
      this.checkStartAndEndTime();
    }
  }

  checkStartAndEndTime() {
    if ((this.startTime === "" && this.endTime === "") || (this.startTime === "00:00" && this.endTime === "00:00") ) {
      this.startTime = "00:00";
      this.endTime = "00:00";
      this.updateEntry();
    } else {
      if (this.startTime > this.endTime || this.startTime == this.endTime) {
        alert("Please enter a valid endtime.")
      } else {
        this.updateEntry();
      }  
    }
    
  }

  public updateEntry() {
    return this.http.put(this.baseUrl + "/timeentries/" + this.rowID, {
      startDateTime: this.startDate.substring(6, 10) + "-" + this.startDate.substring(3, 5) + "-" + this.startDate.substring(0, 2) + " " + this.startTime,
      endDateTime: this.endDate.substring(6, 10) + "-" + this.endDate.substring(3, 5) + "-" + this.endDate.substring(0, 2) + " " + this.endTime,
      description: this.description.trim(),
      userprofileID: this.loginService.getLoggedUserID(),
      clientID: this._mySelectedClient,
      projectID: this._mySelectedProject,
      taskID: this._mySelectedTask,
      billable: this.isBillable,
      traveltime: this.travelTime,
      place: this.place,
      worktime: this.workTime
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
}
