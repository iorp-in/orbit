/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { mainWindow } from "../index.js";
import { ipcMain, dialog } from "electron";

ipcMain.handle(
  "select-dialog",
  (event, options: Electron.OpenDialogSyncOptions) => {
    if (mainWindow) {
      return dialog.showOpenDialogSync(mainWindow, options);
    }

    return [];
  },
);
