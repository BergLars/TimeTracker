import { Component, OnInit, Input, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { EditDialogService } from './edit-dialog.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IProject, ITask, IUser, ProjectService, TaskService, UserService, IClient, ClientService, RegistryService } from '../../../data';
import { DeleteEntryService } from '../entries/delete-entry/delete-entry.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
	public baseUrl: string = environment.apiBaseUrl;

	@Input() projects: IProject[] = [];
	@Input() tasks: ITask[] = [];
	@Input() clients: IClient[] = [];
	public title: string;
	public newTaskDescription: string;
	public newProjectName: string;
	public newClientName: string;
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

	

  	constructor(
  		public dialogRef: MdDialogRef<EditDialogComponent>,
  		public projectService: ProjectService,
		public taskService: TaskService,
		public clientService: ClientService,
		private http: Http,
		public registryService: RegistryService,
		private deleteEntryService: DeleteEntryService) { }

  	ngOnInit() {
  		this.loadItems();
  	}

	public createItems = [
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 }
	];

	public item: number = this.createItems[0].id;

	changeItemToBeCreated(event) {
		this.item = event.target.value;
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public validateForm(valueDesc: string, valueProjName: string, valueClient: string) {
		this.newTaskDescription = valueDesc;
		this.newProjectName = valueProjName;
		this.newClientName = valueClient;
	}

	public checkMandatoryFields() {
		if (this.item == this.PROJECT) {
			if (this.newProjectName === "" || this.newProjectName === undefined) {
				alert("Please check if all the fields are filled in");
			} else {
				//this.createItem();
			}
		}
		if (this.item == this.TASK) {
			if (this.newTaskDescription === "" || this.newTaskDescription === undefined) {
				alert("Please check if all the fields are filled in");
			} else {
				//this.createItem();
			}
		}
		if (this.item == this.CLIENT) {
			if (this.newClientName === "" || this.newClientName === undefined) {
				alert("Please check if all the fields are filled in");
			} else {
				//this.createItem();
			}
		}
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
  }

	private displayItems() {
		//if (!this.checkIfAdmin()) {
			this.createItems.splice(1);
			this.createItems.splice(2);
			this.createItems.splice(3);
		//}
	}

	
}
