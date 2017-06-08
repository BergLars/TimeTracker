import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordDialogService } from './components/password-dialog/password-dialog.service';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	constructor(
		private router: Router,
		private entryDialogService: PasswordDialogService,
		private viewContainerRef: ViewContainerRef
	) { }

	ngOnInit() {
	}

	public openDialog() {
		this.entryDialogService.confirm('Update password', this.viewContainerRef);
	}
}