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
	model: any = {};
	constructor(private loginService: LoginService, private router: Router) {
		let token = localStorage.getItem('Authorization');

		if (token) {
			this.router.navigate(['timeentries']);
		}
	}
	
	ok() {	
    	this.loginService.request(this.model.username, encodeURIComponent(this.model.password));
  }
}
