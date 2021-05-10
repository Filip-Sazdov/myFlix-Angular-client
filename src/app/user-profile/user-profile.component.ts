import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})

/**
 * This component renders the User Profile view.
 */
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * This method will run the getUser method after the User Profile Component is initialised and rendered.
   * @returns User object.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This method will contact an external API and receive a User object and an array of movie objects.
   * @returns User object and array of movie objects.
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  /**
   * This method will contact an external API,
   * receive an array of movie objects and store them in state,
   * and then filter it.
   * @returns array of movie objects.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
   * This method will use the stored array of movie objects
   * and filter it according to the FavoriteMovies array.
   * @returns array of movie objects.
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * This method will contact an external API,
   * and delete the movie id from the favorites array
   */
  removeFavorites(id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * This method will contact an external API,
   * and delete the User from the Users array.
   */
  deleteUser(): void {
    let check = confirm(
      'This will delete your profile! Are you sure you want to continue?'
    );
    if (check) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }

  /**
   * This method will activate dialog/modal which enables the User to update their profile data.
   */
  profileUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      panelClass: 'update-dialog',
    });
  }
}
