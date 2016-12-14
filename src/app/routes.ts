// app.routes.ts

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DateComponent } from './date/date.component';
import { SearchComponent } from './search/search.component';
import { ExportComponent } from './export/export.component';
import { EntryComponent } from './entry/entry.component';
import { EntriesComponent } from './entries/entries.component';
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { ContainerComponent } from './container/container.component';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileComponent } from './profile/profile.component';

export const routes = [
	{ path: '', component: AppComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }, 
	{ path: 'search', component: AppComponent, pathMatch: 'full' },
	{ path: 'export', component: LoginComponent },
	{ path: 'entry', component: EntryComponent },
	// { path: 'logout', component: LogoutComponent },
	{ path: 'entries', component: EntriesComponent }
];
