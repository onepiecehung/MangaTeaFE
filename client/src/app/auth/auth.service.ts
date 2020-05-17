import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // public jwtHelper: JwtHelperService
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // console.log("AuthService -> isAuthenticated -> token", token)
    // return !this.jwtHelper.isTokenExpired(token);
    return token !== null ? true : false;
  }
}
