import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from './Leaderboard/leaderboard/leaderboard.component';
import { AuthService } from './Services/auth-service';
import { HttpService } from './Services/http-service';
import { GameService } from './Services/game.service';
import { PlayerService } from './Services/player.service';
import { ScoresService } from './Services/scores.service';
import { NavbarComponent } from './Navbar/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, LeaderboardComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    GameService,
    HttpService,
    PlayerService,
    ScoresService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
