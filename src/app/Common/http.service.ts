import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly baseApiUrl: string = 'http://localhost:8080/api/';
  readonly httpClient: HttpClient;

  headers: HttpHeaders = new HttpHeaders();

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

    //Adding temporary authorization
    this.headers.set('Authorization', '5c2f5351-d30a-40fb-9a87-ada20b610c2d');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  public GetDataAsync<T>(endpoint: string): Observable<T> {
    let data = this.httpClient.get<T>(this.baseApiUrl + endpoint, {
      headers: this.headers,
    });
    return data;
  }
}
