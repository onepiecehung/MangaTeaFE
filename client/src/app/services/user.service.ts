import { User } from '../types/user';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }
  createNewAccount(user: any): Observable<any> {
    return this.apiService.create("http://api.manga.net:2111/user/signup", user);
  }

  loginAccount(account: User): Observable<Response> {
    return this.apiService.login("http://api.manga.net:2111/user/signin", account);
  }
}
