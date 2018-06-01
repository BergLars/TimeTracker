import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntriesComponent } from '../time-tracking/components/entries/entries.component';
import { CreateDialogService } from '../time-tracking/components/create-dialog/create-dialog.service';
import { SidebarComponent } from '../time-tracking/components/sidebar/sidebar.component';

@Injectable()
export class RegistryService {

	public entriesComponent: EntriesComponent;
	public createDialogService: CreateDialogService;
	public sidebarComponent: SidebarComponent;

	public dateRequirement = (/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](2)\d{3}$/);
	public timeRequirement = (/^(0[0-9]|1[0-9]|2[0-3])[:]([0-5][0-9])$/);
	public timeSpentRequirement = (/^([0-9][0-9])[:]([0-5][0-9])$/);
}