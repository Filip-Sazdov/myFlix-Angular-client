import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

/**
 * This component renders the navigation bar and the components it is comprised of.
 */
export class NavBarComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit(): void {}

  /**
   * This method will clear the token and username from local storage,
   * will navigate to the welcome page and provide a notification of the log out.
   */
  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out', 'OK', {
      duration: 4000,
    });
  }
}
