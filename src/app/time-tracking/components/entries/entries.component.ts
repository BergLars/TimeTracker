import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { TimeTrackingEntry } from '../../../data';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @Input() items: TimeTrackingEntry[] = [];
  public editing = {};

  constructor() { }

  ngOnInit() { }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.items[row.$$index][cell] = event.target.value;
    console.log(row, cell, cellValue);
  }


  private newEntry() {
    // this.items.push(
    //   new TimeTrackingEntry('Choose your project', 'Enter Task here ', 0)
    // );
  }
}

