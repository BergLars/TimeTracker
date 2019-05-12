import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntryDialogComponent } from './entry-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { EntriesComponent } from '../entries.component'

@Injectable()
export class EntryDialogService {

	constructor(private dialog: MatDialog) { }

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MatDialogRef<EntryDialogComponent>;

		dialogRef = this.dialog.open(EntryDialogComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}
