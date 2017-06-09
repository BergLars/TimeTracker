import { Component } from '@angular/core';

import { LoginService } from './login.service';

// webpack html imports
let template = require('./login.component.html');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	constructor(private loginService: LoginService) { }

	public getUsernamePassword(value: string, value1: string) {
		this.username = value;
		this.password = value1;

		this.loginService.request(this.username, encodeURIComponent(this.loginService.encryptPassword(this.password)));
	}
}