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
      this.apiService.get(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}&limit=${limit}`).subscribe(response => {
        console.log("MangaService -> response", response)
        if (response.status === 200) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });

  }
}
