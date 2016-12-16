import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '.././user.service';

// webpack html imports
let template = require('./login.component.html');

@Component({
	selector: 'app-login',
	template: template
})
export class LoginComponent {
	constructor(private userService: UserService, private router: Router) { }

	onSubmit(username, password) {
		this.userService.login(username, password).subscribe((result) => {
			if (result) {
				this.router.navigate(['']);
			}
		});
	}
}