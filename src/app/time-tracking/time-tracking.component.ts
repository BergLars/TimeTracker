import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, IProject, ITask, ITimeTrackingEntry, IUser, IStatistics } from '../data';
import { LoginService } from '../login';
// Use the Full path instead of using index.ts path
import { CreateDialogService} from '../time-tracking/components/create-dialog/create-dialog.service';
import { ExportDialogService} from '../time-tracking/components/export-dialog/export-dialog.service';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit {

  public isLoading: Boolean = false;

  private projects: IProject[];
  private project: IProject;
  private tasks: ITask[];
  private entries: ITimeTrackingEntry[];
  private entry: ITimeTrackingEntry;
  private user: IUser;
  private users: IUser[];
  private statistics: IStatistics;


  constructor(
    private dialog: MdDialog,
    private projectService: ProjectService,
    private taskService: TaskService,
    private createDialogService: CreateDialogService,
    private exportDialogService: ExportDialogService,
    private userService: UserService,
    private loginService: LoginService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.isLoading = false;
  }
  public openCreateDialog() {
   this.createDialogService
    .confirm('Create', this.viewContainerRef);
  }

  public openExportDialog() {
   this.exportDialogService
    .confirm('Export', this.viewContainerRef);
  }
}
