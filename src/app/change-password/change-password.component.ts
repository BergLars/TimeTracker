import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login';
import { UserService } from '../data';
import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
	private username: string;
	private currentPassword: string;
	private newPassword: string;
	private confirmPassword: string;

	constructor(
		private loginService: LoginService,
		private userService: UserService,
		private router: Router) { }

	public changePassword(value: string, value1: string, value2: string, value3: string) {

		this.username = value;
		this.currentPassword = value1;
		this.newPassword = value2;
		this.confirmPassword = value3;
	}

	public cancel(){
		this.router.navigate(['']);
	}
}
