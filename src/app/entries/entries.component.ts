import { Component, OnInit } from '@angular/core';
import { TimeTrackingEntry } from '../data/timeTrackingEntry';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  rows: Array<TimeTrackingEntry> = [];
  columns = [];
  editing = {};
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

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
    console.log(row, cell, cellValue);
  }

  private loadEntries() {
    this.rows = [
      new TimeTrackingEntry('FEC', 'Add translations to tutorialservice', 6.5),
      new TimeTrackingEntry('Evita', 'Add Button to UI', 1),
      new TimeTrackingEntry('FEC', 'Add deathdate to UI', 0.5)
    ];
    this.columns = [
      { prop: 'project' },
      { name: 'task' },
      { name: 'time' }
    ];

    /*    this.columns = [
          { prop: 'id' },
          { name: 'Person ID' },
          { name: 'Task ID ' },
          { name: 'Start Date' },
          { name: 'End Date' }
    */
    /*    this.rows = [
          { id: 1, personId: 2, taskId: 2, startDate: '2016-12-18', endDate: 'null' },
          { id: 1, personId: 2, taskId: 2, startDate: '2016-12-18', endDate: 'null' }
        ];*/
  }

  makeRequest(): void {
    this.loading = true;
    this.http.get('http://mojito.dev.fluance.net:8080/timetracker/Entries')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }

  private newEntry() {
    this.rows.push(
      new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    );
  }
}

