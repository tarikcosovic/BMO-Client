import { Component } from '@angular/core';
import { PlayerService } from './Players/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  ngOnInit() {
    let data = this.playerService.GetPlayers().subscribe((x) => {
      console.log(x);
    });

    console.log(data);
  }
}
