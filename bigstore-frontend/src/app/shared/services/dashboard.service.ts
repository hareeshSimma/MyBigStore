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
caseNumber$ = this.subject.asObservable();
// item$=this.subject.asObservable();
  sendPath(path: any) {
    this.subject.next(path);
    // console.log("dashboard",path)
  }

  getPath() :Observable<any> {
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
  updateUser(user)
  {
     const route = '/users/updateUser'   
      return this.apiService.put(route,user)                
      .map(data =>{                  
        return data                
      })  
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
  addCartitems(items){
    var route='/cart/additems';
  return this.apiService.post(route,items)
                .map(
                  data => {
                    return data;
                  }
                );
  }
  getItems(id):Observable<User>{
    const route ='/cart/cartitems/'+id
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }
 deleteItem(id){
    const route = '/cart/items/'+id
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }

  forgotPassword(data){
    var route='/users/forgotpassword';
  return this.apiService.post(route,data)
                .map(
                  data => {
                    return data;
                  }
                );
  }
  verifyOtp(otp){
    var route='/users/verifyotp';
  return this.apiService.post(route,otp)
                .map(
                  data => {
                    return data;
                  }
                );
  }
  resendOtp(data){
    var route='/users/resendotp';
    return this.apiService.post(route,data)
                  .map(
                    data => {
                      return data;
                    }
                  );
  }
  resetpassword(newpswd) {
  
  return this.apiService.put('/users/setpassword',newpswd)
     .map(
     data => {
       return data;
     }
     );
 }
 buyNow(data){
  var route='/cart/buynow';
  return this.apiService.post(route,data)
                .map(
                  data => {
                    return data;
                  }
                );
}
manageAddress(data){
  var route='/users/manageaddress';
  return this.apiService.post(route,data)
                .map(
                  data => {
                    return data;
                  }
                );
}
getAddress():Observable<User>{
  const route ='/users/getaddress'
  return this.apiService.get(route)
              .map(data =>{
                return data.address
              })
}

updatePassword(data) {
  
  return this.apiService.put('/users/updateepassword',data)
     .map(
     data => {
       return data;
     }
     );
 }

 getOrders():Observable<User>{
  const route ='/cart/getorders'
  return this.apiService.get(route)
              .map(data =>{
                return data.orders
              })
}

}

