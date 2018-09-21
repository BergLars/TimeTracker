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
	public userID: number;
	model: any = {};

	constructor(
		public dialogRef: MdDialogRef<PasswordDialogComponent>,
		public loginService: LoginService,
		public userService: UserService,
		public entriesService: EntriesService,
		private router: Router) { }

	ngOnInit() {
		this.userID = this.loginService.getLoggedUserID();
	}

	private ok() {
		if (this.loginService.loggedIn()) {
			this.userService.updatePassword(encodeURIComponent(this.model.currentPassword), encodeURIComponent(this.model.newPassword), encodeURIComponent(this.model.confirmPassword)).map(res => res.json()).subscribe(
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
} 
