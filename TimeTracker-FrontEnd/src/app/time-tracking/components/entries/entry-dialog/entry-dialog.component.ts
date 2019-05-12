import { Component, OnInit, Input } from '@angular/core';
import { Client, Project, Userprofile } from '../../../../interfaces';
import { LoginService } from '../../../../login';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import moment from 'moment/src/moment';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, DateAdapter } from '@angular/material';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  private _mySelectedProject: number;
  private _mySelectedClient: any;
  public title: string;
  model: any = {};

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
  @Input() entryDate: any;
  @Input() travelTime: any;
  @Input() workTime: any;
  public user: Userprofile;
  private description: string;

  constructor(
    public dialogRef: MatDialogRef<EntryDialogComponent>,
    private http: Http,
    public loginService: LoginService,
    private entriesService: EntriesService,
    private dateAdapter: DateAdapter<Date>) {
  }

  ngOnInit() {
    this.loadItems();
  }

  public ok() {
    this.entryDate = moment(this.model.entryDate.toISOString()).format('YYYY-MM-DD');
    this.description = this.model.description;
    this.workTime = this.model.workTime;
    this.checkMandatoryFields();
  }

  public checkMandatoryFields() {
    if (this.loginService.loggedIn()) {
      if (this.selectedProject === undefined || this.selectedClient === undefined || this.workTime === undefined || this.entryDate === undefined) {
        alert("Please check if all fields are filled in");
      } else {
        this.newEntry();
      }
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  keyDownFunction(event) {
    if (event.key == 'Enter') {
      this.checkMandatoryFields();
    }
  }

  public newEntry() {
    return this.http.post(this.baseUrl + "/timeentries", {
      userprofileID: this.loginService.getLoggedUserID(),
      entryDate: this.entryDate,
      description: this.description,
      clientID: this.selectedClient,
      projectID: this.selectedProject,   
      worktime: this.workTime
    }).subscribe(
      () => {
        this.dialogRef.close(true);
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