import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api';
import { HTTP_STATUS } from 'src/constants/constant-common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private apiService: ApiService
  ) { }

  getAdminDashboard(param: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.DASHBOARD}?${param}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }

  getUsers(params) {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.ADMIN_USER}?${params}`).subscribe(response => {
        console.log("getUsers -> response", response)
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }

  mangaUser(body) {
    return new Promise((resolve, reject) => {
      this.apiService.putData(`${CONSTANT_API.API_ENDPOINTS.ADMIN_BLOCK_USER}`, body).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }
}
