import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }
  loadMessage(): Observable<any> {
    var body = {
      "hdr": {
        "messageid": "MESSAGE-ID",
        "version": "2.0.1",
        "locale": "vi_VN",
        "country": "VN"
      }
    }
    return this.http.post("http://localhost:8080/api/data/msg", body);
  }
}
