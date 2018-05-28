import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { DetailDialogComponent } from './detail-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IClient } from '../../../../data';
import { environment } from '../../../../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class DetailDialogService {
      public baseUrl: string = environment.apiBaseUrl;

    constructor(private dialog: MdDialog, http: Http) { }

    public confirm(viewContainerRef: ViewContainerRef, 
        row: any, 
        projects: IProject[],
        tasks: ITask[],
        clients: IClient[]
        ): Observable<boolean> {

        let dialogRef: MdDialogRef<DetailDialogComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(DetailDialogComponent, config);

        dialogRef.componentInstance.rowID = row.id;
        dialogRef.componentInstance.userprofileID = row.userprofileID;
        dialogRef.componentInstance.description = row.description;
        dialogRef.componentInstance.project = row.projectName;
        dialogRef.componentInstance.client = row.clientName;
        dialogRef.componentInstance.task = row.taskDescription;
        dialogRef.componentInstance.entryDate = row.entryDate;
        dialogRef.componentInstance.startTime = row.startTime;
        dialogRef.componentInstance.endDate = row.endDate;
        dialogRef.componentInstance.endTime = row.endTime;
        dialogRef.componentInstance.workTime = row.worktime.value;
        dialogRef.componentInstance.travelTime = row.traveltime.value;    
        dialogRef.componentInstance.isBillable = row.billable;
        dialogRef.componentInstance.place = row.place;
        dialogRef.componentInstance.projects = projects;
        dialogRef.componentInstance.clients = clients;
        dialogRef.componentInstance.tasks = tasks;
        dialogRef.componentInstance.selectedProjectID = row.projectID;
        dialogRef.componentInstance.selectedTaskID = row.taskID;
        dialogRef.componentInstance.selectedClientID = row.clientID;



        return dialogRef.afterClosed();
    }
}