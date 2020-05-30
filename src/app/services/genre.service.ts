import { Genre } from './../types/genre';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api';
import { HTTP_STATUS } from 'src/constants/constant-common';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private apiService: ApiService,

  ) { }

  getAllGenre(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(CONSTANT_API.API_ENDPOINTS.GENRE).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          var genres = Array<Genre>();
          response.data.forEach(genreItem => {
            genres.push(new Genre(genreItem));
          });
          resolve(genres);
        } else {
          reject(response.data);
        }
      });
    });
  }
}
