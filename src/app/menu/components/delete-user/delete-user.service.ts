import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { DeleteUserComponent } from './delete-user.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { UserService } from '../../../data';

@Injectable()
export class DeleteUserService {
  constructor(private dialog: MdDialog, public userService: UserService) { }

  public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MdDialogRef<DeleteUserComponent>;

    dialogRef = this.dialog.open(DeleteUserComponent, { disableClose: true });

    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }

}
