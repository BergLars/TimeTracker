import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { UpdateDialogComponent } from './update-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ITimeTrackingEntry, IProject, ITask, IClient, TimespentService } from '../../../../data';

@Injectable()
export class UpdateDialogService {

    constructor(private dialog: MdDialog, private timeSpentService: TimespentService) { }

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
        updateDialogComponent.rowID = row.id;
        updateDialogComponent.userprofileID = row.userprofileID;
        updateDialogComponent.selectedProject = row.projectID;
        updateDialogComponent.selectedTask = row.taskID;
        updateDialogComponent.selectedClient = row.clientID;
        updateDialogComponent.fromDate = row.entryDate;
        updateDialogComponent.startTime = row.startTime;
        updateDialogComponent.toDate = row.endDate;
        updateDialogComponent.endTime = row.endTime;
        updateDialogComponent.workTime = this.timeSpentService.addCorrectTimeFormat(row.worktime.value);
        updateDialogComponent.travelTime = this.timeSpentService.addCorrectTimeFormat(row.traveltime.value);
        updateDialogComponent.isBillable = row.billable;
        updateDialogComponent.place = row.place;
        updateDialogComponent.projects = projects;
        updateDialogComponent.tasks = tasks;
        updateDialogComponent.clients = clients;

        return dialogRef.afterClosed();
    }
}