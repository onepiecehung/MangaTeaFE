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

  loadManga(skip, limit): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}&limit=${limit}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });

  }
}
