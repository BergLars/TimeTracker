import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../data';

// webpack html imports
let template = require('./login.component.html');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	public username: string;
	public password: string;

	constructor(private userService: UserService, private router: Router) { }

	onSubmit(username, password) {
		this.userService.login(username, password).subscribe((result) => {
			if (result) {
				this.router.navigate(['']);
			}
		});
	}

	public getUsernamePassword(value: string, value2: string) {
		this.username = value;
		this.password = value2;
	}
}