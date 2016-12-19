import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MyDatePickerModule } from 'mydatepicker';
import { Angular2DataTableModule } from 'angular2-data-table';
import { DataTableModule } from "angular2-datatable";
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DateComponent } from './date/date.component';
import { SearchComponent } from './search/search.component';
import { ExportComponent } from './export/export.component';
import { EntryComponent } from './entry/entry.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EntriesComponent } from './entries/entries.component';
import { DialogComponent } from './dialog/dialog.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TableComponent } from './table/table.component';
import { QueryformComponent } from './queryform/queryform.component';
import { ContainerComponent } from './container/container.component';
import { routes } from './routes';
import { UserService } from './user.service';
import { LoggedInGuard } from './logged-in-guard';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DateComponent,
    SearchComponent,
    ExportComponent,
    EntryComponent,
    SidebarComponent,
    EntriesComponent,
    DialogComponent,
    TimepickerComponent,
    DatepickerComponent,
    TableComponent,
    QueryformComponent,
    ContainerComponent,
    ProfileComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    Angular2DataTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
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
  providers: [UserService, LoggedInGuard, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);