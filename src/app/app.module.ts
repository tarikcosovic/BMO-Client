import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './Services/config-service';
import { LeaderboardComponent } from './Leaderboard/leaderboard/leaderboard.component';
import { AppConfiguration } from './Common/types';
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
    ConfigService,
    AuthService,
    GameService,
    HttpService,
    PlayerService,
    ScoresService,
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      multi: true,
      useFactory: appInitializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function appInitializer(configService: ConfigService) {
  return () => {
    return configService.loadConfig();
  };
}
