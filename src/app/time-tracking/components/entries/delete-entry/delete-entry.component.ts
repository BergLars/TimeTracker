import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { TimeTrackingEntryService } from '../../../../data';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.scss']
})
export class DeleteEntryComponent implements OnInit {

    public title: string;
    public message: string;
    public rowid: number;


    constructor(public dialogRef: MdDialogRef<DeleteEntryComponent>, 
    	public timeTrackingEntryService: TimeTrackingEntryService) {
    }
    onDelete(){
  	  this.timeTrackingEntryService.deleteTimeTrackingEntry(this.rowid);
  	}
    
  ngOnInit() {
  }

}
