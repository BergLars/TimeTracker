import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { UpdateDialogComponent } from './update-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Timeentry, Project, Client } from '../../../../interfaces';

@Injectable()
export class UpdateDialogService {

    constructor(private dialog: MatDialog) { }

    public confirm(viewContainerRef: ViewContainerRef,
        row: any,
        projects: Project[],
        clients: Client[]
    ): Observable<boolean> {

        let dialogRef: MatDialogRef<UpdateDialogComponent>;
        let config = new MatDialogConfig();
        config.viewContainerRef = viewContainerRef;


        dialogRef = this.dialog.open(UpdateDialogComponent, config);

        let updateDialogComponent = dialogRef.componentInstance;

        updateDialogComponent.description = row.description;
        updateDialogComponent.rowID = row.id;
        updateDialogComponent.userprofileID = row.userprofileID;
        updateDialogComponent.selectedProject = row.projectID;
        updateDialogComponent.selectedClient = row.client.id;
        updateDialogComponent.entryDate = row.entryDate;
        updateDialogComponent.workTime = row.worktime;
        updateDialogComponent.projects = projects;
        updateDialogComponent.clients = clients;

        return dialogRef.afterClosed();
    }
}