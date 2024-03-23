/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ipcMain, shell } from "electron";

ipcMain.on("open-link", (event, url?: string) => {
  if (url) {
    void shell.openExternal(url);
  }
});

ipcMain.handle("open-link", async (event, url?: string) => {
  try {
    if (!url) {
      throw Error("Link not passed");
    }

    await shell.openExternal(url);
    return true;
  } catch (err) {
    return false;
  }
});
