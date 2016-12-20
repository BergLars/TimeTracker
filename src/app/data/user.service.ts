import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, User } from '.';

const RESOURCE_NAME: string = 'person';
const ENDPOINT_NAME: string = 'persons';

@Injectable()
export class UserService implements IDataservice {

	public baseUrl: string = environment.apiBaseUrl;

	private loggedIn = false;

	constructor(private http: Http) {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME
		});

		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	login(username, password) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(
			'/login',
			JSON.stringify({ username, password }),
			{ headers }
			)
			.map(res => res.json())
			.map((res) => {
				if (res.success) {
					localStorage.setItem('auth_token', res.auth_token);
					this.loggedIn = true;
				}

				return res.success;
			});
	}

	logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	isLoggedIn() {
		return this.loggedIn;
	}

	public getUser(id: number): Promise<User> {
		return store.find(RESOURCE_NAME, id);
	}
}
