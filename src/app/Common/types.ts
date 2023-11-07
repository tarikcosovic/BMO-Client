export interface Player {
  id: number;
  username: string;
}

export interface Game {
  id: number;
  name: string;
  description: string;
}

export interface Score {
  value: number;
  player: Player;
  game: Game | null;
}

export abstract class AppConfiguration {
  baseApiUrl: string;

  constructor(baseApiUrl: string = '') {
    this.baseApiUrl = baseApiUrl;
  }
}

export enum Role {
  User = 0,
  Admin,
}
