import { Component, OnInit } from '@angular/core';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, Project, Task, TimeTrackingEntry, User } from '../data';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit {

  public isLoading: Boolean = false;
  private projects: Project[];
  private tasks: Task[];
  private entries: TimeTrackingEntry[];
  private user: User;

  constructor(private projectService: ProjectService, private taskService: TaskService, private timeTrackingEntryService: TimeTrackingEntryService, private userService: UserService) { }

  ngOnInit() {
    // Get all projects
    this.projectService.getProjects()
      .then(result => { this.projects = result; })

      // Get all tasks
      .then(() => { return this.taskService.getTasks(); })
      .then(result => { this.tasks = result; })

      // Get current user
      .then(() => { return this.userService.getUser(1); })
      .then(result => { return this.user = result; })

      // Get user's time tracking entries
      .then(() => { return this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.user); })
      .then(result => {
        this.isLoading = false;
        return this.entries = result;
      })
      .catch(error => {
        this.isLoading = false;
      });
  }

}
