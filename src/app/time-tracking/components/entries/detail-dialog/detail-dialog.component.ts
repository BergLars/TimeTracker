import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, ProjectService, TaskService, TimeTrackingEntryService } from '../../../../data';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html'
})
export class DetailDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  public rowID: number;
  public selectedDescription: string;
  public project: any;
  public client: any;
  public task: any;
  public userprofileID: any;
  public startTime: any;
  public endTime: any;
  public description: string;
  public place: string;
  public entryDate: any;
  public endDate: any;
  public timeSpent: any;
  public workTime: any;
  public travelTime: any;
  public isBillable: boolean;
  public result: any;


  constructor(
    public dialogRef: MdDialogRef<DetailDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    private loginService: LoginService) {
  }

  ngOnInit() {

  }


}
