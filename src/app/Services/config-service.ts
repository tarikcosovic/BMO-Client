import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfiguration } from '../Common/types';

@Injectable()
export class ConfigService extends AppConfiguration {
  constructor(private httpClient: HttpClient) {
    super();
  }

  async loadConfig() {
    return await lastValueFrom(
      this.httpClient.get<AppConfiguration>('app.config.json')
    )
      .then((data) => {
        this.baseApiUrl = data.baseApiUrl;
      })
      .catch((exception) => {
        console.log(exception);
      });
  }
}
