import { Observable } from 'rxjs/Rx';
import { Injectable, Input, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { IUser, UserService, ITimeTrackingEntry, IProject, ITask, IClient, TaskService, ProjectService, TimeTrackingEntryService, ClientService } from '../../../data';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../login';

@Injectable()
export class EntriesService {
	public baseUrl: string = environment.apiBaseUrl;
	public isCreated: boolean;
	@Input() projects: IProject[] = [];
	@Input() project: IProject;
	@Input() tasks: ITask[] = [];
	@Input() task: ITask;
	@Input() clients: IClient[] = [];
  	@Input() client: IClient;		
	public items: ITimeTrackingEntry[] = [];


	public tasksDictionary: any = {};
  	public projectsDictionary: any = {};
  	public clientsDictionary: any = {};
	constructor(
		private loginService: LoginService,
		private http: Http,) { 
	}

	loadEntries() {
	 this.items = [];

	let that = this;

    this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
      results => {
        this.clients = results; 

        results.forEach(function(result) {
          that.clientsDictionary[result.id] = result;
        });

        this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
          results => {
            this.projects = results; 

            results.forEach(function(result) {
              that.projectsDictionary[result.id] = result;
            });

             // We build the dictionary of tasks
            this.http.get(this.baseUrl + "/tasks").map(res => res.json()).subscribe(
              results => {
                this.tasks = results;
                
                results.forEach(function(result){
                  that.tasksDictionary[result.id] = result;
                });

                this.http.get(this.baseUrl + "/timeentries").map(res => res.json()).subscribe(
                  loadedEntries => {
                    let that = this;

                    loadedEntries.forEach(function(entry){
                      entry.task = that.tasksDictionary[entry.taskID];
                      entry.client = that.clientsDictionary[entry.clientID];
                      entry.project = that.projectsDictionary[entry.projectID];
                      that.items.push(entry);
                    });
                  });
              }); 
          });
      });
  }
}