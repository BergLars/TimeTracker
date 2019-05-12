import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EditProjectComponent } from './edit-project.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class EditProjectService {

	constructor(private dialog: MatDialog) { }

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MatDialogRef<EditProjectComponent>;

		dialogRef = this.dialog.open(EditProjectComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}