import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { Score } from '../Common/types';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  readonly endpointUrl: string = 'scores';
  readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public GetScoresByGame(id: number): Observable<Score[]> {
    return this.httpService.GetDataAsync<Score[]>(
      this.endpointUrl + '/leaderboard/' + id
    );
  }

  public DeleteScoresByGameAndUsername(
    gameId: number,
    username: string
  ): Observable<Score[]> {
    return this.httpService.DeleteDataAsync<Score[]>(
      this.endpointUrl,
      gameId + '/' + username
    );
  }
}
