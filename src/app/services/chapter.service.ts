import { Country } from './../models/response/country.model';
import { GroupTranslate } from './../models/group-translate.model';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { Chapter } from '../models/manga.model';
import { CONSTANT_API } from 'src/constants/constant-api';
import { HTTP_STATUS } from 'src/constants/constant-common';
import { UploadChapterRequest } from '../models/request/upload-chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(
    private apiService: ApiService
  ) { }


  getChapterByID(mangaID: number, chapterID: number): Promise<Chapter> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.CHAPTER}?mangaID=${mangaID}&id=${chapterID}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new Chapter(response.data.chapter));
        } else {
          reject(response.data);
        }
      });
    });
  }

  uploadChapter(chapterUpload: FormData) {
    const formData: FormData = new FormData();
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.CHAPTER}`, chapterUpload).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }

  getAllGroupTranslate(params?): Promise<GroupTranslate[]> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.GROUP_TRANSLATE}?${params}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          console.log("response", response)
          let groupTranslate: GroupTranslate[] = [];
          if (Array.isArray(response.data.groupTranslation) && response.data.groupTranslation.length > 0) {
            response.data.groupTranslation.forEach(group => {
              groupTranslate.push(new GroupTranslate(group));
            });
          }
          resolve(groupTranslate);
        } else {
          reject();
        }
      });
    });
  }

  newGroupTranslate(body): Promise<GroupTranslate> {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.GROUP_TRANSLATE}`, body).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }

  getDetailGroupTranslate(params?): Promise<GroupTranslate> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.GROUP_TRANSLATE}?${params}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject();
        }
      });
    });
  }

  getAllCountry(): Promise<Country[]> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.COUNTRY}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          let countries: Country[] = [];
          response.data?.forEach(country => {
            countries.push(new Country(country));
          });
          resolve(countries);
        } else {
          reject();
        }
      });
    });
  }

}
