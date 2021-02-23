/* eslint-disable no-console */
import Ping from "ping";
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
    let ping = 0;
    Ping.promise
      .probe(options.host)
      .then((res) => {
        ping = Number(res.min);
        sampQuery(options, async (err, resp) => {
          const data = resp as SampRes;
          if (err) return reject(err);
          data.realaddress = server;
          data.ping = ping;
          return resolve(data);
        });
        return null;
      })
      .catch(reject);
  });
};

export default getServerInfo;
