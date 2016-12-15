import { Component, OnInit } from '@angular/core';
import { TimeTrackingEntry} from '../data/timeTrackingEntry';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
	rows: Array<TimeTrackingEntry> = [];
  columns = [];
  editing = {};

  constructor() {}

 
  ngOnInit() {
    this.loadEntries();
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
  }

  private newEntry() {
    this.rows.push(
      new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    );
  }
}
