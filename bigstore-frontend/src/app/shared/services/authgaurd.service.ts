
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
      //console.log(window.localStorage['jwtToken'])
    if (window.localStorage['jwtToken']) {
        this.router.navigate(['/']);
        return false
    }
    return true;
  }
}