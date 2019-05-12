import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule, Http, Response, RequestOptions, Headers, XHRBackend } from '@angular/http';
import { 
    MatRippleModule, 
    NativeDateModule, 
    DateAdapter, 
    MatSelectModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatCardModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatChipsModule, 
    MatCheckboxModule,
    MatMenuModule ,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {
    EntriesComponent,
    TimeTrackingComponent,
    EntryDialogComponent,
    EntryDialogService,
    DeleteEntryComponent,
    DeleteEntryService,
    CreateDialogComponent,
    CreateDialogService,
    ExportDialogComponent,
    ExportDialogService,
    EntriesService,
    UpdateDialogComponent,
    UpdateDialogService
} from './time-tracking';
import { routes } from './routes';
import { LoginComponent, LoginService } from './login';
import { HttpInterceptor, httpFactory } from './httpCalls';
import { UserComponent } from './time-tracking/components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CryptoJS } from 'crypto-js';
import { MenuComponent, PasswordDialogComponent, PasswordDialogService } from './menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeDateAdapter } from './dateAdapter';
import { DeleteUserComponent } from './menu/components/delete-user/delete-user.component';
import { DeleteUserService } from './menu/components/delete-user/delete-user.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        // SearchDialogComponent,
        ExportDialogComponent,
        EntriesComponent,
        TimeTrackingComponent,
        EntryDialogComponent,
        DeleteEntryComponent,
        UserComponent,
        MenuComponent,
        PasswordDialogComponent,
        CreateDialogComponent,
        DeleteUserComponent,
        UpdateDialogComponent
    ],
    entryComponents: [
        EntryDialogComponent,
        DeleteEntryComponent,
        PasswordDialogComponent,
        CreateDialogComponent,
        ExportDialogComponent,
        DeleteUserComponent,
        UpdateDialogComponent
    ],
    imports: [
        NgxDatatableModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes, { useHash: true }),
        MatRippleModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        NativeDateModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    providers: [
        LoginService,
        EntryDialogService,
        DeleteEntryService,
        PasswordDialogService,       
        CreateDialogService,
        ExportDialogService,
        EntriesService,
        DeleteUserService,
        UpdateDialogService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        {
            provide: DateAdapter,
            useClass: DeDateAdapter
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('ch-CH');
    }
}
platformBrowserDynamic().bootstrapModule(AppModule);