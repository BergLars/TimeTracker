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
	public newTaskDescription: string;
	public newProjectName: string;
	public newClientName: string;
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
	model: any = {};

	public createItems = [
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
		this.item = event.target.value;
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public validateForm(valueDesc: string, valueProjName: string, valueClient: string, valueUsername: string, valuePassw: string, valueConfirmPass: string, valueIsAdmin: any) {
		this.newTaskDescription = valueDesc;
		this.newProjectName = valueProjName;
		this.newClientName = valueClient;
		this.username = valueUsername;
		this.password = valuePassw;
		this.confirmPassword = valueConfirmPass;
		this.adminRole = valueIsAdmin.checked;
	}

	public checkMandatoryFields() {
		if (this.loginService.loggedIn()) {
			if (this.item == this.PROJECT) {
				if (this.newProjectName === "" || this.newProjectName === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
			} else if (this.item == this.TASK) {
				if (this.newTaskDescription === "" || this.newTaskDescription === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
			} else if (this.item == this.CLIENT) {
				if (this.newClientName === "" || this.newClientName === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
			} else if (this.item == this.USER) {
				if (this.username === "" || this.password === "" || this.confirmPassword === "" || this.adminRole === undefined) {
					alert("Please check if all the fields are filled in");
				}
				else if (this.password.length < 8) {
					alert("See password requirement !");
				}
				else if (this.password !== this.confirmPassword) {
					alert("Passwords are not the same !")
				}
				else {
					this.createItem();
				}
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}
	}

	public createItem() {
		if (this.item == this.PROJECT) {
			return this.http.post(this.baseUrl + "/projects", {
				projectName: this.newProjectName.trim()
			}).subscribe(() => {
				this.dialogRef.close(true);
				// this.registryService.entriesComponent.loadEntries();
				this.openSnackBar('Project ' + this.newProjectName.toUpperCase(), 'created !');
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
		} else if (this.item == this.TASK) {
			return this.http.post(this.baseUrl + "/tasks", {
				taskDescription: this.newTaskDescription.trim()
			}).subscribe(() => {
				this.dialogRef.close(true);
				// this.registryService.entriesComponent.loadEntries();
				this.openSnackBar('Task ' + this.newTaskDescription.toUpperCase(), 'created !');
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
		} else if (this.item == this.CLIENT) {
			return this.http.post(this.baseUrl + "/clients", {
				clientName: this.newClientName.trim()
			}).subscribe(() => {
				this.dialogRef.close(true);
				// this.registryService.entriesComponent.loadEntries();
				this.openSnackBar('Client ' + this.newClientName.toUpperCase(), 'created !');
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

		if (this.item == this.USER) {
			return this.http.post(this.baseUrl + "/userprofile",
				{
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
			this.checkMandatoryFields();
		}
	}

	private displayItems() {
		if (!this.isAdmin) {
			this.createItems.splice(3);
		}
	}
}
