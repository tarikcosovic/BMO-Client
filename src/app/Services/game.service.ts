import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { Game } from '../Common/types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly endpointUrl: string = 'games';
  readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public GetAllGames(): Observable<Game[]> {
    return this.httpService.GetDataAsync<Game[]>(this.endpointUrl);
  }
}
