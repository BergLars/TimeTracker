import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { IProject, ITask, IClient, RegistryService } from '../../../data';
import { LoginService } from '../../../login';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	public baseUrl: string = environment.apiBaseUrl;

	@Input() projects: IProject[] = [];
	@Input() tasks: ITask[] = [];
	@Input() clients: IClient[] = [];
	public title: string;
	public taskDescription: string;
	public projectName: string;
	public clientName: string;
	public user;
	public username: string;
	public password: string;
	public confirmPassword: string;
	public adminRole: boolean;
	editMode: boolean = false;
	public TASK: number = 1;
	public PROJECT: number = 2;
	public CLIENT: number = 3;
	public USER: number = 4;
	public isAdmin: boolean = false;
	public model: any = {};

	public createItems = [
		{ key: 'Create New', id: 0},
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 },
		{ key: 'User', id: 4 }
	];

	public item: number = this.createItems[0].id;

	constructor(
		public dialogRef: MdDialogRef<CreateDialogComponent>,
		public loginService: LoginService,
		private http: Http,
		private router: Router,
		public registryService: RegistryService,
		public snackBar: MdSnackBar
	) { }

	ngOnInit() {
		this.isAdmin = this.loginService.isAdmin();
		this.displayItems();
	}

	changeItemToBeCreated(event) {
		this.item = event.value;
		console.log(event);
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public ok() {
		if (this.loginService.loggedIn()) {
			if (this.item == this.TASK && this.model.taskDescription !== undefined && this.model.taskDescription !== "" ) {
				this.taskDescription = this.model.taskDescription;
				this.createTask();
			}
			if (this.item == this.PROJECT && this.model.projectName !== undefined && this.model.projectName !== "") {
				this.projectName = this.model.projectName;
				this.createProject();
			}
			if (this.item == this.CLIENT && this.model.clientName !== undefined && this.model.clientName !== "") {
				this.clientName = this.model.clientName;
				this.createClient;
			}
			if (this.item == this.USER && this.model.username !== undefined && this.model.username !== ""
				&& this.password !== undefined && this.confirmPassword == undefined) {
				this.username = this.model.username;
				this.password = this.model.password;
				this.confirmPassword = this.model.confirmPassword;
				this.adminRole = this.model.isAdmin;
				this.checkUser();
			} else {
				alert("Please check if you have selected an item and filled in all fields");
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}
	}

	public checkUser() {
		if (this.item == this.USER) {
			if (this.password.length < 8) {
				alert("See password requirement !");
			}
			else if (this.password !== this.confirmPassword) {
				alert("Passwords are not the same !")
			}
			else {
				this.createUser();
			}
		} 
	}

	public createTask() {
		return this.http.post(this.baseUrl + "/tasks", {
			taskDescription: this.taskDescription.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			// this.registryService.entriesComponent.loadEntries();
			this.openSnackBar('Task ' + this.taskDescription.toUpperCase(), 'created !');
		},
		error => {
			if (error.response.status === 400 || error.response.status === 404) {
				alert('Please check that fields are the correct input !');
				return Observable.of(undefined);
			}
			if (error.response.status === 500) {
				alert('Internal server error !')
			}
		});
	}

	public createProject() {
		return this.http.post(this.baseUrl + "/projects", {
			projectName: this.projectName.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			// this.registryService.entriesComponent.loadEntries();
			this.openSnackBar('Project ' + this.projectName.toUpperCase(), 'created !');
		},
		error => {
			if (error.response.status === 400 || error.response.status === 404) {
				alert('Please check that fields are the correct input !');
				return Observable.of(undefined);
			}
			if (error.response.status === 500) {
				alert('Internal server error !')
			}
		});
	}

	public createClient() {
		return this.http.post(this.baseUrl + "/clients", {
			clientName: this.clientName.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			// this.registryService.entriesComponent.loadEntries();
			this.openSnackBar('Client ' + this.clientName.toUpperCase(), 'created !');
		},
		error => {
			if (error.response.status === 400 || error.response.status === 404) {
				alert('Please check that fields are the correct input !');
				return Observable.of(undefined);
			}
			if (error.response.status === 500) {
				alert('Internal server error !')
			}
		});
	}

	public createUser() {
		if (this.item == this.USER) {
			return this.http.post(this.baseUrl + "/userprofile", {
			userName: this.username.trim(),
			password: encodeURIComponent(this.password.trim()),
			admin: this.adminRole
		}).map(res => res.json())
		.subscribe(
			(data) => {
				this.dialogRef.close(true);
				// this.registryService.entriesComponent.loadEntries();
				this.openSnackBar('User ' + this.username.toUpperCase(), 'created !');
			},
			(error) => {
				if (error.status === 400 || error.status === 404) {
					alert('Please check that all fields have the correct input !');
				}
				if (error.status === 409) {
					alert('User already exists !');
				}
				if (error.status === 500) {
					alert('Internal server error !')
				}
			});
		}
	}

	public openSnackBar(message: string, action: string) {
		this.snackBar.open(message + ' ' + action, '', { duration: 2500 });
	}

	public keyDownFunction(event) {
		if (event.key == 'Enter') {
			this.ok();
		}
	}

	private displayItems() {
		if (!this.isAdmin) {
			this.createItems.splice(3);
		}
	}
}
