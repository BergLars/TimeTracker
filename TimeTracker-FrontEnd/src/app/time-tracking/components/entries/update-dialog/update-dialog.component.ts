import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Project, Client } from '../../../../interfaces';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import moment from 'moment/src/moment';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html'
})
export class UpdateDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  private _mySelectedProject: any;
  private _mySelectedClient: any;

  @Input() projects: Project[] = [];
  @Input() clients: Client[] = [];

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

  public rowID: number;
  public userprofileID: any;
  @Input() clientID: any;
  @Input() projectID: any;
  @Input() description: string;
  @Input() entryDate: any;
  @Input() workTime: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private http: Http,
    private loginService: LoginService) {
  }

  ngOnInit() {
  }

  checkMandatoryFields() {
    if (this.loginService.loggedIn()) {
      if (this.selectedProject === undefined || this.selectedClient === undefined || this.workTime === undefined || this.entryDate === undefined) {
        alert("Please check if all fields are filled in");
      } else {
       this.updateEntry();
      }
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  public updateEntry() {
    return this.http.put(this.baseUrl + "/timeentries/" + this.rowID, {
      entryDate: this.entryDate,
      description: this.description.trim(),
      userprofileID: this.userprofileID,
      clientID: this._mySelectedClient,
      projectID: this._mySelectedProject,
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

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.checkMandatoryFields();
    }
  }
}
