import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialogRef, MdDatepickerModule, DateAdapter, MdDateFormats } from '@angular/material';
import { IUser, RegistryService } from '../../../data';
import { LoginService } from '../../../login';
import moment from 'moment/src/moment';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { EntriesService } from '../entries/entries.service';

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
	@Input() users: IUser[] = [];
	public validDatePeriod: boolean;
	public validLength: boolean;
	public baseUrl: string = environment.apiBaseUrl;
	@Input() inputFromDate: string;
	@Input() inputToDate: string;
	@Input() validDate: boolean = false;

	constructor(
		public dialogRef: MdDialogRef<ExportDialogComponent>,
		public loginService: LoginService,
		public http: Http,
		public entriesService: EntriesService,
		public dateAdapter: DateAdapter<Date>,
		public registryService: RegistryService) {
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

	public currentUserID(value: number): void {
		this.userID = value;
	}

	public readDates(valueFrom: any, valueTo: any) {
		if (valueFrom._selected) {
			let validDate = moment(valueFrom._selected).format('L');
			let currentDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
			this.fromDate = currentDate;
		}
		if (valueTo._selected) {
			let validDate = moment(valueTo._selected).format('L');
			let currentDate = validDate.substring(3, 5) + "." + validDate.substring(0, 2) + "." + validDate.substring(6, 10);
			this.toDate = currentDate;
		}
	}

	public getValues(valueFromDate: any, valueInputFromDate: any, valueToDate: any, valueInputToDate: any) {
		this.fromDate = valueFromDate;
		this.inputFromDate = valueInputFromDate.trim();
		this.toDate = valueToDate;
		this.inputToDate = valueInputToDate.trim();
		this.validDatePeriod = moment(this.inputToDate, 'YYYY-MM-DD').isBefore(moment(this.inputFromDate, 'YYYY-MM-DD'));
	}

	public readDatesOnInputField() {
		if (this.registryService.dateRequirement.test(this.inputFromDate) && this.registryService.dateRequirement.test(this.inputToDate)) {
			this.validDate = true;
		}
		else {
			this.validDate = false;
		}
	}

	public checkMandatoryFields() {
		if (this.inputFromDate === undefined || this.inputToDate === undefined) {
			alert("Please check if all the fields are filled in");
		}
		else if (this.validDate === false) {
			alert("Wrong date format !");
		}
		else if (this.validDatePeriod) {
			alert("Please a valid Period");
		}
		else {
			this.dialogRef.close();
			this.exportEntries();
		}
	}

	loadUsers() {
		if (this.loginService.loggedIn()) {
			this.http.get(this.baseUrl + "/userprofile/all").map(res => res.json()).subscribe(
				results => {
					this.users = results;
				});
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
			this.entriesService.entriesAreLoaded();
		}
	}

	refreshExportURL(id) {
		this.inputFromDate.trim();
		this.inputToDate.trim();
		let fromDate = this.inputFromDate.substring(6, 10) + "-" + this.inputFromDate.substring(3, 5) + "-" + this.inputFromDate.substring(0, 2);
		let toDate = this.inputToDate.substring(6, 10) + "-" + this.inputToDate.substring(3, 5) + "-" + this.inputToDate.substring(0, 2);
		this.exportURL = this.baseUrl + "/export?fromDate=" +
			fromDate +
			"&toDate=" +
			toDate +
			"&userprofileID=" + id;
		window.open(this.exportURL, '_blank');
	}

	public keyDownFunction(event) {
		if (event.key == 'Enter') {
			this.readDatesOnInputField();
			this.checkMandatoryFields();
		}
	}

	public exportEntries() {
		if (this.checkIfAdmin()) {
			this.refreshExportURL(this.userID);
		}
		else {
			let loggedUserID = this.loginService.getLoggedUserID();
			this.refreshExportURL(loggedUserID);
		}
	}
}