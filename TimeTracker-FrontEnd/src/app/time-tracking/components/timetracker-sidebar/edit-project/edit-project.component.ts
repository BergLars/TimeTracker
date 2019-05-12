import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../../login';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef, DateAdapter } from '@angular/material';
import { Project, Userprofile } from '../../../../interfaces';
import { EntriesService } from '../../entries/entries.service';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  	public baseUrl: string = environment.apiBaseUrl;
  	public title: string;
  	private _mySelectedProject: number;
  	model: any = {};
  	newProjectName: string;

  	@Input() projects: Project[] = [];
  	
  	get selectedProject(): number {
    	return this._mySelectedProject;
  	}

  	@Input()
  	set selectedProject(id: number) {
	    this._mySelectedProject = id;
	}

  	constructor(
	  	public dialogRef: MatDialogRef<EditProjectComponent>,
	  	private http: Http,
	  	private entriesService: EntriesService,
	  	public loginService: LoginService) { }

	ngOnInit() {
		this.loadProjects();
	}

    private loadProjects() {
	    if (this.loginService.loggedIn()) {
	      this.http.get(this.baseUrl + "/projects").map(res => res.json()).subscribe(
	        results => {
	          this.projects = results.sort(this.entriesService.propComparator('projectName'));
	        });
	    } else {
	      alert("Your token has expired. Please log in again!");
	      this.dialogRef.close(true);
	    }
	}

	public ok() {
		this._mySelectedProject;
		this.newProjectName = this.model.newProjectName;

	    return this.http.put(this.baseUrl + "/projects/" + this._mySelectedProject, {
	      projectName: this.newProjectName

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
