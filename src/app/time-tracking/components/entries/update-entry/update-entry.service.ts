import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { UpdateEntryComponent } from './update-entry.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry } from '../../../../data';

@Injectable()
export class UpdateEntryService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef, row: any): Observable<boolean> {

    let dialogRef: MdDialogRef<UpdateEntryComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(UpdateEntryComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDescription = row.description;
    dialogRef.componentInstance.selectedProject = row.project;
    dialogRef.componentInstance.rowid = row.id;
    dialogRef.componentInstance.selectedTask = row.task;
    dialogRef.componentInstance.selectedDate = row.date;
    dialogRef.componentInstance.selectedStartTime = row.startTime;
    dialogRef.componentInstance.selectedEndTime = row.endTime;

    return dialogRef.afterClosed();
  }
}
