import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IProject, ITask, IUser, ProjectService, TaskService, UserService, IClient, ClientService } from '../../../data';
import { LoginService } from '../../../login';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
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
	editMode: boolean = false;
	public TASK: number = 1;
	public PROJECT: number = 2;

	public CLIENT: number = 3;
	public result: any;
	private isAdmin: boolean;

	public createItems = [
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 }
	];

	public item: number = this.createItems[0].id;

	constructor(
		public dialogRef: MdDialogRef<CreateDialogComponent>,
		public projectService: ProjectService,
		public taskService: TaskService,
		public userService: UserService,
		public loginService: LoginService,
		public clientService: ClientService,
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

	public getValues(valueDesc: string, valueProjName: string, valueClient: string) {
		this.description = valueDesc;
		this.newProjectName = valueProjName;
		this.clientName = valueClient;
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
	}

	public validateForm(description, newProjectName, clientName, project, client) {
		this.getValues(description.value, newProjectName.value, clientName.value);
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
			this.projectService.createProject(this.newProjectName, this.clientID).then(() => {
				this.dialogRef.close(true);
			});
		}
		if (this.item == this.TASK) {
			this.taskService.createTask(this.description, this.projectID).then((response) => {
				this.dialogRef.close(true);
			});
		}
		if (this.item == this.CLIENT) {
			this.clientService.createClient(this.clientName).then(() => {
				this.dialogRef.close(true);
			});
		}
		this.router.navigate(['entries']);
		//window.location.reload();
	}

	private loadItems() {
		this.clientService.getClients().then((clients) => {
			this.clients = clients;
		});

		this.taskService.getTasks().then((tasks) => {
			this.tasks = tasks;
		});

		this.projectService.getProjects().then((projects) => {
			this.projects = projects;
		});
		if (!this.checkIfAdmin()) {
			this.createItems.splice(1);
			this.createItems.splice(2);
		}
	}
}
