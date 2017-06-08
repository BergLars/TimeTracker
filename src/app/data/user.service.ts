import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { store } from './datastore';
import { IDataservice, IUser } from '.';

const RESOURCE_NAME: string = 'user';
const ENDPOINT_NAME: string = 'userprofiles';

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
	}

	public getUser(id: number): Promise<IUser> {
		return store.find(RESOURCE_NAME, id);
	}

	public getUsers(): Promise<IUser[]> {
		return store.findAll(RESOURCE_NAME);
	}

	public updatePassword(id: number, confirmPassword: string): Promise<IUser> {
		return store.update(RESOURCE_NAME, id, { confirmPassword: confirmPassword });
	}

	public isLoggedIn() {
		return this.loggedIn;
	}
}
