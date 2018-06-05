import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { UpdateDialogComponent } from './update-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IClient } from '../../../../data';

@Injectable()
export class UpdateDialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(viewContainerRef: ViewContainerRef, 
        row: any, 
        projects: IProject[],
        tasks: ITask[],
        clients: IClient[]
        ): Observable<boolean> {

        let dialogRef: MdDialogRef<UpdateDialogComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;


        dialogRef = this.dialog.open(UpdateDialogComponent, config);

        let updateDialogComponent = dialogRef.componentInstance; 

        updateDialogComponent.description = row.description;
        updateDialogComponent.rowID = row.rowID;
        updateDialogComponent.userprofileID = row.userprofileID;
        updateDialogComponent.selectedProjectID = row.selectedProjectID;
        updateDialogComponent.selectedTaskID = row.selectedTaskID;
        updateDialogComponent.selectedClientID = row.selectedClientID;
        updateDialogComponent.startDate = row.entryDate;
        updateDialogComponent.startTime = row.startTime;
        updateDialogComponent.endDate = row.endDate;
        updateDialogComponent.endTime = row.endTime;   
        updateDialogComponent.workTime = row.workTime;
        updateDialogComponent.travelTime = row.travelTime;    
        updateDialogComponent.isBillable = row.isBillable;
        updateDialogComponent.place = row.place;
        updateDialogComponent.projects = projects;
        updateDialogComponent.tasks = tasks;
        updateDialogComponent.clients = clients;
        updateDialogComponent.selectedProject = row.selectedProjectID;
        // dialogRef.componentInstance.selectedTimeSpent = row.timeSpent;
 
        return dialogRef.afterClosed();
    }
}