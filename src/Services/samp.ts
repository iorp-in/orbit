import sampQuery, { Options, SampResponse } from "../lib/samp-query/samp-query";

const isNumber = (n: string) => {
  return Number(n).toString() === n;
};

export const isValidServerAddress = (server: string) => {
  if (server.length < 1) return false;
  const regex = /^([a-zA-Z0-9].*):([0-9].*)/gm;
  return regex.test(server);
};

export const GetServerOptions = (server: string) => {
  const options: Options = { host: server, port: 7777 };
  const regex = /^([a-zA-Z0-9].*):([0-9].*)/gm;
  const resp = regex.exec(server);
  if (resp != null) {
    if (isNumber(resp[2])) {
      options.host = resp[1].toString();
      options.port = Number(resp[2]);
    }
  }
  return options;
};

export interface SampRes extends SampResponse {
  realaddress: string;
  ping: number;
}

const getServerInfo = (server: string): Promise<SampRes> => {
  const options = GetServerOptions(server);
  return new Promise((resolve, reject) => {
    const time = new Date().getTime();
    sampQuery(options, async (err, resp) => {
      const data = resp as SampRes;
      if (err) return reject(err);
      data.realaddress = server;
      data.ping = new Date().getTime() - time;
      return resolve(data);
    });
  });
};

export default getServerInfo;

/*
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

declare function query(
  name: Options,
  cb: (err: Error, result: SampResponse) => void
): string;

export default query;

*/
