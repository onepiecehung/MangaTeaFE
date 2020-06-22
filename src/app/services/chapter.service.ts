import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { Chapter } from '../types/manga';
import { CONSTANT_API } from 'src/constants/constant-api.dev';
import { HTTP_STATUS } from 'src/constants/constant-common';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(
    private apiService:ApiService
  ) { }


  getChapterByID(id: number): Promise<Chapter> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.CHAPTER}?chapterNumber=${id}`).subscribe(response => {
        console.log("response", response)
        if (response.status === HTTP_STATUS.OK) {
          resolve(new Chapter(response.data.chapter[0]));
        } else {
          reject();
        }
      });
    });
  }

}
