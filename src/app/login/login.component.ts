import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';

// webpack html imports
let template = require('./login.component.html');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	constructor(private loginService: LoginService, private router: Router) { }

	public getUsernamePassword(value: string, value1: string) {

		this.username = value;
		this.password = value1;

		var salt = "Michaël";

		//encrypt
		var encrypted = CryptoJS.AES.encrypt(this.password, salt);
		var secureUsercreds =
			{
				username: this.username,
				password: encrypted
			};
		this.loginService.request(this.username, encodeURIComponent(secureUsercreds.password));
	}

	public changePassword(){
		this.router.navigate(['change-password']);
	}
}