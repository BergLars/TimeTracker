import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DateComponent } from './date/date.component';
import { SearchComponent } from './search/search.component';
import { ExportComponent } from './export/export.component';
import { EntryComponent } from './entry/entry.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EntriesComponent } from './entries/entries.component';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DateComponent,
    SearchComponent,
    ExportComponent,
    EntryComponent,
    SidebarComponent,
    EntriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    MyDatePickerModule,
    AlertModule,
    DropdownModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
