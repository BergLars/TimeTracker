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

    return dialogRef.afterClosed();
  }
}
