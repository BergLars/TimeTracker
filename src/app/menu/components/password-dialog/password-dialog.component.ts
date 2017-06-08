import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginService } from '../../../login';
import { UserService } from '../../../data';

@Component({
	selector: 'app-password-dialog',
	templateUrl: './password-dialog.component.html',
	styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
	public title: string;
	public newPassword: string;
	public confirmPassword: string;
	public userID: number;

	constructor(
		public dialogRef: MdDialogRef<PasswordDialogComponent>,
		public loginService: LoginService,
		public userService: UserService) { }

	ngOnInit() {
		this.userID = this.loginService.getLoggedUserID();
	}

	public getValues(valueNewPass: string, valueConfirmPass: string) {
		this.newPassword = valueNewPass;
		this.confirmPassword = valueConfirmPass;
	}

	checkMandatoryFields() {
		if (this.newPassword === "" || this.confirmPassword === null) {
			alert("Please check if all the fields are filled in");
		}
		else if (this.newPassword.length < 9) {
			alert("Password length should be > 9");
		} else {
			this.checkPasswords();
		}
	}

	checkPasswords() {
		if (this.newPassword === this.confirmPassword) {
			alert("Passwords are not the same.")
		} else {
			this.ok();
		}
	}

	public ok() {
		this.userService.updatePassword(this.userID, this.confirmPassword).then(() => {
			this.dialogRef.close(true);
		});
	}

}
