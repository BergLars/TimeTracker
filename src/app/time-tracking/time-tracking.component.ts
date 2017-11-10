import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RegistryService } from '../data';
// Use the Full path instead of using index.ts path
import { CreateDialogService } from '../time-tracking/components/create-dialog/create-dialog.service';
import { ExportDialogService } from '../time-tracking/components/export-dialog/export-dialog.service';
import { EditDialogService } from '../time-tracking/components/edit-dialog/edit-dialog.service';

import { EntriesService } from '../time-tracking/components/entries/entries.service';
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
    private dialog: MdDialog,
    private createDialogService: CreateDialogService,
    private exportDialogService: ExportDialogService,
    private editDialogService: EditDialogService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private entriesService: EntriesService,
    private registryService: RegistryService) {
    
  }

  ngOnInit() {
    this.isLoading = false;
    this.currentDate = moment().format('LL');
    this.checkIfLoggedIn();
  }
  public openCreateDialog() {
    this.registryService.entriesComponent.unselectEntry();
    if (this.loginService.loggedIn()) {
      this.createDialogService
      .confirm('Create', this.viewContainerRef)
      .subscribe(res => {
        if (res) {
          this.entriesService.entriesAreLoaded();
        }
      });  
    } else {
      alert("Your token has expired. Please log in again!");
      this.loginService.logout();
    }
    
  }

  public openEditDialog() {
    this.registryService.entriesComponent.unselectEntry();
    this.editDialogService
      .confirm('Edit', this.viewContainerRef)
      .subscribe(res => {
        if (res) {
          this.entriesService.entriesAreLoaded();
        }
      });
  }

  public openExportDialog() {
    this.registryService.entriesComponent.unselectEntry();
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
