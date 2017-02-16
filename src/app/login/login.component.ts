import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
	private log: string;
	private result: boolean;

	constructor(private loginService: LoginService, private router: Router) { }

	public getUsernamePassword(value: string, value1: string) {
		this.username = value;
		this.password = value1;
		this.loginService.compareCredentials(this.username, this.password);
		this.log = this.username + ' ' + this.password;
	}
}