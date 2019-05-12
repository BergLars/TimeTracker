import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Project, Client } from '../../../interfaces';
import { LoginService } from '../../../login';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { EntriesService } from '../entries/entries.service';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	public baseUrl: string = environment.apiBaseUrl;

	@Input() projects: Project[] = [];
	@Input() clients: Client[] = [];
	public title: string;
	public name: string;
	public user;
	projectOwner = null;	

	editMode: boolean = false;
	public PROJECT: number = 1;
	public CLIENT: number = 2;
	public isAdmin: boolean = false;
	public model: any = {};

	public createItems = [
		{ key: 'Create New', id: 0},
		{ key: 'Project', id: 1 },
		{ key: 'Client', id: 2 }
		];

	public item: number = this.createItems[0].id;

	constructor(
		public dialogRef: MatDialogRef<CreateDialogComponent>,
		public loginService: LoginService,
		private http: Http,
		private router: Router,
		public snackBar: MatSnackBar,
		public entriesService: EntriesService
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

	public ok() {
		if (this.loginService.loggedIn()) {
			 if (this.item == this.PROJECT && this.model.name !== undefined && this.model.name !== "") {
				this.name = this.model.name;
				this.createProject();
			} else if (this.item == this.CLIENT && this.model.name !== undefined && this.model.name !== "") {
				this.name = this.model.name;
				this.createClient();
			} else {
				alert("Please check if you have selected an item and filled in all fields");
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
		}
	}

	public createProject() {
		return this.http.post(this.baseUrl + "/projects", {
			projectName: this.name.trim(),
			projectOwner: this.projectOwner

		}).subscribe(() => {
			this.dialogRef.close(true);
			this.openSnackBar('Project ' + this.name.toUpperCase(), 'created !');
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
			clientName: this.name.trim()
		}).subscribe(() => {
			this.dialogRef.close(true);
			this.openSnackBar('Client ' + this.name.toUpperCase(), 'created !');
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
			this.createItems.splice(2);
		}
	}
}
