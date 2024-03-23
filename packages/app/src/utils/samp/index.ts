/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import {
  Information,
  Player,
  Rules,
  SampQueryOption,
  ServerInfo,
} from "./types";
import { sampRequest } from "./udp";

export const sampInfo = async (
  options: SampQueryOption,
): Promise<ServerInfo> => {
  const { host, port = 7777, timeout = 1000 } = options;

  if (!host) {
    new Error(`Invalid host`);
  }

  if (!Number.isFinite(port) || port < 1 || port > 65535) {
    new Error("Invalid port");
  }

  let players: Player[] = [];

  const info: Information = await sampRequest({ host, port, timeout }, "i");
  const rules: Rules = await sampRequest({ host, port, timeout }, "r");
  if (info.online < 100) {
    players = await sampRequest({ host, port, timeout }, "c");
  }

  const address = `${host}:${String(port)}`;
  const serverInfo: ServerInfo = {
    address,
    host,
    port,
    ...info,
    rules,
    players,
  };
  return serverInfo;
};
