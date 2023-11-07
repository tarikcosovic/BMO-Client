import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly httpClient: HttpClient;
  headers: HttpHeaders = new HttpHeaders();

  constructor(httpClient: HttpClient, private configService: ConfigService) {
    this.httpClient = httpClient;

    this.SetAuthHeader('28E47BAE-64E2-4FBF-9C3A-249DD8BFF154');
  }

  public GetDataAsync<T>(
    endpoint: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.httpClient.get<T>(this.configService.baseApiUrl + endpoint, {
      headers: headers ?? this.headers,
    });
  }

  public DeleteDataAsync<T>(
    endpoint: string,
    data: string,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.httpClient.delete<T>(
      this.configService.baseApiUrl + endpoint + '/delete/' + data,
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
