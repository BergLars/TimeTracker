import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { DeleteUserComponent } from './delete-user.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class DeleteUserService {
  constructor(private dialog: MatDialog) { }

  public openDeleteUserDialog(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MatDialogRef<DeleteUserComponent>;

    dialogRef = this.dialog.open(DeleteUserComponent, { disableClose: true });

    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }
}
