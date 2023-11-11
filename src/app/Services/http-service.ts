import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly httpClient: HttpClient;
  headers: HttpHeaders = new HttpHeaders();

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

    let cachedKey = localStorage.getItem('admin-key');

    if (cachedKey) this.SetAuthHeader(cachedKey);
    else this.SetAuthHeader('1e33293d-84d1-406b-ae55-793ed59937d7');
  }

  public GetDataAsync<T>(
    endpoint: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.httpClient.get<T>(environment.apiUrl + endpoint, {
      headers: headers ?? this.headers,
    });
  }

  public DeleteDataAsync<T>(
    endpoint: string,
    data: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.httpClient.delete<T>(
      environment.apiUrl + endpoint + '/delete/' + data,
      {
        headers: headers ?? this.headers,
      }
    );
  }

  public SetAuthHeader(key: string) {
    this.headers = this.headers
      .set('Authorization', key)
      .set('Content-Type', 'application/json; charset=utf-8');
  }
}
