import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { UpdateDialogComponent } from './update-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry } from '../../../../data';

@Injectable()
export class UpdateDialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef, row: any): Observable<boolean> {

    let dialogRef: MdDialogRef<UpdateDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(UpdateDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDescription = row.description;
    dialogRef.componentInstance.selectedProject = row.projectID;
    dialogRef.componentInstance.rowid = row.id;
    dialogRef.componentInstance.userprofileID = row.userprofileID;
    dialogRef.componentInstance.projectID = row.projectID;
    dialogRef.componentInstance.taskID = row.taskID;
    dialogRef.componentInstance.selectedTask = row.taskID;
    dialogRef.componentInstance.selectedDate = row.startDate.substring(0, 10);
    dialogRef.componentInstance.selectedStartTime = row.startDate.substring(11, 16);
    dialogRef.componentInstance.selectedEndTime = row.endDate.substring(11, 16);

    return dialogRef.afterClosed();
  }
}