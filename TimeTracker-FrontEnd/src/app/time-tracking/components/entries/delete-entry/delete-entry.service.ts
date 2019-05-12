import { Observable } from 'rxjs/Rx';
import { DeleteEntryComponent } from './delete-entry.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DeleteEntryService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef, id: number): Observable<boolean> {

        let dialogRef: MatDialogRef<DeleteEntryComponent>;

        dialogRef = this.dialog.open(DeleteEntryComponent, {disableClose:true});

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.rowid = id;

        return dialogRef.afterClosed();
    }
}