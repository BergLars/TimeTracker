import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginService } from '../../../login';
import { UserService } from '../../../data';
import { Router } from '@angular/router';

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
	// public encryptedPassword: string;

	constructor(
		public dialogRef: MdDialogRef<PasswordDialogComponent>,
		public loginService: LoginService,
		public userService: UserService,
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
		if (this.currentPassword === "" || this.newPassword === "" || this.confirmPassword === null) {
			alert("Please check if all the fields are filled in !");
		}
		else if (this.newPassword.length < 8) {
			alert("Password length should be > 8 !");
		}
		else {
			this.checkPasswords();
		}
	}

	checkPasswords() {
		if (this.newPassword !== this.confirmPassword) {
			alert("Passwords are not the same !")
		} else {
			// this.encryptedPassword = this.confirmPassword;
			this.ok();
		}
	}

	public ok() {

		// TODO
		this.userService.updatePassword(this.currentPassword, this.newPassword, this.confirmPassword).map(res => res.json()).subscribe(
			user => {
				this.dialogRef.close(true);
				this.loginService.logout();
			},
			error => {
				if (error.status === 500) {
					alert('Internal server error!')
				}
				if (error.status === 404 || error.status === 400) {
					alert('Wrong username or password!!');
					this.router.navigate(['entries']);
				}
			}
		);
	}
}
