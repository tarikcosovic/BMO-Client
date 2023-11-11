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

export enum Role {
  User = 0,
  Admin,
}
