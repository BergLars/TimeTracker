import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../data';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService
      .getProjects();
  }

}
