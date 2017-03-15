import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from '../data/datastore';
import { IDataservice, TimeTrackingEntryService, ITimeTrackingEntry, IUser } from '../data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

const RESOURCE_NAME: string = 'user';
const ENDPOINT_NAME: string = '/login';

@Injectable()
export class LoginService implements IDataservice {
	private user: IUser;

	public baseUrl: string = environment.apiBaseUrl;

	public loggedIn = false;
	public loggedUserID: number;
	public loggedUser: IUser;
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

	public request(username: string, password: string) {
		let params = new URLSearchParams();
		params.set('username', username);
		params.set('password', password);
		return this.http.request(new Request({
			method: RequestMethod.Get,
			url: this.baseUrl + ENDPOINT_NAME,
			search: params
		})).map(res => res.json()).subscribe(
			data => this.loggedUser = data,
			err => {
				if (err.status === 500) {
					alert('Internal server error!')
				} else if (err.status === 404) {
					alert('No user found with username: ' + username + '!')
				} else if (err.status === 400) {
					alert('Wrong password!');
				}
			},
			() => {
				this.router.navigate(['timetracking']),
					this.loggedIn = true
			}
			);
	}

	public logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	public isLoggedIn() {
		return this.loggedIn;
	}

	public getLoggedUserID() {
		this.loggedUserID = this.loggedUser['id'];
		return this.loggedUserID;
	}

	public getLoggedUsername() {
		return this.loggedUser['userName'];
	}
}
