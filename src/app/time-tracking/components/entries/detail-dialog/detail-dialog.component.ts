import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IClient, ProjectService, TaskService, TimeTrackingEntryService, RegistryService } from '../../../../data';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';
import { UpdateDialogService } from '../update-dialog/update-dialog.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html'
})
export class DetailDialogComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;
  public rowID: number;
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
  @Input() selectedProjectID: any;
  @Input() selectedTaskID: any;
  @Input() selectedClientID: any;
  @Input() projects: IProject[] = [];
  @Input() tasks: ITask[] = [];
  @Input() clients: IClient[] = [];



  constructor(
    public dialogRef: MdDialogRef<DetailDialogComponent>,
    public projectService: ProjectService,
    public taskService: TaskService,
    public timeTrackingEntryService: TimeTrackingEntryService,
    private loginService: LoginService,
    private registryService: RegistryService,
    public updateService: UpdateDialogService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {

  }

   openUpdateDialog(this) {
    this.updateService
    .confirm(this.viewContainerRef, this, this.projects, this.tasks, this.clients)
    .subscribe(res => {
      this.result = res;
      if (this.result) {
        this.registryService.entriesComponent.loadEntries();
      }
    });
  }

}
