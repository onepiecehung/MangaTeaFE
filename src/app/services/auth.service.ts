import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwt_decode(token);
      return ((new Date().getTime() / 1000) < decoded['exp']) ? true : false;
    } else {
      return false;
    }
  }
}
