import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EditClientComponent } from './edit-client.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class EditClientService {

	constructor(private dialog: MatDialog) { }

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MatDialogRef<EditClientComponent>;

		dialogRef = this.dialog.open(EditClientComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}