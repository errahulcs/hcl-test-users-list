import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {UserData} from './model/user-data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }


  /* API:  Get Users List  */
  private usersApi = "https://jsonplaceholder.typicode.com/users";

  
  /**
   * Api to get the users list
  *  @returns {UserData[]} User List.
  */
  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.usersApi).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  /**
  * Common code to handle the errors.
  *  @returns throws error.
  */
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }

}
