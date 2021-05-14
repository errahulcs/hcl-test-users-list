import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient
  ) {}

  public getUserData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
