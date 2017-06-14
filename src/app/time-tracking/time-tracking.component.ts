import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, IProject, ITask, ITimeTrackingEntry, IUser, IStatistics } from '../data';
// Use the Full path instead of using index.ts path
import { CreateDialogService} from '../time-tracking/components/create-dialog/create-dialog.service';
import { LoginService } from '../login';

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
  public result: any;
  private isAdmin: boolean;

  constructor(
    private dialog: MdDialog,
    private projectService: ProjectService,
    private taskService: TaskService,
    private createDialogService: CreateDialogService,
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

  public checkIfAdmin() {
    this.showData();
    return this.isAdmin = this.loginService.isAdmin();
  }

  public showData() {
    this.user = this.loginService.loggedUser;
  }
}
