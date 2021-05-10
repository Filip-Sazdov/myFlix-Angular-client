import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

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
  encapsulation: ViewEncapsulation.None,
})

/**
 * This component renders the Log In form.
 */
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * This method sends the form inputs to the backend
   * and saves the user and token from the server response to local storage
   */
  logInUser(): void {
    this.fetchApiData
      .userLogin(this.userData.Username, this.userData.Password)
      .subscribe(
        (result) => {
          localStorage.setItem('user', result.user.Username);
          localStorage.setItem('token', result.token);
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
