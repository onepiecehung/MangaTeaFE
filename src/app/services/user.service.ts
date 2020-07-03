import { User } from '../models/user.model';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT_API } from 'src/constants/constant-api';
import { UserInfo } from '../models/user-info.model';
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
          const userInfo = new UserInfo(response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('status', userInfo.status);
          localStorage.setItem('role', userInfo.role);
          localStorage.setItem('email', userInfo.email);
          localStorage.setItem('point', userInfo.point + '');
          resolve(userInfo);
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
