import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  SimpleChange,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CircularBuffer } from 'src/app/Common/CircularBuffer';
import { Game, Score } from 'src/app/Common/types';
import { AuthService } from 'src/app/Services/auth-service';
import { ConfigService } from 'src/app/Services/config-service';
import { GameService } from 'src/app/Services/game.service';
import { ScoresService } from 'src/app/Services/scores.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  public scores: Array<Score> = [];
  public games: Array<Game> = [];
  public currentGame: Game | null = null;

  @Input() public isAdmin: boolean = false;

  private circularBuffer: CircularBuffer<Game> | null = null;
  private currentIndex: number = 0;

  private subscriptions$: Subscription[] = [];

  constructor(
    private scoreService: ScoresService,
    private gameService: GameService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.GetAllGames();
  }

  ngOnChanges(changes: SimpleChange) {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscriptions$ && this.subscriptions$.length > 0)
      this.subscriptions$.forEach((subscription) => {
        subscription.unsubscribe();
      });
  }

  async GetAllGames() {
    try {
      this.subscriptions$.push(
        this.gameService.GetAllGames().subscribe((games) => {
          this.games = games;

          this.circularBuffer = new CircularBuffer(this.games.length);
          this.currentIndex = 0;

          this.games.forEach((game) => {
            this.circularBuffer?.add(game);
          });

          if (this.games.length > 0) {
            this.GetNextGame(this.getCurrentItem());
          }
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  }

  GetNextGame(game: Game | null) {
    this.currentGame = game;
    if (this.currentGame) this.GetScoresByGame(this.currentGame.id);
  }

  async GetScoresByGame(id: number) {
    try {
      this.subscriptions$.push(
        this.scoreService.GetScoresByGame(id).subscribe((scores) => {
          this.scores = scores;
          let mockCount = 100 - this.scores.length;
          for (let i = 0; i < mockCount; i++) {
            this.scores.push({
              player: { id: i, username: 'mock_player' + i.toString() },
              game: null,
              value: i,
            });
          }
          this.scores = this.scores.sort((x, y) =>
            x.value > y.value ? -1 : 1
          );
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  }

  public async onDeleteScore(username: string, event: any) {
    this.deleteScore(username, event);

    if (this.currentGame?.id && username) {
      this.scoreService
        .DeleteScoresByGameAndUsername(this.currentGame?.id, username)
        .subscribe({
          next: () => {
            this.deleteScore(username, event);
          },
          error: (err) => {
            console.log('Error deleting score: ' + err);
          },
        });
    }
  }

  private deleteScore(username: string, event: any) {
    let currentEvent = (event.target as HTMLInputElement).parentElement
      ?.parentElement;

    currentEvent?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    if (currentEvent && currentEvent.parentElement) {
      currentEvent.parentElement.style.backgroundColor = 'red';
      currentEvent.parentElement.style.outline = 'solid black 5px';
    }

    setTimeout(() => {
      if (currentEvent && currentEvent.parentElement) {
        currentEvent.parentElement.style.backgroundColor = '#fbfaff';
        currentEvent.parentElement.style.outline = 'none';
      }

      this.scores = this.scores.filter((x) => x.player.username != username);

      this.changeDetectorRef.detectChanges();
    }, 1000);
  }

  OnShareButton(event: any) {
    let shareUrl = this.configService.baseApiUrl;
    //TODO: Add your url here from appconfig, delete the below line when going to production
    shareUrl =
      'https://stackoverflow.com/questions/22037021/custom-facebook-share-button';

    let pictureUrl =
      'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1588964142291-FOFMWSNOZCM4RY20PMQ7/full-trailer-for-adventure-time-distant-lands-features-bmo-as-the-triumphant-hero-social.jpg?format=2500w';
    let shareTitle = 'BMO Global Leaderboards Top 100';

    let shareDescription =
      'Check out my highscore on the latest BMO global leaderboards';

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&title=${shareTitle}&description=${shareDescription}&picture=${pictureUrl}`,
      'sharer'
    );
  }

  prev() {
    if (this.circularBuffer) {
      if (this.currentIndex == 0)
        this.currentIndex = this.circularBuffer?.items.length - 1;
      else
        this.currentIndex =
          (this.currentIndex - 1) % this.circularBuffer?.items.length;

      this.GetNextGame(this.getCurrentItem());
    }
  }

  next() {
    if (this.circularBuffer) {
      this.currentIndex =
        (this.currentIndex + 1) % this.circularBuffer?.items.length;

      this.GetNextGame(this.getCurrentItem());
    }
  }

  getCurrentItem(): Game | null {
    return this.circularBuffer
      ? this.circularBuffer.get(this.currentIndex)
      : null;
  }
}
