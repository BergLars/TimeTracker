import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateDialogService } from '../time-tracking/components/create-dialog/create-dialog.service';
import { ExportDialogService } from '../time-tracking/components/export-dialog/export-dialog.service';
import { EntriesService } from '../time-tracking/components/entries/entries.service';
import { EntriesComponent } from '../time-tracking/components/entries/entries.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import moment from 'moment/src/moment';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit {

  public isLoading: Boolean = false;

  public currentDate: any;


  constructor(
    public loginService: LoginService,
    private dialog: MatDialog,
    private createDialogService: CreateDialogService,
    private exportDialogService: ExportDialogService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private entriesService: EntriesService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.currentDate = moment().format('LL');
    this.checkIfLoggedIn();
  }
  public openCreateDialog() {
    if (this.loginService.loggedIn())  {
      this.createDialogService
        .confirm('Create', this.viewContainerRef)
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

  public openExportDialog() {
    this.exportDialogService
      .confirm('Export', this.viewContainerRef);
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('Authorization')) {
    }
    else {
      this.router.navigate(['']);
    }
  }
}
