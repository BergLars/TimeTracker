import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntryDialogComponent } from './entry-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry } from '../../../../data';

@Injectable()
export class EntryDialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef, row: any): Observable<boolean> {

  	let dialogRef: MdDialogRef<EntryDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(EntryDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDescription = row.description;
    dialogRef.componentInstance.selectedProjectName = row.projectID;
    dialogRef.componentInstance.selectedTaskDescription = row.taskID;
    dialogRef.componentInstance.selectedDate = row.startDate;
    dialogRef.componentInstance.selectedStartTime = row.startTime();
    dialogRef.componentInstance.selectedEndTime = row.endTime();

    return dialogRef.afterClosed();
  }
}
