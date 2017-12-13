import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

import { User } from '../models/user.model';
@Injectable()
export class DashboardService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) { }

// Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/users/getuser')
        .subscribe(
        data => {
          this.setAuth(data)
        },
        err => {
          this.purgeAuth()
        }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(data) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(data.token);
    // Set current user data into observable
    this.currentUserSubject.next(data.user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }




// send path to main module
private subject = new Subject<any>();

  sendPath(path: any) {
    this.subject= path;
    //console.log(path)
  }

  getPath() {
    return this.subject;
  }
  newUser(user){
    var route='/users/usercreation';
  return this.apiService.post(route,user)
                .map(
                  data => {
                    return data;
                  }
                );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  authentUser(user){
     var route='/users/login';
  return this.apiService.post(route,user)
                .map(
                  data => {
                  this.setAuth(data)
                    return data;
                  }
                );

  }
}


