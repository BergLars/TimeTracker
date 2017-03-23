import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
// import { MyDatePickerModule } from 'mydatepicker';
// import { Angular2DataTableModule } from 'angular2-data-table';
// import { DataTableModule } from "angular2-datatable";
import { AlertModule, DropdownModule, ModalModule, TimepickerModule, TabsModule, DatepickerModule, TypeaheadModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
// import { DatepickerComponent } from './common';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService } from './data';
import { SearchDialogComponent, SidebarComponent, EntriesComponent, TimeTrackingComponent, EntryDialogComponent, EntryDialogService, DeleteEntryComponent, DeleteEntryService, UpdateDialogComponent, UpdateDialogService } from './time-tracking';
// import { ExportComponent } from './time-tracking';
// import { QueryformComponent } from './queryform/queryform.component';
import { routes } from './routes';
// import { LoggedInGuard } from './logged-in-guard';
// import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile';
import { LoginComponent, LoginService } from './login';
import { UserComponent } from './time-tracking/components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SearchDialogComponent,
        // ExportComponent,
        SidebarComponent,
        EntriesComponent, // ??? 
        // DatepickerComponent,
        // QueryformComponent,
        ProfileComponent,
        TimeTrackingComponent,
        EntryDialogComponent,
        DeleteEntryComponent,
        UpdateDialogComponent,
        UserComponent
    ],
    entryComponents: [
        SearchDialogComponent,
        EntryDialogComponent,
        DeleteEntryComponent,
        UpdateDialogComponent
    ],
    imports: [
        // Angular2DataTableModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        FlexLayoutModule,
        // MyDatePickerModule,
        AlertModule,
        DropdownModule,
        ModalModule,
        TimepickerModule,
        // DataTableModule,
        TabsModule,
        TypeaheadModule
    ],
    providers: [ProjectService, TaskService, TimeTrackingEntryService, UserService, LoginService, EntryDialogService, DeleteEntryService, UpdateDialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);