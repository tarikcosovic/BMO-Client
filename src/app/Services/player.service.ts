import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { Player } from '../Common/types';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly endpointUrl: string = 'players';
  readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public GetPlayers(): Observable<Player[]> {
    return this.httpService.GetDataAsync<Player[]>(this.endpointUrl);
  }
}
