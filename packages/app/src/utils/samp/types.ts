/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
export interface Information {
  hostname: string;
  gamemode: string;
  mapname: string;
  passworded: boolean;
  maxplayers: number;
  online: number;
  ping: number;
}

export interface Rules {
  [key: string]: string | boolean | number;
}

export interface Player {
  name: string;
  score: number;
}

export interface ServerInfo {
  address: string;
  host: string;
  port: number;
  hostname: string;
  gamemode: string;
  mapname: string;
  passworded: boolean;
  maxplayers: number;
  online: number;
  ping: number;
  rules?: Rules;
  players?: Player[];
}

export interface SampQueryOption {
  host: string;
  port?: number;
  timeout?: number;
}

export type SampRequestOption = Required<SampQueryOption>;
