import { Observable } from 'rxjs/Rx';
import { Injectable, ViewContainerRef } from '@angular/core';
import { EntriesComponent } from '../time-tracking/components/entries/entries.component';
import { CreateDialogService} from '../time-tracking/components/create-dialog/create-dialog.service';

@Injectable()
export class RegistryService {

	public entriesComponent: EntriesComponent;
	public createDialogService: CreateDialogService;

}
