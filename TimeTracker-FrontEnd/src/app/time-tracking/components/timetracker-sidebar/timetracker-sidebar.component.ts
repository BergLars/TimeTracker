import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EntriesService } from '../../components/entries/entries.service';
import { LoginService } from '../../../login/login.service';
import { EditProjectService } from './edit-project/edit-project.service';
import { EditClientService } from './edit-client/edit-client.service';

@Component({
  selector: 'app-timetracker-sidebar',
  templateUrl: './timetracker-sidebar.component.html',
  styleUrls: ['./timetracker-sidebar.component.scss']
})
export class TimetrackerSidebarComponent implements OnInit {

  constructor(
  	private entriesService: EntriesService,
  	public loginService: LoginService,
  	private editProjectService: EditProjectService,
    private editClientService: EditClientService,
  	private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  public openEditProjectDialog() {
  	if (this.loginService.loggedIn())  {
  		this.editProjectService
  		.confirm('Edit Project', this.viewContainerRef)
  		.subscribe(res => {
  			if (res) {
  				this.entriesService.allEntriesAreLoaded();
  			}
  		});
	} else {
      alert("Your token has expired. Please log in again!");
      this.loginService.logout();
    }
  }

  public openEditClientDialog() {
    if (this.loginService.loggedIn())  {
      this.editClientService
      .confirm('Edit Client', this.viewContainerRef)
      .subscribe(res => {
        if (res) {
          this.entriesService.allEntriesAreLoaded();
        }
      });
  } else {
      alert("Your token has expired. Please log in again!");
      this.loginService.logout();
    }
  }
}
