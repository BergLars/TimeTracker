import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { CreateDialogComponent } from './create-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Client } from '../../../interfaces';

@Injectable()
export class CreateDialogService {

	constructor(private dialog: MatDialog) {

		
	}

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {
		let dialogRef: MatDialogRef<CreateDialogComponent>;

		dialogRef = this.dialog.open(CreateDialogComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}