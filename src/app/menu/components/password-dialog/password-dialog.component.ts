import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginService } from '../../../login';
import { UserService } from '../../../data';
import { Router } from '@angular/router';
import { EntriesService } from '../../../time-tracking/components/entries/entries.service';

@Component({
	selector: 'app-password-dialog',
	templateUrl: './password-dialog.component.html',
	styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
	public title: string;
	public newPassword: string;
	public confirmPassword: string;
	public currentPassword: string;
	public userID: number;

	constructor(
		public dialogRef: MdDialogRef<PasswordDialogComponent>,
		public loginService: LoginService,
		public userService: UserService,
		public entriesService: EntriesService,
		private router: Router) { }

	ngOnInit() {
		this.userID = this.loginService.getLoggedUserID();
	}

	public getValues(valueCurrentPass: string, valueNewPass: string, valueConfirmPass: string) {
		this.currentPassword = valueCurrentPass;
		this.newPassword = valueNewPass;
		this.confirmPassword = valueConfirmPass;
	}

	checkMandatoryFields() {
		if (this.loginService.loggedIn()) {
			if (this.currentPassword === "" || this.newPassword === "" || this.confirmPassword === null) {
				alert("Please check if all the fields are filled in !");
			}
			else {
				this.updatePassword();
			}
		} else {
			alert("Your token has expired. Please log in again!");
			this.dialogRef.close(true);
			this.entriesService.entriesAreLoaded();
		}
	}

	public keyDownFunction(event) {
		if (event.keyCode == 13) {
			this.checkMandatoryFields();
		}
	}

	private updatePassword() {
		this.userService.updatePassword(encodeURIComponent(this.currentPassword), encodeURIComponent(this.newPassword), encodeURIComponent(this.confirmPassword)).map(res => res.json()).subscribe(
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
					this.router.navigate(['timeentries']);
				}
				else if (error.status === 500) {
					alert('Internal server error !')
				}
			}
		);
	}
} 
