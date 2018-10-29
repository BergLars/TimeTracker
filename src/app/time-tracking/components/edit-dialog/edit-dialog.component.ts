import { Component, OnInit, Input, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { EditDialogService } from './edit-dialog.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IProject, ITask, IUser, UserService, IClient, RegistryService } from '../../../data';
import { DeleteEntryService } from '../entries/delete-entry/delete-entry.service';
import { LoginService } from '../../../login';
import { EntriesService } from 'app/time-tracking';

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
	public taskDescription: string;
	public projectName: string;
	public clientName: string;
	public projectID: any = null;
	public clientID: any = null;
	public taskID: any = null;
	editMode: boolean = false;
	public TASK: number = 1;
	public PROJECT: number = 2;
	public CLIENT: number = 3;
	public USER: number = 4;
	public result: any;
	public model: any = {};

	constructor(
		public dialogRef: MdDialogRef<EditDialogComponent>,
		public loginService: LoginService,
		private http: Http,
		public registryService: RegistryService,
		private deleteEntryService: DeleteEntryService,
		public entriesService: EntriesService) { }

	ngOnInit() {
		this.loadItems();
	}

	public createItems = [
		{ key: 'Edit a', id: 0},
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 }
	];

	public item: number = this.createItems[0].id;

	changeItemToBeCreated(event) {
		this.item = event.value;
	}

	public keyDownFunction(event) {
		if (event.key == 'Enter') {
			this.ok();
		}
	}

	toggleEditMode() {
		this.editMode = !this.editMode;
	}

	public ok() {
		if (this.loginService.loggedIn()) {
			if (this.item == this.TASK && this.model.taskDescription !== undefined && this.model.taskDescription !== "" ) {
				this.taskDescription = this.model.taskDescription;
				this.createTask();
			} else if (this.item == this.PROJECT && this.model.projectName !== undefined && this.model.projectName !== "") {
				this.projectName = this.model.projectName;
				this.createProject();
			} else if (this.item == this.CLIENT && this.model.clientName !== undefined && this.model.clientName !== "") {
				this.clientName = this.model.clientName;
				this.createClient();
			} else {
				alert("Please check if you have selected an item and filled in all fields");
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}

	}
	private loadItems() {
		if (this.loginService.loggedIn()) {
			this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
				results => {
					this.clients = results.sort(this.entriesService.propComparator('clientName'));
					this.clientID = this.clients[0].id;
				});

			this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
				results => {
					this.tasks = results.sort(this.entriesService.propComparator('taskDescription'));;
					this.taskID = this.tasks[0].id;
				});

			this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
				results => {
					this.projects = results.sort(this.entriesService.propComparator('projectName'));
					this.projectID = this.projects[0].id;
				});
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}
	}

	public createProject() {
		return this.http.put(this.baseUrl + "/projects/" + this.projectID, {
			projectName: this.projectName.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			this.registryService.entriesComponent.loadEntries();
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
	public createTask() {
		return this.http.put(this.baseUrl + "/tasks/" + this.taskID, {
			taskDescription: this.taskDescription.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			this.registryService.entriesComponent.loadEntries();
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
		return this.http.put(this.baseUrl + "/clients/" + this.clientID, {
			clientName: this.clientName.trim()
		}).subscribe(
			() => {
				this.dialogRef.close(true);
				this.registryService.entriesComponent.loadEntries();
			},
		error => {
			if (error.response.status === 400 || error.response.status === 404) {
				alert('Please check that fields are the correct input !');
				return Observable.of(undefined);
			} else if (error.response.status === 500) {
				alert('Internal server error !');
			}
		});
	}

	public deleteItem() {
		if (this.loginService.loggedIn()) {
			if (this.item == this.PROJECT) {
				return this.http.delete(this.baseUrl + "/projects/" + this.projectID)
					.subscribe(() => {
						this.dialogRef.close(true);
						this.registryService.entriesComponent.loadEntries();
					},
						(error) => {
							if (error.status === 400 || error.status === 404) {
								alert('Please check if a project is selected!');
								return Observable.of(undefined);
							}
							if (error.status === 500) {
								alert('This project is used on entries. Cannot be deleted')
							}
						});
			}
			if (this.item == this.TASK) {
				return this.http.delete(this.baseUrl + "/tasks/" + this.taskID)
					.subscribe(() => {
						this.dialogRef.close(true);
						this.registryService.entriesComponent.loadEntries();
					},
						(error) => {
							if (error.status === 400 || error.status === 404) {
								alert('Please check if a task is selected!');
								return Observable.of(undefined);
							}
							if (error.status === 500) {
								alert('This task is used on entries. Cannot be deleted')
							}
						});
			}
			if (this.item == this.CLIENT) {
				return this.http.delete(this.baseUrl + "/clients/" + this.clientID)
					.subscribe(() => {
						this.dialogRef.close(true);
						this.registryService.entriesComponent.loadEntries();
					},
						(error) => {
							if (error.status === 400 || error.status === 404) {
								alert('Please check if a client is selected!');
								return Observable.of(undefined);
							}
							if (error.status === 500) {
								alert('This client is used on entries. Cannot be deleted')
							}
						});
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}
	}

	private displayItems() {
		this.createItems.splice(1);
		this.createItems.splice(2);
		this.createItems.splice(3);
	}
}
