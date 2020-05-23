import { User } from '../types/user';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT_API } from 'src/constants/constant-api.dev';
import { UserInfo } from '../types/user-info';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }
  createNewAccount(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.SIGN_UP, user).subscribe(response => {
        console.log("UserService -> response", response)
        if (response.status === 200) {
          resolve(new UserInfo(response.data));
        } else {
          reject(response.data);
        }
      });
    });
  }

  loginAccount(account: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.LOGIN, account).subscribe(response => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          resolve(new UserInfo(response.data.user));
        }
        if (response.status === 500) {
          reject();
        }
      });
    });
  }
}
