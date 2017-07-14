import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IProject, ITask, IUser, ProjectService, TaskService, UserService, IClient, ClientService } from '../../../data';
import { LoginService } from '../../../login';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

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
	public description: string;
	public newProjectName: string;
	public clientName: string;
	public user;
	public projectID: any;
	public clientID: any;
	public username: string;
	public password: string;
	public confirmPassword: string;
	public employmentDegree: number;
	public adminRole: boolean;

	editMode: boolean = false;
	public TASK: number = 1;
	public PROJECT: number = 2;
	public CLIENT: number = 3;
	public USER: number = 4;
	public result: any;
	private isAdmin: boolean;

	public createItems = [
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 },
		{ key: 'User', id: 4 }
	];

	public item: number = this.createItems[0].id;

	constructor(
		public dialogRef: MdDialogRef<CreateDialogComponent>,
		public projectService: ProjectService,
		public taskService: TaskService,
		public userService: UserService,
		public loginService: LoginService,
		public clientService: ClientService,
    	private http: Http,
		private router: Router
	) { }

	ngOnInit() {
		this.loadItems();
	}

	changeItemToBeCreated(event) {
		this.item = event.target.value;
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public getValues(valueDesc: string, valueProjName: string, valueClient: string, valueUsername: string, valuePassw: string, valueConfirmPass: string, valueEmploy: number, valueIsAdmin: boolean) {
		this.description = valueDesc;
		this.newProjectName = valueProjName;
		this.clientName = valueClient;
		this.username = valueUsername;
		this.password = valuePassw;
		this.confirmPassword = valueConfirmPass;
		this.employmentDegree = valueEmploy;
		this.adminRole = valueIsAdmin;
	}

	public projectDropdown(value: string): void {
		this.projectID = value;
	}

	public clientDropdown(value: string): void {
		this.clientID = value;
	}

	checkMandatoryFields() {
		if (this.item == this.PROJECT) {
			if (this.newProjectName === "" || this.clientID === null || this.clientID === "undefined") {
				alert("Please check if all the fields are filled in");
			} else {
				this.description = "";
				this.createItem();
			}
		}
		if (this.item == this.TASK) {
			if (this.description === "" || this.projectID === null || this.projectID === "undefined") {
				alert("Please check if all the fields are filled in");
			} else {
				this.newProjectName = "";
				this.createItem();
			}
		}
		if (this.item == this.CLIENT) {
			if (this.clientName === "") {
				alert("Please check if all the fields are filled in");
			} else {
				this.createItem();
			}
		}
		if (this.item == this.USER) {
			if (this.username === "" || this.password === "" || this.confirmPassword === "" || this.employmentDegree === undefined || this.adminRole === undefined) {
				alert("Please check if all the fields are filled in");
			}
			else if (this.password.length < 8) {
				alert("Password length should be at least 9 !");
			}
			else if (this.password !== this.confirmPassword) {
				alert("Passwords are not the same !")
			}
			else if (!(this.employmentDegree <= 1 && this.employmentDegree > 0)) {
				alert("Employment degree should be between 0.10 and 1.0 !");
			}
			else {
				this.createItem();
			}
		}
	}

	public validateForm(description, newProjectName, clientName, project, client, username, password, confirmPassword, employmentDegree, adminRole) {
		this.getValues(description.value, newProjectName.value, clientName.value, username.value, password.value, confirmPassword.value, employmentDegree.value, adminRole.checked);
		this.projectDropdown(project.value);
		this.clientDropdown(client.value);
		this.checkMandatoryFields();
	}

	public checkIfAdmin() {
		this.showData();
		return this.isAdmin = this.loginService.isAdmin();
	}

	public showData() {
		this.user = this.loginService.getUser();
	}

	public createItem() {
		if (this.item == this.PROJECT) {

			return this.http.post(this.baseUrl + "/projects", 
				{ projectName: this.newProjectName, 
					clientID: this.clientID
				}).subscribe(() => {
				this.dialogRef.close(true);
			});
		}
		if (this.item == this.TASK) {
			return this.http.post(this.baseUrl + "/tasks", {taskDescription: this.description, projectID: this.projectID}).subscribe(() => {
				this.dialogRef.close(true);
			});
		}
		if (this.item == this.CLIENT) {
			return this.http.post(this.baseUrl + "/clients", { clientName: this.clientName}).subscribe(() => {
				this.dialogRef.close(true);
			});
		}
		if (this.item == this.USER) {
			return this.http.post(this.baseUrl + "/userprofile", 
				{ userName: this.username, 
					password: this.password, 
					employmentDegree: this.employmentDegree, 
					admin: this.adminRole
				}).subscribe(() => {
					this.dialogRef.close(true);
				},
				error => {
					if (error.response.status === 400 || error.response.status === 404) {
						alert('Please check that fields are the correct input !');
					}
					if (error.response.status === 409) {
						alert('Username already exists !');
					}
					if (error.response.status === 500) {
						alert('Internal server error !')
					}
					this.dialogRef.close(true);
				});
		}
		this.router.navigate(['entries']);
	}

	private loadItems() {

		this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
      	results => {
      		this.clients = results;
      	});

		this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
      	results => {
      		this.tasks = results;
      	});

		this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
      	results => {
      		this.projects = results;
      	});

		if (!this.checkIfAdmin()) {
			this.createItems.splice(1);
			this.createItems.splice(2);
			this.createItems.splice(3);
		}
	}
}
