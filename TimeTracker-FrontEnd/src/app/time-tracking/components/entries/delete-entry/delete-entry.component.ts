import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Http } from '@angular/http';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../login';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.scss']
})
export class DeleteEntryComponent implements OnInit {
  public baseUrl: string = environment.apiBaseUrl;

  public title: string;
  public message: string;
  public rowid: number;

  constructor(public dialogRef: MatDialogRef<DeleteEntryComponent>,
    public loginService: LoginService,
    private http: Http) {
  }

  public deleteEntry() {
    if (this.loginService.loggedIn()) {
      this.http.delete(this.baseUrl + "/timeentries/" + this.rowid).map(res => res.json()).subscribe(
        () => {
          // this.registryService.entriesComponent.offset = 0;
          this.dialogRef.close(true);
        });
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  ngOnInit() {
  }
}
