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

	public timeRequirement = (/^(0[0-9]|1[0-9]|2[0-3])[:]([0-5][0-9])$/);
	// Allow you to sort items with a String value
	public propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
}