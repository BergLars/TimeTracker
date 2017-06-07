import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, ModalModule, TimepickerModule, TabsModule, DatepickerModule, TypeaheadModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService } from './data';
import { SidebarComponent, EntriesComponent, TimeTrackingComponent, EntryDialogComponent, EntryDialogService, DeleteEntryComponent, DeleteEntryService, UpdateDialogComponent, UpdateDialogService } from './time-tracking';
// import { SearchDialogComponent, ExportComponent } from './time-tracking';
// import { QueryformComponent } from './queryform/queryform.component';
import { routes } from './routes';
// import { LoggedInGuard } from './logged-in-guard';
// import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile';
import { LoginComponent, LoginService } from './login';
import { UserComponent } from './time-tracking/components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyDatePickerModule } from 'mydatepicker';
import { CryptoJS} from 'crypto-js';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        // SearchDialogComponent,
        // ExportComponent,
        SidebarComponent,
        EntriesComponent,
        ProfileComponent,
        TimeTrackingComponent,
        EntryDialogComponent,
        DeleteEntryComponent,
        UpdateDialogComponent,
        UserComponent
    ],
    entryComponents: [
        EntryDialogComponent,
        DeleteEntryComponent,
        UpdateDialogComponent
    ],
    imports: [
        NgxDatatableModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        FlexLayoutModule,
        AlertModule,
        ModalModule,
        TimepickerModule,
        TabsModule,
        TypeaheadModule,
        MyDatePickerModule
    ],
    providers: [ProjectService, TaskService, TimeTrackingEntryService, UserService, LoginService, EntryDialogService, DeleteEntryService, UpdateDialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);