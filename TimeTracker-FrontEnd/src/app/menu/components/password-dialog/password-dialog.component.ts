import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../../../login';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { EntriesService } from '../../../time-tracking/components/entries/entries.service';
import { Http } from '@angular/http';

@Component({
	selector: 'app-password-dialog',
	templateUrl: './password-dialog.component.html',
	styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
	public baseUrl: string = environment.apiBaseUrl;

	public title: string;
	public userID: number;
	model: any = {};

	constructor(
		public dialogRef: MatDialogRef<PasswordDialogComponent>,
		public loginService: LoginService,
		private http: Http,
		public entriesService: EntriesService,
		private router: Router) { }

	ngOnInit() {
		this.userID = this.loginService.getLoggedUserID();
	}

	private ok() {
		if (this.loginService.loggedIn()) {
			this.updatePassword(this.model.currentPassword, this.model.newPassword, this.model.confirmPassword).map(res => res.json()).subscribe(
				user => {
					this.dialogRef.close(true);
					this.loginService.logout();
				},
				error => {
					if (error.status === 400 || error.status === 404) {
						alert("Passwords are not the same !");
						this.router.navigate(['timeentries']);
					}
					else if (error.status === 412) {
						alert("Wrong current password or See password requirement !");
						this.model.confirmPassword ="";
						this.router.navigate(['timeentries']);
					}
					else if (error.status === 500) {
						alert('Internal server error !')
					}
				}
			);
		} else {
			alert("Your token has expired. Please log in again");
			this.loginService.logout();
		}
	}

	public updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
		let params = new URLSearchParams();
		let url = this.baseUrl + '/userprofile';
		params.set('currentPassword', currentPassword);
		params.set('newPassword', newPassword);
		params.set('confirmPassword', confirmPassword);
		console.log(this.http.get(url + "/updatePassword", { search: params }));
		return this.http.get(url + "/updatePassword", { search: params });
	}
} 
