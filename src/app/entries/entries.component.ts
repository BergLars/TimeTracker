import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
	rows = [];
  columns = [];

  constructor() { }

  ngOnInit() {
    this.loadEntries();
  }

  private loadEntries() {
    this.rows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' }
    ];
    this.columns = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'Company' }
    ];
  }
}
