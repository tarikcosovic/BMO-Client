import { Injectable } from '@angular/core';
import { HttpService } from '../Common/http.service';
import { Observable } from 'rxjs';

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

class Player {
  id: number;
  username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
