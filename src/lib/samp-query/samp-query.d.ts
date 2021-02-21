export interface Options {
  host: string;
  port?: number;
  timeout?: number;
}

export interface Rules {
  lagcomp: boolean;
  mapname: string;
  version: string;
  weather: number;
  weburl: string;
  worldtime: string;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  ping: number;
}

export interface SampResponse {
  address: string;
  hostname: string;
  gamemode: string;
  mapname: string;
  passworded: boolean;
  maxplayers: number;
  online: number;
  rules: Rules;
  players: Player[];
}

declare function query(name: Options, cb: (err: Error, result: SampResponse) => void): string;

export default query;
