import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntryDialogComponent } from './entry-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry, TimeTrackingEntryService } from '../../../../data';
import { EntriesComponent } from '../entries.component'

@Injectable()
export class EntryDialogService {

	constructor(private dialog: MdDialog, public timeTrackingEntryService: TimeTrackingEntryService) { }

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MdDialogRef<EntryDialogComponent>;

		dialogRef = this.dialog.open(EntryDialogComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}
