import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

// webpack html imports
let template = require('./search-dialog.component.html');

@Component({
  selector: 'app-search-dialog',
  template: template
})
export class SearchDialogComponent {

  constructor(public dialogRef: MdDialogRef<SearchDialogComponent>) { }

}