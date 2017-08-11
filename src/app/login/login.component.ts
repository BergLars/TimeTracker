import { Component } from '@angular/core';

import { LoginService } from './login.service';
import { Router } from '@angular/router';

// webpack html imports
let template = require('./login.component.html');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	constructor(private loginService: LoginService, private router: Router) {
		let token = localStorage.getItem('Authorization');

		if (token) {
			this.router.navigate(['entries']);
		}
	}

	public getUsernamePassword(value: string, value1: string) {
		this.username = value;
		this.password = value1;

		this.loginService.request(this.username, encodeURIComponent(this.password));
	}

	public keyDownFunction(event) {
	}
}