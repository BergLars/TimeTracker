import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, IUser } from '.';

const RESOURCE_NAME: string = 'user';
const ENDPOINT_NAME: string = 'userprofile';

@Injectable()
export class UserService implements IDataservice {
	public baseUrl: string = environment.apiBaseUrl;
	private loggedIn = false;

	constructor() {
		// Define a Mapper for a "Project" resource
		let resource = store.defineMapper(RESOURCE_NAME, {
			basePath: this.baseUrl,
			endpoint: ENDPOINT_NAME,
			cacheResponse: false,
			bypassCache: true,
		});
	}

	public getUser(id: number): Promise<IUser> {
		return store.find(RESOURCE_NAME, id);
	}

	public getUsers(): Promise<IUser[]> {
		let endpoint = '/' + ENDPOINT_NAME + '/all';
		return store.findAll(RESOURCE_NAME, {}, {
			endpoint: endpoint,
			cacheResponse: false,
			bypassCache: true
		});
	}

	public updatePassword(id: number, confirmPassword: string): Promise<IUser> {
		return store.update(RESOURCE_NAME, id, { confirmPassword: confirmPassword });
	}

	public updateUser(id: number, password: string, user: any): Promise<IUser> {
		return store.update(RESOURCE_NAME, id, { password: password, isAdmin: user['admin'], emplomentDegree: user['employmentDegree'], username: user['username'] });
	}

	public isLoggedIn() {
		return this.loggedIn;
	}
}