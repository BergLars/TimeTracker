import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MyDatePickerModule } from 'mydatepicker';
import { Angular2DataTableModule } from 'angular2-data-table';
import { DataTableModule } from "angular2-datatable";
import { AlertModule, DropdownModule, ModalModule, TimepickerModule, TabsModule, DatepickerModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent, DatepickerComponent, DialogComponent, TimepickerComponent } from './common';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService } from './data';
import { SearchDialogComponent, ExportComponent, SidebarComponent, EntriesComponent } from './time-tracking';
import { QueryformComponent } from './queryform/queryform.component';
import { ContainerComponent } from './container/container.component';
import { routes } from './routes';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DateComponent,
    SearchDialogComponent,
    ExportComponent,
    SidebarComponent,
    EntriesComponent,
    DialogComponent,
    TimepickerComponent,
    DatepickerComponent,
    QueryformComponent,
    ContainerComponent,
    ProfileComponent,
    TimeTrackingComponent
  ],
  entryComponents: [
    SearchDialogComponent
  ],
  imports: [
    Angular2DataTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
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
  providers: [ProjectService, TaskService, TimeTrackingEntryService, UserService, LoggedInGuard, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);