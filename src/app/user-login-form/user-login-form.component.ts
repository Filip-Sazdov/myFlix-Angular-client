import { Component, OnInit, Input } from '@angular/core';

// Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

// This is for mini notifications like alert is in JS
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  logInUser(): void {
    this.fetchApiData
      .userLogin(this.userData.Username, this.userData.Password)
      .subscribe(
        (result) => {
          console.log('from log in', result);
          localStorage.setItem('user', result.user.Username);
          localStorage.setItem('token', result.token);
          // Logic for a successful user registration goes here! (To be implemented)
          this.dialogRef.close(); // This will close the modal on success!
          this.snackBar.open('Log In Successful.', 'OK', {
            duration: 5000,
          });
          this.router.navigate(['movies']);
        },
        (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 5000,
          });
        }
      );
  }
}
