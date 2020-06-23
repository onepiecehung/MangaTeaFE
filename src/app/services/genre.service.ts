import { Genre } from './../types/genre';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api';
import { HTTP_STATUS } from 'src/constants/constant-common';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[] = [];
  constructor(
    private apiService: ApiService,

  ) { }

  getAllGenre(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(CONSTANT_API.API_ENDPOINTS.GENRE).subscribe(response => {
        JSON.stringify(response);
        if (response.status === HTTP_STATUS.OK) {
          response.data.forEach(genreItem => {
            this.genres.push(new Genre(genreItem));
          });
          resolve(this.genres);
        } else {
          reject(response.data);
        }
      });
    });
  }
}
