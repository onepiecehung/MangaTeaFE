import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(url): Observable<any> {
    return this.http.get(url);
  }
  getById(url, id): Observable<any> {
    return this.http.get(`${url}/${id}`);
  }
  create(url, body): Observable<any> {
    return this.http.post(url, body);
  }

  update(url, id, body): Observable<any> {
    return this.http.put(`${url}/${id}`, body);
  }
  delete(url, id): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
