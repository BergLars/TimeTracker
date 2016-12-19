import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { TimeTrackingEntryService, TimeTrackingEntry } from '../../../data';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  rows: Array<TimeTrackingEntry> = [];
  editing = {};
  loading: boolean;

  constructor(private timeTrackingEntryService: TimeTrackingEntryService) {
  }

  ngOnInit() {
    this.loadEntries();
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
    console.log(row, cell, cellValue);
  }

  private loadEntries() {
    this.loading = true;
    this.timeTrackingEntryService
      .getEntries()
      .then(items => {
        this.rows = items;
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  }


  private newEntry() {
    // this.rows.push(
    //   new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    // );
  }
}

