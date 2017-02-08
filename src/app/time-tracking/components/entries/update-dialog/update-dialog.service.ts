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
    dialogRef.componentInstance.selectedProject = row.project;
    dialogRef.componentInstance.rowid = row.id;
    dialogRef.componentInstance.selectedTask = row.task;
    dialogRef.componentInstance.selectedDate = row.date;
    dialogRef.componentInstance.selectedStartTime = row.startTime;
    dialogRef.componentInstance.selectedEndTime = row.endTime;

    return dialogRef.afterClosed();
  }
}
