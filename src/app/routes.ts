// app.routes.ts

import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { LoginComponent } from './login/login.component';
import { ExportComponent } from './time-tracking/components/export/export.component';
import { EntriesComponent } from './time-tracking/components/entries/entries.component';
import { ContainerComponent } from './container/container.component';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileComponent } from './profile/profile.component';

export const routes = [
	{ path: 'timetracking', component: TimeTrackingComponent, pathMatch: 'full' },
	{ path: '', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }, 
	{ path: 'export', component: ExportComponent },
	{ path: 'entries', component: EntriesComponent }
	// { path: 'logout', component: LogoutComponent },
	
];