import { User } from '../types/user';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSTANT_API } from 'src/constants/constant-api.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }
  createNewAccount(user: User): Promise<any> {
    console.log("UserService -> user", user)
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.SIGN_UP, user).subscribe(response => {
        console.log("UserService -> response", response)
        if (response.status === 200) {
          resolve();
        }
        if (response.status === 500) {
          console.log("UserService -> response", response)
          reject();
        }
      });
    });
  }

  loginAccount(account: User): Observable<Response> {
    return this.apiService.login(CONSTANT_API.API_ENDPOINTS.LOGIN, account);
  }
}
