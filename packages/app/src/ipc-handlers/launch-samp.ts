/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { spawn } from "child_process";
import { ipcMain } from "electron";

type Payload = {
  address: string;
  gta_sa: string;
  samp: string;
  username: string;
  rconPassword?: string;
  password?: string;
};

ipcMain.handle(
  "launch-samp",
  (
    event,
    { gta_sa, samp, username, password, rconPassword, address }: Payload,
  ) => {
    try {
      /**
       * Set GTA SA path
       */
      spawn("reg", [
        "add",
        "HKCU\\Software\\SAMP",
        "/f",
        "/v",
        "gta_sa_exe",
        "/t",
        "REG_SZ",
        "/d",
        gta_sa,
      ]);

      /**
       * Set player name
       */
      spawn("reg", [
        "add",
        "HKCU\\Software\\SAMP",
        "/f",
        "/v",
        "PlayerName",
        "/t",
        "REG_SZ",
        "/d",
        username,
      ]);

      /**
       * Spawn samp
       */
      const args: string[] = [address];
      if (password) {
        args.push(`-z${password}`);
      }

      if (rconPassword) {
        args.push(`-c${rconPassword}`);
      }

      spawn(samp, args);
      return true;
    } catch (err) {
      return false;
    }
  },
);
