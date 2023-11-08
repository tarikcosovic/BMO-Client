import { Component, EventEmitter, Output } from '@angular/core';
import { Game } from './Common/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAdmin: boolean = false;
  public currentGame?: Game;
  public isMockDataEnabled: boolean = true;

  constructor() {}

  hasAdminAuthenticated(event: boolean) {
    this.isAdmin = event;
  }

  hasGameChanged(game: Game) {
    this.currentGame = game;
  }

  toggleMockData(event: boolean) {
    this.isMockDataEnabled = event;
  }
}
