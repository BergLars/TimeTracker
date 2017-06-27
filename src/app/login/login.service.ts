import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from '../data/datastore';
import { IDataservice, TimeTrackingEntryService, ITimeTrackingEntry, IUser, UserService } from '../data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import * as CryptoJS from 'crypto-js';

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
	public headers: Headers;

	constructor(
		private http: Http,
		private timeTrackingEntryService: TimeTrackingEntryService,
		private router: Router,
		private defaultOptions: RequestOptions,
		private userService: UserService) {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME
		});
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	public request(username: string, password: string) {
		let params = new URLSearchParams();
		let url = this.baseUrl + ENDPOINT_NAME;
		params.set('username', username);
		params.set('password', password);
		return this.http.get(url, { search: params }).map(res => res.json()).subscribe(
			data => {
				localStorage.setItem('Authorization', data.token);
			},
			error => {
				if (error.status === 500) {
					alert('Internal server error!')
				}
				if (error.status === 404 || error.status === 400) {
					alert('Wrong username or password!!');
					this.router.navigate(['']);
				}
			},
		),
			this.http.get(this.baseUrl + "/userprofile").map(res => res.json()).subscribe(
				user => {
					this.loggedUser = user;
					this.getLoggedUserID();
					this.router.navigate(['timetracking']), this.loggedIn = true
				},
				() => { }
			);
	}

	public logout() {
		localStorage.removeItem('Authorization');
		this.loggedIn = false;
	}

	public isLoggedIn() {
		return this.loggedIn;
	}

	public getLoggedUserID(): number {
		this.loggedUserID = this.loggedUser['id'];
		return this.loggedUserID;
	}

	public getLoggedUsername() {
		return this.loggedUser['userName'];
	}

	public isAdmin() {
		return this.loggedUser['admin'];
	}
}
