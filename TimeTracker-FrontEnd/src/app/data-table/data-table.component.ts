import { Component, OnInit } from '@angular/core';     
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';


@Component({
  template: `
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  `
})

@NgModule({
  imports: [
    Ng2SmartTableModule,
  ]
})

export class DataTableComponent implements OnInit {

  constructor() { }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  ngOnInit() {
  }

}
