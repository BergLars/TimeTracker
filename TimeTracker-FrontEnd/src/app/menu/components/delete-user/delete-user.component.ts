import { Component, OnInit, Input } from '@angular/core';
import { Userprofile } from '../../../interfaces';
import { MatDialogRef, MatDatepickerModule, DateAdapter, MatDateFormats, MatSnackBar } from '@angular/material';
import { LoginService } from '../../../login';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  public title: string;
  @Input() userID: any;
  @Input() users: Userprofile[] = [];
  public baseUrl: string = environment.apiBaseUrl;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public loginService: LoginService,
    public http: Http,
    public dateAdapter: DateAdapter<Date>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (this.loginService.loggedIn()) {
      this.http.get(this.baseUrl + "/userprofile/all").map(res => res.json()).subscribe(
        results => {
          this.users = results;
        });
    } else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  public userDropdown(value: string): void {
    this.userID = value;
  }

  public deleteUser() {
    this.http.delete(this.baseUrl + "/userprofile/" + this.userID)
      .subscribe(
        () => {
          this.dialogRef.close(true);
          this.openSnackBar('User ID: ' + this.userID, ', deleted !');
        },
        (error) => {
          if (error.status === 500) {
            alert('Internal server error !');
          }
        });
  }

  public confirmDeleteUser() {
    if (this.loginService.loggedIn()) {
      if (confirm('Are you sure that you want to delete this user?')) {
        this.deleteUser();
      }
      else {
        this.dialogRef.close(true);
      }
    }
    else {
      alert("Your token has expired. Please log in again!");
      this.dialogRef.close(true);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message + ' ' + action, '', { duration: 2500 });
  }

  public keyDownFunction(event) {
    if (event.keyCode == 13) {
    }
  }
}
