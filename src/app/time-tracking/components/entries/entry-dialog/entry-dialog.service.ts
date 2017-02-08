import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntryDialogComponent } from './entry-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry, TimeTrackingEntryService } from '../../../../data';

@Injectable()
export class EntryDialogService {

  constructor(private dialog: MdDialog, public timeTrackingEntryService: TimeTrackingEntryService) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef, row: any): Observable<boolean> {

  	let dialogRef: MdDialogRef<EntryDialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(EntryDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDescription = row.description;
    dialogRef.componentInstance.selectedProjectName = row.projectID;
    dialogRef.componentInstance.selectedTaskDescription = row.taskID;
    dialogRef.componentInstance.selectedDate = row.startDate.substring(0,10);
    dialogRef.componentInstance.selectedStartTime = row.startDate.substring(11,16);
    dialogRef.componentInstance.selectedEndTime = row.endDate.substring(11,16);

    return dialogRef.afterClosed();
  }
}
