import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { CreateDialogComponent } from './create-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { IProject, ProjectService, ITask, TaskService, TimeTrackingEntryService, RegistryService } from '../../../data';

@Injectable()
export class CreateDialogService {

	constructor(private dialog: MdDialog, 
		public projectService: ProjectService, 
		public taskService: TaskService, 
		public timetrackingService: TimeTrackingEntryService, 
		public registryService: RegistryService) {

		this.registryService.createDialogService = this;
	}

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {
		let dialogRef: MdDialogRef<CreateDialogComponent>;

		dialogRef = this.dialog.open(CreateDialogComponent, {disableClose:true});

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}
}