import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { IProject, ITask, IUser, ProjectService, TaskService, UserService, IClient, ClientService } from '../../../data';
import { LoginService } from '../../../login';

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
	public user: IUser;
	public projectID: any;
	public clientID: any;
	editMode: boolean = false;

	private createItems = [
		{ key: 'Project', id: 1 },
		{ key: 'Task', id: 2 }
	];

	public item: number = this.createItems[0].id;

	constructor(
		public dialogRef: MdDialogRef<CreateDialogComponent>,
		public projectService: ProjectService,
		public taskService: TaskService,
		public userService: UserService,
		public loginService: LoginService,
		public clientService: ClientService
	) { }

	ngOnInit() {
		this.projectService.getProjects().then((projects) => {
			this.projects = projects;
		});
		this.taskService.getTasks().then((tasks) => {
			this.tasks = tasks;
		});
		this.clientService.getClients().then((clients) => {
			this.clients = clients;
		});
	}

	changeItemToBeCreated(event) {
		this.item = event.target.value;
		this.toggleEditMode();
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public getValues(valueDesc: string, valueProjName: string) {
		this.description = valueDesc;
		this.newProjectName = valueProjName;
	}

	public projectDropdown(value: string): void {
		this.projectID = value;
	}

	public clientDropdown(value: string): void {
		this.clientID = value;
	}

	checkMandatoryFields() {
		if (!this.editMode) {
			if (this.newProjectName === "" || this.clientID === null) {
				alert("Please check if all the fields are filled in");
			} else {
				this.description = "";
				this.ok();
			}
		}
		if (this.editMode) {
			if (this.description === "" || this.projectID === null) {
				alert("Please check if all the fields are filled in");
			} else {
				this.newProjectName = "";
				this.ok();
			}
		}
	}

	public ok() {
		if (!this.editMode) {
			this.projectService.createProject(this.newProjectName, this.clientID).then(() => {
				this.dialogRef.close(true);
			});
		}
		if (this.editMode) {
			this.taskService.createTask(this.description, this.projectID).then(() => {
				this.dialogRef.close(true);
			});
		}
	}

}
