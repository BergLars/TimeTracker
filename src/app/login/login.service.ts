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
	private user: any;

	public baseUrl: string = environment.apiBaseUrl;

	private loggedIn = false;
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

	public getUserByUsername(username: string): Promise<IUser>{
		return store.find(RESOURCE_NAME, username);
	}

	public compareCredentials(username: string, password: string){
  		if( username !== undefined){
			this.getUserByUsername(username).then(result => { 
				this.user = result; 
			// if( this.user.username == username){
			// 	alert('Your username doesn\'t exist!');
			// }
			if( this.user.password === password) {
				alert('Hello ' + username + ', your are logged in!' + this.user.id + this.user.pourcentageOfWork);
				this.router.navigateByUrl('/timetracking');
			}else{
  				alert('Your password is wrong!');
  	// 		};
  			}}).then(() => {
		      // Get user's time tracking entries
		      return this.timeTrackingEntryService.getTimeTrackingEntriesByUser(this.user)
		      // return this.timeTrackingEntryService.getTimeTrackingEntries()
		        .then(result => {
		        	this.entries = result;
		        });
		    })
		    .then(result => {
		        this.isLoading = false;
		    })
		    .catch(error => {
		        this.isLoading = false;
		    });
		}	
	}
}
