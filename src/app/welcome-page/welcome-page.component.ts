import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})

/**
 * This component renders the welcome page for the app.
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * This method opens the dialog/modal for the User Registration form component.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      panelClass: 'sign-in-dialog',
    });
  }

  /**
   * This method opens the dialog/modal for the User Login form component.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { panelClass: 'log-in-dialog' });
  }
}
