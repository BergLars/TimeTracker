import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	rows = [];
	columns = [];
	http: Http;
	data: Object;
	loading: boolean;

	constructor(http: Http) {
		this.http = http;
	}

	ngOnInit() {
		this.loadEntries();
		// this.makeRequest();
	}

	private loadEntries() {

		this.columns = [
			{ prop: 'id' },
			{ name: 'Person ID' },
			{ name: 'Task ID ' },
			{ name: 'Start Date' },
			{ name: 'End Date' }
		];

		this.rows = [
			{ id: 1, personId: 2, taskId: 2, startDate: '2016-12-18', endDate: 'null' },
			{ id: 1, personId: 2, taskId: 2, startDate: '2016-12-18', endDate: 'null' }
		];
	}
	makeRequest(): void {
		this.loading = true;
		this.http.request('http://mojito.dev.fluance.net:8080/timetracker/Persons')
			.subscribe((res: Response) => {
				this.data = res.json();
				this.loading = false;
			});
	}
}