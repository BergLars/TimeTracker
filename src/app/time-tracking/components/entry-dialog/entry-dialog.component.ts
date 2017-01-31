import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html'
})
export class EntryDialogComponent implements OnInit {

	public title: string;

  constructor(public dialogRef: MdDialogRef<EntryDialogComponent>) { }

  ngOnInit() {
  }

}
