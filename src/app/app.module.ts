import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MyDatePickerModule } from 'mydatepicker';
import { Angular2DataTableModule } from 'angular2-data-table';
import { DataTableModule } from "angular2-datatable";
import { AlertModule, DropdownModule, ModalModule, TimepickerModule, TabsModule, DatepickerModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DatepickerComponent } from './common';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService } from './data';
import { SearchDialogComponent, ExportComponent, SidebarComponent, EntriesComponent, TimeTrackingComponent, EntryDialogComponent, EntryDialogService, DeleteEntryComponent, DeleteEntryService, UpdateDialogComponent, UpdateDialogService} from './time-tracking';
import { QueryformComponent } from './queryform/queryform.component';
import { routes } from './routes';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile';
import { LoginComponent, LoginService } from './login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchDialogComponent,
    ExportComponent,
    SidebarComponent,
    EntriesComponent,
    DatepickerComponent,
    QueryformComponent,
    ProfileComponent,
    TimeTrackingComponent,
    EntryDialogComponent,
    DeleteEntryComponent,
    UpdateDialogComponent
  ],
  entryComponents: [
    SearchDialogComponent,
    EntryDialogComponent,
    DeleteEntryComponent,
    UpdateDialogComponent
  ],
  imports: [
    Angular2DataTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    // FlexLayoutModule.forRoot(),
    MyDatePickerModule,
    AlertModule,
    DropdownModule,
    ModalModule,
    TimepickerModule,
    DataTableModule,
    TabsModule,
    DatepickerModule,
    TypeaheadModule    
  ],
  providers: [ProjectService, TaskService, TimeTrackingEntryService, UserService, LoggedInGuard, ProfileService, LoginService, EntryDialogService, DeleteEntryService, UpdateDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);