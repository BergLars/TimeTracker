import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../../login';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef, DateAdapter } from '@angular/material';
import { Client, Userprofile } from '../../../../interfaces';
import { EntriesService } from '../../entries/entries.service';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  	public baseUrl: string = environment.apiBaseUrl;
  	public title: string;
  	private _mySelectedClient: number;
  	model: any = {};
  	newClientName: string;

  	@Input() clients: Client[] = [];
  	
  	get selectedClient(): number {
    	return this._mySelectedClient;
  	}

  	@Input()
  	set selectedClient(id: number) {
	    this._mySelectedClient = id;
	}

  	constructor(
	  	public dialogRef: MatDialogRef<EditClientComponent>,
	  	private http: Http,
	  	private entriesService: EntriesService,
	  	public loginService: LoginService) { }

	ngOnInit() {
		this.loadProjects();
	}

    private loadProjects() {
	    if (this.loginService.loggedIn()) {
	      this.http.get(this.baseUrl + "/clients").map(res => res.json()).subscribe(
	        results => {
	          this.clients = results.sort(this.entriesService.propComparator('clientName'));
	        });
	    } else {
	      alert("Your token has expired. Please log in again!");
	      this.dialogRef.close(true);
	    }
	}

	public ok() {
		this._mySelectedClient;
		this.newClientName = this.model.newClientName;

	    return this.http.put(this.baseUrl + "/clients/" + this._mySelectedClient, {
	      clientName: this.newClientName

	    }).subscribe(
	      () => {
	        this.dialogRef.close(true);
	      },
	      (err) => {
	        if (err.status === 400 || err.status === 404) {
	          alert('Wrong date format or fill all field !');
	          return Observable.of(undefined);
	        }
	        if (err.status === 500) {
	          alert('Internal server error !')
	        }
	    });
	}

}
