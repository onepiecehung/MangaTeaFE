import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {

      const decoded = jwt_decode(token);
      localStorage.setItem('role', decoded['role'])
      return ((new Date().getTime() / 1000) < decoded['exp']) ? true : false;
    } else {
      return false;
    }
  }
}
