// app.routes.ts

import { TimeTrackingComponent, EntriesComponent } from './time-tracking';
// import { TimeTrackingComponent, EntriesComponent, ExportComponent } from './time-tracking';
import { LoginComponent } from './login';
import { ChangePasswordComponent } from './change-password';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileComponent } from './profile';

export const routes = [
	{ path: 'timetracking', component: TimeTrackingComponent, pathMatch: 'full' },
	{ path: '', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }, 
	// { path: 'export', component: ExportComponent },
	{ path: 'entries', component: EntriesComponent },
	{ path: 'change-password', component: ChangePasswordComponent }
	// { path: 'logout', component: LogoutComponent },
	
];