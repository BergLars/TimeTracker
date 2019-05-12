import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Userprofile, Timeentry, Project, Client } from '../../../interfaces';
import { EntryDialogService } from './entry-dialog/entry-dialog.service';
import { UpdateDialogService } from './update-dialog/update-dialog.service';
import { DeleteEntryService } from './delete-entry/delete-entry.service';
import { environment } from '../../../../environments/environment';
import moment from 'moment/src/moment';
import { EntriesService } from './entries.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import { LoginService } from '../../../login';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;

  @Input() projects: Project[] = [];
  @Input() project: Project;
  @Input() clients: Client[] = [];
  @Input() client: Client;
  @Input() users: Userprofile[] = [];

  @ViewChild('mydatatable') datatable: DatatableComponent;

  @Input() items: Timeentry[] = [];
  @Input() allEntries: Timeentry[] = [];
  selected = [];
  selectedRow: any;
  editMode: boolean = false;
  rowID: number;
  userID: number;
  clientID: any;
  projectID: any;
  count: number = 0;
  @Input() offset: number = 0;
  @Input() date: string;
  public editing = {};
  public result: any;
  private columns = [
    { key: 'Description', id: 0 },
    { key: 'Project Name', id: 1 },
    { key: 'Client Name', id: 2 },
    { key: 'Entry Date', id: 3 },
    { key: 'Time Spent', id: 4 }
  ];
  public createItems = [
    { key: 'None', id: 1 },
    { key: 'Client', id: 2 },
    { key: 'Project', id: 3 }
  ];
  
  item: number = this.createItems[0].id;

  public defaultItem: any;

  @Input() selectedColumn: any;
  @Input() selectedSort: any;
  @Input() selectedBillable: any;
  @Input() term: any;
  isValid: boolean = false;
  isChecked = false;

  @Input() isAdmin: boolean = false;
  @Input() selectedDate: any;
  public rowUserprofileID: any;


  constructor(
    private entryDialogService: EntryDialogService,
    private deleteEntryService: DeleteEntryService,
    private viewContainerRef: ViewContainerRef,
    private http: Http,
    public updateService: UpdateDialogService,
    public entriesService: EntriesService,
    public loginService: LoginService) {
    
  }

  ngOnInit() {
    this.loadValuePerdefault();
    this.defaultItem = this.createItems[0].key;
    this.isAdmin = this.loginService.isAdmin();
    this.entriesService.getCurrentDayWeekMonth();
    this.entriesService.setSelectedUserID(this.loginService.getLoggedUserID());
    this.loadMyEntries();
    this.refreshDatatable();
  }

  setSelectFocus(event, row, cell, value) {
    this.editing[row.$$index + cell] = true;
    let element = event.target;
    let parentElement = element.parentElement;
    setTimeout(() => {
      let parentElementTag = parentElement.getElementsByTagName(value)[0];
      parentElementTag.focus();
    }, 100);
  }

  clickOnFirstChild(event, row, cell) {
    this.editing[row.$$index + cell] = true;
    setTimeout(() => {
      let parentElementTag = document.getElementById(row.cellValue + row.$$index);
      parentElementTag.focus();
    }, 100);
  }

  removeSelectFocus(row, cell) {
    setTimeout(() => {
      this.editing[row.$$index + cell] = false;
      this.unselectEntry();
    }, 100);
  }

  selectEntry({ selected }) {
    if (selected) {
      this.selectedRow = selected[0];
    }
  }

  // Set the value of a selected entry to empty
  unselectEntry() {
    this.selected = [];
  }

  isSelected(row) {
    if (this.selectedRow != null && this.selectedRow.id == row.id) {
      return true;
    }
    return false;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  getSelectedIx() {
    return this.selected[0]['$$index'];
  }

  openDialog() {
    this.unselectEntry();
    this.entryDialogService
      .confirm('New Entry', this.viewContainerRef)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.isChecked = true;
          this.loadEntries();
        }
      });
  }

  openDeleteDialog(row) {
    this.deleteEntryService
      .confirm('Delete', 'Are you sure that you want to delete this entry?', this.viewContainerRef, row.id)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.isChecked = true;
          this.loadEntries();
          this.entriesService.displaySidebarData();
        }
      });
  }

  openEditDialog(row) {
    this.rowUserprofileID = row.userprofileID;
    this.updateService
      .confirm(this.viewContainerRef, row, this.projects, this.clients)
      .subscribe(res => {
        this.result = res;
        if (this.result) {
          this.isChecked = true;
          this.loadEntries();
          this.entriesService.displaySidebarData();
        }
      });
  }

  private refreshDatatable() {
    this.items = this.entriesService.getEntries();
  }

  loadValuePerdefault() {
    // Set column per default
    this.selectedColumn = this.columns[4].id;
  }

  loadEntries() {
    return this.loadMyEntries();
  }

  loadMyEntries() {
    this.entriesService.allEntriesAreLoaded().then(() => {
      this.clients = this.entriesService.sortedClients();
      this.projects = this.entriesService.sortedProjects();
      this.allEntries = EntriesService.clonedEntries;
      this.refreshDatatable();
    });
  }
}