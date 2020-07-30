import { HTTP_STATUS } from './../../constants/constant-common';
import { CONSTANT_API } from 'src/constants/constant-api';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { Rate } from '../models/request/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private apiService: ApiService,
  ) { }

  rating(rateRequest: Rate) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(CONSTANT_API.API_ENDPOINTS.RATING, rateRequest).subscribe(response => {
        if (response.status === HTTP_STATUS.OK || response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }

  getRatingManga(mangaID: number){
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.RATING}?idManga=${mangaID}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK || response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }
}
