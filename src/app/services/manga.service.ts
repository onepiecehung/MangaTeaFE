import { FilterModel } from './../models/filter.model';
import { HotManga } from './../models/response/hot-manga.model';
import { HTTP_STATUS } from './../../constants/constant-common';
import { Manga, ListMangaResponse, MangaDetail } from '../models/manga.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './common/api.service';
import { CONSTANT_API } from 'src/constants/constant-api';
import { rejects } from 'assert';
import { HttpParams } from '@angular/common/http';
import { MangaDiscussion } from '../models/manga-discussion.model';
import { MangaUser } from '../models/response/manga-user.model';

@Injectable({
  providedIn: 'root'
})
export class MangaService {


  constructor(
    private apiService: ApiService,
  ) { }

  loadManga(skip): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}&sort=${1}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });

  }

  searchManga(skip: number, name: string): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}&sort=${1}&name=${name}`).subscribe(response => {
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

  loadCarousel(): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA_HOME}?slide=${true}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });
  }

  getMangaDiscussion(mangaID: number): Promise<MangaDiscussion[]> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA_DISCUSSION}?id=${mangaID}&tag=${true}&description=${true}&genre=${true}`).subscribe(response => {
        console.log("getMangaDiscussion -> response", response)
        if (response.status === HTTP_STATUS.OK) {
          let mangaDiscussions: MangaDiscussion[] = [];
          if (response.data) {
            response.data.forEach(element => {
              mangaDiscussions.push(new MangaDiscussion(element));
            });
          }
          resolve(mangaDiscussions);
        } else {
          reject();
        }
      });
    });
  }

  getListHotManga(): Promise<HotManga[]> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA_HOME}?trending=${-1}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          let listManga: HotManga[] = [];
          response.data.manga.forEach(item => {
            listManga.push(new HotManga(item));
          });
          resolve(listManga);
        } else {
          reject();
        }
      });
    });
  }


  filterManga(skip: number, filter: FilterModel): Promise<ListMangaResponse> {
    let params = '';
    filter.genre.forEach((genre: string) => {
      params += ('&genre=' + genre);
    });
    filter.country ? (params += ('&country=' + filter.country)) : '';
    filter.status ? (params += ('&status=' + filter.status)) : '';
    filter.isAdult ? (params += ('&isAdult=' + filter.isAdult)) : '';
    filter.fromYearEnd ? (params += ('&fromYearEnd=' + filter.fromYearEnd)) : '';
    filter.toYearEnd ? (params += ('&toYearEnd=' + filter.toYearEnd)) : '';
    filter.format ? (params += ('&params=' + filter.format)) : '';
    filter.authorName ? (params += ('&authorName=' + filter.authorName)) : '';
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA}?skip=${skip}${params}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });

  }

  loadMangaUser(param: string): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MEMBER}?${param}=${1}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });
  }

  loadMangaUploaded(params: string): Promise<ListMangaResponse> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.MANGA_UPLOAD}${params}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(new ListMangaResponse(response.data));
        } else {
          reject();
        }
      });
    });
  }

  onAddToFavorite(mangaID: number) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.ADD_FAVORITE}?idManga=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  removeMangaFavorite(mangaID) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.REMOVE_FAVORITE}?idManga=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  deleteManga(mangaID) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.DELETE_MANGA}?id=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  removeMangaHistoryReading(mangaID) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.REMOVE_HISTORY_READING}?idManga=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }


  onSaveManga(mangaID: number) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.SAVE_MANGA}?idManga=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  removeMangaSaved(mangaID) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.UNSAVED_MANGA}?idManga=${mangaID}`, null).subscribe(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  createNewManga(data: FormData) {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.MANGA}`, data).subscribe(response => {
        console.log("createNewManga -> response", response)
        if (response.status === HTTP_STATUS.OK) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      });
    });
  }


}
