import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }
  createNewAccount(user: any): Observable<any> {
    return this.http.post("http://api.manga.net:2111/user/signup", user);
  }

  loginAccount(account: any): Observable<any> {
    return this.http.post("http://api.manga.net:2111/user/signin", account);
  }
}
