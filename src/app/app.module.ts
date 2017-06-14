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
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, ClientService} from './data';
import { SidebarComponent, EntriesComponent, TimeTrackingComponent, EntryDialogComponent, EntryDialogService, DeleteEntryComponent, DeleteEntryService, UpdateDialogComponent, UpdateDialogService, CreateDialogComponent, CreateDialogService } from './time-tracking';
// import { SearchDialogComponent, ExportComponent } from './time-tracking';
// import { QueryformComponent } from './queryform/queryform.component';
import { routes } from './routes';
// import { LoggedInGuard } from './logged-in-guard';
// import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile';
import { LoginComponent, LoginService } from './login';
import { ChangePasswordComponent } from './change-password';
import { UserComponent } from './time-tracking/components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyDatePickerModule } from 'mydatepicker';
import { CryptoJS} from 'crypto-js';
import { MenuComponent, PasswordDialogComponent, PasswordDialogService } from './menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        UserComponent,
        ChangePasswordComponent,
        MenuComponent,
        PasswordDialogComponent,
        CreateDialogComponent
    ],
    entryComponents: [
        EntryDialogComponent,
        DeleteEntryComponent,
        UpdateDialogComponent,
        PasswordDialogComponent,
        CreateDialogComponent
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
        MyDatePickerModule,
        BrowserAnimationsModule
    ],
    providers: [ProjectService, TaskService, TimeTrackingEntryService, UserService, LoginService, EntryDialogService, DeleteEntryService, UpdateDialogService, PasswordDialogService, ClientService, CreateDialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);