import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { PasswordDialogComponent } from './password-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class PasswordDialogService {

  constructor(private dialog: MatDialog ) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

  	let dialogRef: MatDialogRef<PasswordDialogComponent>;

    dialogRef = this.dialog.open(PasswordDialogComponent, {disableClose:true});

    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }
}