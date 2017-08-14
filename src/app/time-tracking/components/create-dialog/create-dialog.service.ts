import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { CreateDialogComponent } from './create-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { IProject, ProjectService, ITask, TaskService, TimeTrackingEntryService } from '../../../data';
import { EntriesComponent} from '../entries/entries.component';

@Injectable()
export class CreateDialogService {

	private entriesComponent: EntriesComponent;

	constructor(private dialog: MdDialog, public projectService: ProjectService, public taskService: TaskService, public timetrackingService: TimeTrackingEntryService) {
		this.entriesComponent = null;
	}

	public confirm(title: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

		let dialogRef: MdDialogRef<CreateDialogComponent>;
		let config = new MdDialogConfig();
		config.viewContainerRef = viewContainerRef;

		dialogRef = this.dialog.open(CreateDialogComponent, config);

		dialogRef.componentInstance.title = title;

		return dialogRef.afterClosed();
	}

	public setEntryComponent(entriesComponent: EntriesComponent) {
		this.entriesComponent = entriesComponent;
	}
}