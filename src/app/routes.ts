import { TimeTrackingComponent, EntriesComponent } from './time-tracking';
import { LoginComponent } from './login';

export const routes = [
	{ path: 'timeentries', component: TimeTrackingComponent },
	{ path: '', component: LoginComponent }
];