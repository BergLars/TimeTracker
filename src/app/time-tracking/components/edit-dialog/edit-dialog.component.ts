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
	public newTaskDescription: string;
	public newProjectName: string;
	public newClientName: string;
	public projectID: any = null;
	public clientID: any = null;
	public taskID: any = null;
	editMode: boolean = false;
	public TASK: number = 1;
	public PROJECT: number = 2;
	public CLIENT: number = 3;
	public USER: number = 4;
	public result: any;

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
		{ key: 'Task', id: 1 },
		{ key: 'Project', id: 2 },
		{ key: 'Client', id: 3 }
	];

	public item: number = this.createItems[0].id;

	changeItemToBeCreated(event) {
		this.item = event.target.value;
	}

	public keyDownFunction(event) {
		if (event.key == 'Enter') {
			this.checkMandatoryFields();
		}
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
		if (this.loginService.loggedIn()) {
			if (this.item == this.PROJECT) {
				if (this.newProjectName === "" || this.newProjectName === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
			}
			if (this.item == this.TASK) {
				if (this.newTaskDescription === "" || this.newTaskDescription === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
			}
			if (this.item == this.CLIENT) {
				if (this.newClientName === "" || this.newClientName === undefined) {
					alert("Please check if all the fields are filled in");
				} else {
					this.createItem();
				}
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

	public clientDropdown(value: string): void {
		this.clientID = value;
	}

	public projectDropdown(value: string): void {
		this.projectID = value;
	}

	public taskDropdown(value: string): void {
		this.taskID = value;
	}

	public createItem() {
		if (this.item == this.PROJECT) {
			return this.http.put(this.baseUrl + "/projects/" + this.projectID, {
				projectName: this.newProjectName.trim()
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
		if (this.item == this.TASK) {
			return this.http.put(this.baseUrl + "/tasks/" + this.taskID, {
				taskDescription: this.newTaskDescription.trim()
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
		if (this.item == this.CLIENT) {
			return this.http.put(this.baseUrl + "/clients/" + this.clientID, {
				clientName: this.newClientName.trim()
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
