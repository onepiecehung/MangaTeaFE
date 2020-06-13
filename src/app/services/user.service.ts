import { User } from '../types/user';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT_API } from 'src/constants/constant-api.dev';
import { UserInfo } from '../types/user-info';
import { HTTP_STATUS } from 'src/constants/constant-common';
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
        if (response.status === HTTP_STATUS.OK || response.status === HTTP_STATUS.CREATED) {
          resolve(new UserInfo(response.data));
        } else {
          reject(response.data);
        }
      });
    });
  }

  loginAccount(account: User): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.LOGIN, account).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          localStorage.setItem('token', response.data.token);
          resolve(new UserInfo(response.data.user));
        } else {
          reject(response.data);
        }
      });
    });
  }
  getProfile() {
    return new Promise((resolve, reject) => {
      this.apiService.getData(CONSTANT_API.API_ENDPOINTS.PROFILE).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new UserInfo(response.data));
        } else {
          reject(response.data);
        }
      });
    });
  }
  uploadProfileImage(body: FormData) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.UPLOAD_PROFILE_IMG, body).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new UserInfo(response.data));
        } else {
          reject(response.data);
        }
      });
    });
  }
}
