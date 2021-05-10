import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})

/**
 * This component will render various movie data.
 */
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * This method will run the getMovies method after the MovieCard Component is initialised and rendered.
   * @returns array of movie objects.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This method will contact an external API and receive an array of movie objects.
   * @returns array of movie objects.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * This method will activate dialog/modal which displays various movie data.
   * @param title movie title
   * @param imagePath movie image
   * @param description movie summary
   * @param director movie director name
   * @param genre movie genre
   */
  showDetailsDialog(
    title: string,
    imagePath: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagePath, description, director, genre },
      panelClass: 'details-dialog',
    });
  }

  /**
   * This method will activate dialog/modal which displays info on movie genres.
   * @param name - genre name
   * @param description - genre summary
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      panelClass: 'genre-dialog',
    });
  }

  /**
   * This method will activate dialog/modal which displays info on movie director.
   * @param name - director name
   * @param bio - director biography
   * @param birth - director date of birth
   * @param death - director date of death
   */
  showDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
      panelClass: 'director-dialog',
    });
  }

  /**
   * This method will add movie id to array of favorite movies and show a notificaton it has executed.
   * @param name - director name
   * @param bio - director biography
   * @param birth - director date of birth
   * @param death - director date of death
   */
  addFavorite(id: string, title: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }
}
