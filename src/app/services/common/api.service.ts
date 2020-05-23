import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, retry, share, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getById(url, id): Observable<any> {
    return this.http.get(`${url}/${id}`);
  }
  postData(url, body): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError(err => {
        return of(err.error);
      })
    );
  }

  getData(url): Observable<any> {
    return this.http.get(url).pipe(
      catchError(err => {
        return of(err.error);
      })
    );
  }

  login(url, body): Observable<any> {
    return this.http.post(url, body);
  }

  update(url, id, body): Observable<any> {
    return this.http.put(`${url}/${id}`, body);
  }
  delete(url, id): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
