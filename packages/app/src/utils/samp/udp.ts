/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { Information, Player, Rules, SampRequestOption } from "./types.js";
import * as dgram from "dgram";
import iconv from "iconv-lite";

/**
 * Decode buffer
 */
const decode = (buffer: Buffer): string => {
  return iconv.decode(buffer, "win1251");
};

/**
 * Handle info response
 */
const handleInfoResponse = (message: Buffer, ping: number): Information => {
  let offset = 0;
  let strlen = 0;
  const info: Information = {} as Information;
  info.ping = ping;
  info.passworded = message.readUInt8(offset) === 1;
  offset += 1;
  info.online = message.readUInt16LE(offset);
  offset += 2;
  info.maxplayers = message.readUInt16LE(offset);
  offset += 2;
  strlen = message.readUInt16LE(offset);
  offset += 4;
  info.hostname = decode(message.slice(offset, (offset += strlen)));
  strlen = message.readUInt16LE(offset);
  offset += 4;
  info.gamemode = decode(message.slice(offset, (offset += strlen)));
  strlen = message.readUInt16LE(offset);
  offset += 4;
  info.mapname = decode(message.slice(offset, (offset += strlen)));
  return info;
};

/**
 * Handle rules response
 */
const handleRulesResponse = (message: Buffer): Rules => {
  const rules: Rules = {};
  let offset = 0;
  let strlen = 0;
  let ruleCount = message.readUInt16LE(offset);
  offset += 2;
  while (ruleCount) {
    strlen = message.readUInt8(offset);
    ++offset;
    const property = decode(message.slice(offset, (offset += strlen)));
    strlen = message.readUInt8(offset);
    ++offset;
    const value = decode(message.slice(offset, (offset += strlen)));
    rules[property] = value;
    --ruleCount;
  }
  return rules;
};

/**
 * Handle players response
 */
const handlePlayersResponse = (message: Buffer): Player[] => {
  const players: Player[] = [];
  let offset = 0;
  let strlen = 0;
  let playerCount = message.readUInt16LE(offset);
  offset += 2;
  while (playerCount) {
    const player: Player = {
      name: "",
      score: 0,
    };
    strlen = message.readUInt8(offset);
    ++offset;
    player.name = decode(message.slice(offset, (offset += strlen)));
    player.score = message.readUInt16LE(offset);
    offset += 4;
    players.push(player);
    --playerCount;
  }
  return players;
};

/**
 * Send samp udp request with opcode
 */

export const sampRequest = (
  options: SampRequestOption,
  opcode: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    const packet = Buffer.alloc(10 + opcode.length);

    packet.write("SAMP");
    const hostParts = options.host.split(".");
    for (let i = 0; i < 4; ++i) {
      packet[i + 4] = parseInt(hostParts[i]);
    }

    packet.writeUInt16LE(options.port, 8);
    packet.writeUInt8(opcode.charCodeAt(0), 10);

    const startTime = Date.now();

    try {
      socket.send(
        packet,
        0,
        packet.length,
        options.port,
        options.host,
        (error) => {
          if (error) {
            reject(error);
          }
        },
      );
    } catch (error) {
      reject(error as Error);
    }

    const onTimeout = () => {
      socket.close();
      reject(
        new Error(
          `Host unavailable "${options.host}:${options.port.toString()}"`,
        ),
      );
    };

    const controller: NodeJS.Timeout = setTimeout(onTimeout, options.timeout);

    socket.on("message", (message) => {
      clearTimeout(controller);

      const ping = Date.now() - startTime;

      if (message.length < 11) {
        reject(new Error("Invalid response from server"));
        return;
      }

      socket.close();
      message = message.slice(11);

      try {
        if (opcode === "i") {
          resolve(handleInfoResponse(message, ping));
        } else if (opcode === "r") {
          resolve(handleRulesResponse(message));
        } else if (opcode === "c") {
          resolve(handlePlayersResponse(message));
        }
      } catch (exception) {
        reject(exception as Error);
      }
    });
  });
};
