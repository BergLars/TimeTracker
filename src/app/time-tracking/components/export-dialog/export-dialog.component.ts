import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserService, IClient, ClientService, TimeTrackingEntryService, IUser } from '../../../data';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';
//import 'moment/locale/de';

@Component({
	selector: 'app-export-dialog',
	templateUrl: './export-dialog.component.html',
	styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
	public title: string;
	public fromDate: any;
	public toDate: any;
	public path: string;
	public username: string;
	public userID: any;
	public exportURL: string;
	private user: IUser;
	@Input() users: IUser[] = [];
	public validFormat: boolean;
	public validLength: boolean;

	constructor(
		public dialogRef: MdDialogRef<ExportDialogComponent>,
		public timeTrackingEntryService: TimeTrackingEntryService,
		public userService: UserService,
		public loginService: LoginService) {
	}

	ngOnInit() {
		this.loadUsers();
	}

	public checkIfAdmin() {
		return this.loginService.isAdmin();
	}

	public userDropdown(value: string): void {
		this.userID = value;
	}

	public getValues(valueFrom: string, valueTo: string) {
		// moment().locale('de');
		this.fromDate = valueFrom;
		this.toDate = valueTo;
		this.validLength = this.toDate.length > 9 && this.fromDate.length > 9;
		let validFrom = this.fromDate.substring(6, 10) + "/" + this.fromDate.substring(3, 5) + "/" + this.fromDate.substring(0, 2);
		let validTo = this.toDate.substring(6, 10) + "/" + this.toDate.substring(3, 5) + "/" + this.toDate.substring(0, 2);
		this.validFormat = moment(validFrom).isBefore(moment(validTo));
	}

	checkMandatoryFields() {
		if (this.fromDate === "" || this.toDate === "") {
			alert("Please check if all the fields are filled in");
		} else {
			this.checkFromDateAndToDate();
		}
	}

	checkFromDateAndToDate() {
		if (!this.validLength) {
			alert("Please a valid date Format");
		}
		else if (!this.validFormat) {
			alert("Please a valid Period");
		} else {
			this.ok();
		}
	}

	loadUsers() {
		this.userService.getUsers().then((users) => {
			this.users = users;
		});
	}

	refreshExportURL(id) {
		let validFrom = this.fromDate.substring(6, 10) + "/" + this.fromDate.substring(3, 5) + "/" + this.fromDate.substring(0, 2);
		let validTo = this.toDate.substring(6, 10) + "/" + this.toDate.substring(3, 5) + "/" + this.toDate.substring(0, 2);
		this.exportURL = "http://localhost:8081/export?fromDate=" +
			validFrom +
			"&toDate=" +
			validTo +
			"&userprofileID=" + id;
		window.open(this.exportURL, '_blank');
	}

	public ok() {
		if (this.checkIfAdmin()) {
			this.refreshExportURL(this.userID);
		}
		else {
			let loggedUserID = this.loginService.getLoggedUserID();
			this.refreshExportURL(loggedUserID);
		}
	}
}
