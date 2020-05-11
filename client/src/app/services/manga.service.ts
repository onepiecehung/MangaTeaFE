import { Manga, ListMangaResponse } from './../types/manga';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api.dev';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(
    private apiService: ApiService,
  ) { }

  loadManga(skip, limit): ListMangaResponse {
    var mangas = [];
    this.apiService.get(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}&limit=${limit}`).subscribe(response => {
      if (response.status === 200) {
        return new ListMangaResponse(response.data);
      }
      return null;
    });
  }
}
