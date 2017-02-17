import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from '../data/datastore';
import { IDataservice, TimeTrackingEntryService, ITimeTrackingEntry, IUser } from '../data';
import { Router } from '@angular/router';

const RESOURCE_NAME: string = 'login';
const ENDPOINT_NAME: string = 'login';

@Injectable()
export class LoginService implements IDataservice {
	private user: IUser;

	public baseUrl: string = environment.apiBaseUrl;

	private loggedIn = false;
	private loggedUserID: number;
	private loggedUser: IUser;
	public isLoading: Boolean = false;
	private entries: ITimeTrackingEntry[];

	constructor(private http: Http,
		private timeTrackingEntryService: TimeTrackingEntryService, private router: Router) {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME
		});
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	public logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	public isLoggedIn() {
		return this.loggedIn;
	}

	public getUserByUsername(username: string): Promise<IUser> {
		return store.find(RESOURCE_NAME, username);
	}

	public compareCredentials(username: string, password: string) {
		this.getUserByUsername(username).then(result => {
			this.user = result;
			this.loggedUserID = this.user.id;
			this.loggedUser = this.user;

			if (username !== undefined) {
				if (this.user.password === password) {
					alert('Hello ' + username + ', your are logged in!' + this.user.id + ' ' + this.user.employmentDegree + ' ' + this.loggedUserID);
					this.router.navigateByUrl('/timetracking');
				} else {
					alert('Your password is wrong!');
					this.router.navigateByUrl('/');
				}
			}
		});
	}

	public getLoggedUserID() {
		return this.loggedUserID;
	}

	public getLoggedUser() {
		return this.loggedUser;
	}
}
