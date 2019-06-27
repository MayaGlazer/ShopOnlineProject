import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import { CrudService } from './crud.service';
import { User } from './models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usersURL = 'http://localhost:3010/api/users';
  
  private data:any = {};
  //isLoggedin: boolean;

  constructor(private http: HttpClient) { }

  // USERS
  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL);
  }

  newUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersURL, user);
  }

  getUser (id: number): Observable<User> {
    return this.http.get<User>(`${this.usersURL}/${id}`);
  }

  loginUser (userlogged: any): Observable<any> {
    // const obj = {email: userform.email, password: userform.password};
    return this.http.post<any>(`${this.usersURL}/login`, userlogged);
  }



}
