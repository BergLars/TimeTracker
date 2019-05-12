import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from '../interfaces/datastore';
import { Userprofile } from '../interfaces';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { tokenNotExpired } from 'angular2-jwt';


const RESOURCE_NAME: string = 'user';
const ENDPOINT_NAME: string = '/login';

@Injectable()
export class LoginService {
	private user: Userprofile;

	public baseUrl: string = environment.apiBaseUrl;

	public loggedUserID: number;
	public headers: Headers;

	constructor(
		private http: Http,
		private router: Router) {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME
		});
	}

	public request(username: string, password: string) {
		let params = new URLSearchParams();
		let url = this.baseUrl + ENDPOINT_NAME;
		return this.http.post(url, { 
			userName: username,
			password: password
		 }).map(res => res.json()).subscribe(
			data => {
				localStorage.setItem('Authorization', data.token);
				this.http.get(this.baseUrl + "/userprofile").map(res => res.json()).subscribe(
					user => {
						localStorage.setItem('user', JSON.stringify(user));
						this.router.navigate(['timeentries']);
					},
					() => { }
				);
			},
			error => {
				if (error.status === 400 || error.status === 404) {
					alert('Wrong username or password!!');
				}
				if (error.status === 500) {
					alert('Internal server error!')
				}
			},
		)
	}

	public logout() {
		localStorage.removeItem('Authorization');
		localStorage.removeItem('user');
		this.router.navigate(['']);
	}

	public getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	loggedIn() {
		return tokenNotExpired('Authorization');
	}

	public isLoggedIn() {
		return this.getLoggedUserID() ? true : false;
	}

	public setLoggedUserID(id: number) {
		this.loggedUserID = id;
	}

	public getLoggedUserID(): number {
		let user = this.getUser();
		return user ? parseInt(user.id) : 0;
	}

	public getLoggedUsername() {
		return this.getUser()['userName'];
	}

	public getLoggedPassword() {
		return this.getUser()['password'];
	}

	public isAdmin() {
		return this.getUser()['admin'];
	}
}
