import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, URLSearchParams, JsonpModule, Jsonp, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from '../data/datastore';
import { IDataservice, TimeTrackingEntryService, ITimeTrackingEntry, IUser } from '../data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const RESOURCE_NAME: string = 'user';
const ENDPOINT_NAME: string = '/login';

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
		private timeTrackingEntryService: TimeTrackingEntryService, private router: Router, private jsonp: Jsonp) {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME
		});
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	public request(username: string, password: string) {
		let params = new URLSearchParams();
		let data: Object;
		params.set('username', username);
		params.set('password', password);
		return this.http.request(new Request({
			method: RequestMethod.Get,
			url: this.baseUrl + ENDPOINT_NAME,
			search: params
		})).subscribe((res) => {
			this.loggedUser = res.json();
			this.loggedUserID = this.loggedUser['id'];
			this.router.navigate(['timetracking']);
		});
	}

	public logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	public isLoggedIn() {
		return this.loggedIn;
	}

	public getLoggedUserID() {
		return this.loggedUserID;
	}

	public getLoggedUser(): Promise<IUser> {
		return Promise.resolve(<IUser>this.loggedUser);
	}
}
