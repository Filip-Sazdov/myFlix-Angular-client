import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-on-heroku.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})

/**
 * This service will enable communication with the movie API
 * and enable CRUD operations to be performed.
 */
export class FetchApiDataService {
  /**
   * The constructor Injects the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http.
   */
  constructor(private http: HttpClient) {}

  /**
   * This method will make the api call to the user registration endpoint.
   * @param userDetails User name, password, email and date of birth.
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * This method will make the api call to the user login endpoint.
   * @param username Username of type string.
   * @param password Password of type string.
   * @returns object with username and bearer token
   */
  userLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(apiUrl + 'login', {
        Username: username,
        Password: password,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the movies endpoint.
   * @returns array of movie objects.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the movie title endpoint.
   * @returns movie object.
   */
  getMovieByTitle(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the director name endpoint.
   * @param directorName name of movie director of type string.
   * @returns director object.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the genre name endpoint.
   * @param genre name of genre of type string.
   * @returns genre object.
   */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the User endpoint.
   * @returns user object.
   */
  getUser(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the User endpoint
   * in order to edit the user data.
   * @param userDetails object of user name, password, email and date of birth.
   * @returns user object.
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + user, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the User endpoint
   * in order to delete the user data.
   * @returns user object.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * This method will make the api call to the movie ID endpoint
   * in order to add the movie ID to the FavoriteMovies array in the user object.
   * @param movieID of type string.
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + 'users/' + user + '/Movies/' + movieID, movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * This method will make the api call to the movie ID endpoint
   * in order to delete the movie ID from the FavoriteMovies array in the user object.
   * @param movieID of type string.
   */
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + user + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * This method will extract and return the data from the API response
   * or will return empty object if no response exists.
   * @returns response object or empty object.
   */
  // Non-typed response extraction
  private extractResponseData(res: object): any {
    const body = res;
    return body || {};
  }

  /**
   * This method will throw an error within the method it is used.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
