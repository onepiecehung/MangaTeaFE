import { HTTP_STATUS } from './../../constants/constant-common';
import { Manga, ListMangaResponse, MangaDetail } from '../models/manga.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class MangaService {


  constructor(
    private apiService: ApiService,
  ) { }

  loadManga(skip): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });

  }

  getMangaByID(id: number): Promise<MangaDetail> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?id=${id}`).subscribe(response => {
        console.log("response", response)
        if (response.status === HTTP_STATUS.OK) {
          resolve(new MangaDetail(response.data.manga, response.data.chapter));
        } else {
          reject();
        }
      });
    });
  }

  loadListMangaByGenreName(genreName: string): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?genre=${genreName}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });
  }

}
