import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordDialogService } from './components/password-dialog/password-dialog.service';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { DeleteUserService } from './components/delete-user/delete-user.service';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { LoginService } from '../login';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	@Input() isAdmin: boolean = false;

	constructor(
		private router: Router,
		private passwordDialogService: PasswordDialogService,
		private deleteUserService: DeleteUserService,
		private viewContainerRef: ViewContainerRef,
		private loginService: LoginService
	) { }

	ngOnInit() {
	}

	public openChangePasswordDialog() {
		if (this.loginService.loggedIn()) {
			this.passwordDialogService.confirm('Update password', this.viewContainerRef);
		} else {
			alert("Your token has expired. Please log in again!");
			this.loginService.logout();
		}
	}
	public openDeleteUserDialog() {
		this.deleteUserService.openDeleteUserDialog('Delete', this.viewContainerRef);
	}

	public checkIfAdmin() {
		this.isAdmin = this.loginService.isAdmin();
	}

	public logout() {
		this.loginService.logout();
	}
}