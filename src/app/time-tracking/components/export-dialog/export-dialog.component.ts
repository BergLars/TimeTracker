import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdDatepickerModule, DateAdapter } from '@angular/material';
import { UserService, IClient, ClientService, TimeTrackingEntryService, IUser } from '../../../data';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-export-dialog',
	templateUrl: './export-dialog.component.html',
	styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
	public title: string;
	@Input() fromDate: any;
	@Input() toDate: any;
	@Input() myFilter: any;
	public path: string;
	public username: string;
	public userID: any;
	public exportURL: string;
	private user: IUser;
	@Input() users: IUser[] = [];
	public validFormat: boolean;
	public validLength: boolean;
	public baseUrl: string = environment.apiBaseUrl;

	constructor(
		public dialogRef: MdDialogRef<ExportDialogComponent>,
		public timeTrackingEntryService: TimeTrackingEntryService,
		public userService: UserService,
		public loginService: LoginService) {
	}

	ngOnInit() {
		this.loadUsers();
		this.myFilter = (d: Date): boolean => {
			const day = d.getDay();
			// Prevent Saturday and Sunday from being selected.
			return day !== 0 && day !== 6;
		}
	}

	public checkIfAdmin() {
		return this.loginService.isAdmin();
	}

	public userDropdown(value: string): void {
		this.userID = value;
	}

	public readDates(valueFrom: any, valueTo: any) {
		this.fromDate = valueFrom._selected;
		this.toDate = valueTo._selected;

		let validFrom = moment(this.fromDate).format('L');
		let validTo = moment(this.toDate).format('L');
		this.validFormat = moment(this.fromDate).isBefore(moment(this.toDate));
	}

	checkMandatoryFields() {
		if (this.fromDate === "" || this.toDate === "") {
			alert("Please check if all the fields are filled in");
		} else {
			this.checkFromDateAndToDate();
		}
	}

	checkFromDateAndToDate() {
		if (!this.validFormat) {
			alert("Please a valid Period");
		}
		else {
			this.dialogRef.close();
			this.ok();
		}
	}

	loadUsers() {
		this.userService.getUsers().then((users) => {
			this.users = users;
		});
	}

	refreshExportURL(id) {
		let validFrom = moment(this.fromDate).format('L');
		let validTo = moment(this.toDate).format('L');
		let fromDate = validFrom.substring(6, 10) + "/" + validFrom.substring(0, 2) + "/" + validFrom.substring(3, 5);
		let toDate = validTo.substring(6, 10) + "/" + validTo.substring(0, 2) + "/" + validTo.substring(3, 5);
		this.exportURL = this.baseUrl + "/export?fromDate=" +
			fromDate +
			"&toDate=" +
			toDate +
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
