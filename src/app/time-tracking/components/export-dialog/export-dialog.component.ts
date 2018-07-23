import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialogRef, MdDatepickerModule, DateAdapter, MdDateFormats } from '@angular/material';
import { IUser, RegistryService, DatesService } from '../../../data';
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
	// @Input() date = new FormControl(new Date());

	constructor(
		public dialogRef: MdDialogRef<ExportDialogComponent>,
		public loginService: LoginService,
		public http: Http,
		public entriesService: EntriesService,
		public dateAdapter: DateAdapter<Date>,
		public registryService: RegistryService,
		public datesService: DatesService) {
	}

	ngOnInit() {
		this.loadUsers();
	}

	public currentUserID(value: number): void {
		this.userID = value;
	}

	public checkIfAdmin() {
		return this.loginService.isAdmin();
	}

	public readDates(valueFrom: any, valueTo: any) {
		if (valueFrom._selected) {
			this.fromDate = this.datesService.currentDateValue(valueFrom);
		}
		if (valueTo._selected) {
			this.fromDate = this.datesService.currentDateValue(valueTo);
		}
	}

	public getValues(valueFromDate: any, valueInputFromDate: any, valueToDate: any, valueInputToDate: any) {
		this.fromDate = valueFromDate;
		this.inputFromDate = valueInputFromDate.trim();
		this.toDate = valueToDate;
		this.inputToDate = valueInputToDate.trim();
		let fromDate = this.inputFromDate.substring(6, 10) + "-" + this.inputFromDate.substring(3, 5) + "-" + this.inputFromDate.substring(0, 2);
		let toDate = this.inputToDate.substring(6, 10) + "-" + this.inputToDate.substring(3, 5) + "-" + this.inputToDate.substring(0, 2);
		this.validDatePeriod = this.datesService.isValidDatePeriod(fromDate, toDate);
	}

	public readDatesOnInputField() {
		this.validDate = this.datesService.isValidDate(this.inputFromDate, this.inputToDate);
	}

	public checkMandatoryFields() {
		if (this.inputFromDate === undefined || this.inputToDate === undefined || this.inputFromDate === '' || this.inputToDate === '') {
			alert("Please check if all the fields are filled in");
		}
		else if (!this.validDate) {
			alert("Wrong date format !");
		}
		else if (!this.validDatePeriod) {
			alert("Please select a valid period");
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

	refreshExportAllURL() {
		this.inputFromDate.trim();
		this.inputToDate.trim();
		let fromDate = this.inputFromDate.substring(6, 10) + "-" + this.inputFromDate.substring(3, 5) + "-" + this.inputFromDate.substring(0, 2);
		let toDate = this.inputToDate.substring(6, 10) + "-" + this.inputToDate.substring(3, 5) + "-" + this.inputToDate.substring(0, 2);
		this.exportURL = this.baseUrl + "/export/all?fromDate=" +
			fromDate +
			"&toDate=" +
			toDate;
		window.open(this.exportURL, '_blank');
	}

	public keyDownFunction(event) {
		if (event.key == 'Enter') {
			this.readDatesOnInputField();
			this.checkMandatoryFields();
		}
	}

	public exportEntries() {
		if (this.loginService.isAdmin()) {
			if (this.userID === 'all')
				this.refreshExportAllURL();
			this.refreshExportURL(this.userID);
		}
		else {
			let loggedUserID = this.loginService.getLoggedUserID();
			this.refreshExportURL(loggedUserID);
		}
	}
}