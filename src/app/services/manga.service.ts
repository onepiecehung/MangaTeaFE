import { HTTP_STATUS } from './../../constants/constant-common';
import { Manga, ListMangaResponse } from './../types/manga';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api.dev';
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

  getMangaByID(id: number): Promise<Manga> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?id=${id}`).subscribe(response => {
        console.log("getMangaByID -> response", response)
        if (response.status === HTTP_STATUS.OK) {
          resolve(new Manga(response.data));
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
