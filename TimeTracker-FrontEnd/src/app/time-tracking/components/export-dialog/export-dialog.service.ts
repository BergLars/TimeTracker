import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { ExportDialogComponent } from './export-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class ExportDialogService {

	constructor(private dialog: MatDialog) { }

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MatDialogRef<ExportDialogComponent>;

		dialogRef = this.dialog.open(ExportDialogComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}