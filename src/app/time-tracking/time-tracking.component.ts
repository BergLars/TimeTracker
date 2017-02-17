import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, IProject, ITask, ITimeTrackingEntry, IUser, IStatistics } from '../data';
import { LoginService } from '../login';
import { SearchDialogComponent } from '../time-tracking';


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
  private dialogRefSearch: MdDialogRef<SearchDialogComponent>;

  constructor(
    private dialog: MdDialog,
    private projectService: ProjectService,
    private taskService: TaskService,
    private timeTrackingEntryService: TimeTrackingEntryService,
    private userService: UserService,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoading = false;

    this.getStatistics();

    Promise.all([
      // Get current user                                                        
      // TODO: Get user from login
      this.userService.getUser(this.loginService.getLoggedUserID()).then(result => { this.user = result; }),

      // Get an entry with id
      // this.timeTrackingEntryService.getTimeTrackingEntry(1).then(result => { this.entry = result; }),

      // Get all projects
      this.projectService.getProjects().then(result => { this.projects = result; }),

      // Get all tasks
      this.taskService.getTasks().then(result => { this.tasks = result; }),

      // Get all users
      // this.userService.getUsers().then(result => { this.users = result; }),

      // this.loginService.getUserByUsername('wick').then(result => { this.user = result; })
    ])
      .then(() => {

      // Get user's time tracking entries
      return this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.loginService.getLoggedUser())
      // return this.timeTrackingEntryService.getTimeTrackingEntries()
          .then(result => {
            this.entries = result;
          });
      })
      .then(result => {
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
      });
  }

  private getStatistics() {
    // TODO
    // this.statistics.totalAvailableVacationDays = 18;
    // this.statistics.totalHousWorkedMonth = 69;
    // this.statistics.totalHousWorkedWeek = 21;
  }

  // ------------------------------------------------------------------------------ Dialog handling

  public showSearchDialog() {
    // this.dialogRefSearch = this.dialog.open(SearchDialogComponent);

    this.dialogRefSearch
      .afterClosed()
      .subscribe(result => {
        console.log('result: ' + result);
        this.dialogRefSearch = null;
      });
  }

  public showExportDialog() {

  }

  public showVacationWorkedHoursDialog() {

  }
}
