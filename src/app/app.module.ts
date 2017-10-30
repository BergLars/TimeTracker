import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule, Http, Response, RequestOptions, Headers, XHRBackend } from '@angular/http';
import { MaterialModule, MdNativeDateModule, DateAdapter } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectService, TaskService, TimeTrackingEntryService, UserService, ClientService, RegistryService } from './data';
import { SidebarComponent, 
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
        EditDialogComponent, 
        EditDialogService } from './time-tracking';
import { routes } from './routes';
import { LoginComponent, LoginService } from './login';
import { HttpInterceptor, httpFactory } from './httpCalls';
import { UserComponent } from './time-tracking/components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CryptoJS } from 'crypto-js';
import { MenuComponent, PasswordDialogComponent, PasswordDialogService } from './menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeDateAdapter } from './dateAdapter';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        // SearchDialogComponent,
        ExportDialogComponent,
        SidebarComponent,
        EntriesComponent,
        TimeTrackingComponent,
        EntryDialogComponent,
        DeleteEntryComponent,
        UserComponent,
        MenuComponent,
        PasswordDialogComponent,
        CreateDialogComponent,
        EditDialogComponent
    ],
    entryComponents: [
        EntryDialogComponent,
        DeleteEntryComponent,
        PasswordDialogComponent,
        CreateDialogComponent,
        ExportDialogComponent,
        EditDialogComponent
    ],
    imports: [
        NgxDatatableModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes, {useHash: true}),
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MdNativeDateModule
    ],
    providers: [
        ProjectService,
        TaskService,
        TimeTrackingEntryService,
        UserService,
        LoginService,
        EntryDialogService,
        DeleteEntryService,
        PasswordDialogService,
        ClientService,
        CreateDialogService,
        ExportDialogService,
        EntriesService,
        RegistryService,
        EditDialogService,
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
    this.dateAdapter.setLocale('fr-CH');
  }
 }
platformBrowserDynamic().bootstrapModule(AppModule);